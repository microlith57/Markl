'use strict'

function StageScreen () {
  Screen.call(this, 'stage')

  const speed = 1000
  const Fightscript = require('../server/fightlang/fightscript')

  const stages = {
    dojo_1v0: require('../server/stages/dojo_1v0'),
    gardens_1v2: require('../server/stages/gardens_1v2'),
    woods_1v3: require('../server/stages/woods_1v3'),
    temple_1v4: require('../server/stages/temple_1v4'),
    roof_1v1: require('../server/stages/roof_1v1')
  }

  // Elements
  this.wrapper = this._create_el('wrapper')
  this.stage_garden = this._create_el('stage', 'garden')
  this.stage_dojo = this._create_el('stage', 'dojo')
  this.stage_wood = this._create_el('stage', 'wood')
  this.stage_dungeon = this._create_el('stage', 'dungeon')
  this.stage_rooftop = this._create_el('stage', 'rooftop')

  this.install = function (host) {
    this.wrapper.appendChild(this.stage_garden)
    this.wrapper.appendChild(this.stage_dojo)
    this.wrapper.appendChild(this.stage_wood)
    this.wrapper.appendChild(this.stage_dungeon)
    this.wrapper.appendChild(this.stage_rooftop)
    this.el.appendChild(this.wrapper)

    host.appendChild(this.el)
  }

  this.name = function () {
    return Object.keys(stages)[markl.scenario.level]
  }

  this.run = function () {
    const fightscript = new Fightscript(markl.scenario.script)
    const screen_action = fightscript.find('menu', 'stage', 'screen')[0]
    const skip = screen_action == 'SKIP'
    this.select(this.name(), skip)
  }

  this.select = function (name, skip) {
    console.log('select', name)
    markl.scenario.set_stage(stages[name])
    markl.interface.navigator.update()

    if (skip) {
      console.log('skip')
      markl.flow.goto('arena', true)
    } else {
      setTimeout(() => { add_class(this.el, `select_${name.split('_')[0]}`) }, TIMING.screen * 0.5)
      setTimeout(() => { markl.flow.goto('arena') }, TIMING.screen * 3)
    }
  }
}

module.exports = StageScreen
