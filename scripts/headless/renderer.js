const blessed = require('blessed');

module.exports = {

  index:0,
  history: null,
  screen: blessed.screen(),
  body: blessed.box({top: 0,left: 0,height: '100%',width: '100%',keys: true,mouse: true,alwaysScroll: true,scrollable: true,style: {bg: '#f0f',fg: '#00f'},scrollbar: {ch: '+',bg: '#999'}}),
  arena_el: blessed.box({top: 1,left: 3,height: 7,width: 7, border:{ch: ' ', bg:'#000'} ,style: {bg: '#f0f',fg: '#fff'}}),

  turn_el: blessed.box({top: 1,left: 13,height: 1,width: 20,style: {bg: '#000',fg: '#fff'}}),
  reaction_el: blessed.box({top: 2,left: 13,height: 1,width: 70 ,style: {bg: '#000',fg: '#fff'}}),
  action_el: blessed.box({top: 3,left: 13,height: 1,width: 70 ,style: {bg: '#000',fg: '#fff'}}),

  players_el: [
    blessed.box({top: 0,left: 0,height: 1,width: 1, content:'1' ,style: {bg: '#f0f',fg: '#fff'}}),
    blessed.box({top: 0,left: 2,height: 1,width: 1, content:'2' ,style: {bg: '#f0f',fg: '#fff'}})
  ],

  install: function(){

    this.screen.append(this.body);
    this.body.append(this.turn_el);
    this.body.append(this.arena_el);
    this.body.append(this.reaction_el);
    this.body.append(this.action_el);
    this.arena_el.append(this.players_el[0]);
    this.arena_el.append(this.players_el[1]);
    // Close the example on Escape, Q, or Ctrl+C
    this.screen.key(['escape', 'q', 'C-c'], (ch, key) => (process.exit(0)));
    this.screen.key(['left'], (ch, key) => (this.backward()));
    this.screen.key(['right'], (ch, key) => (this.forward()));

    this.draw();
  },

  forward: function(){
    this.index += this.index < this.history.length-1 ? 1 : 0;
    this.draw();
  },

  backward: function(){
    this.index -= this.index > 0 ? 1 : 0;
    this.draw();
  },

  render: function(history){
    this.history = history;
    this.install();
  },

  draw: function(){
    this.turn_el.setContent(` TURN ${this.index}/${this.history.length-1}`);

    var reaction = this.history[this.index].reaction;
    this.reaction_el.setContent(` ${reaction.trigger} > ${reaction.event} > ${reaction.condition} > ${reaction.target ? reaction.target.name : ''}`);

    var action = this.history[this.index].action;
    this.action_el.setContent(` ${action.name} > ${action.attr} > ${action.line}`);

    for(id in this.history[this.index].state.players){
      var player = this.history[this.index].state.players[id];

      this.players_el[id].left = player.pos.x;
      this.players_el[id].top = player.pos.y;

      if(player.status == "hit"){
        this.players_el[id].style.bg = "yellow"
      }
      else{
        this.players_el[id].style.bg = "#f0f"
      }
    }

    this.screen.render();
  }
}