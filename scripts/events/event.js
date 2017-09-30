function Event(pos = null)
{
  this.pos = pos;
  this.is_collider = null;

  this.el = document.createElement("event");
  this.el.setAttribute("class","");

  this.el.setAttribute("style","left:"+(this.pos.x*TILE_SIZE.width)+"px;bottom:"+(this.pos.y*TILE_SIZE.width)+"px");  

  this.update = function()
  {
    if(this.pos){
      this.el.setAttribute("style","left:"+(this.pos.x*TILE_SIZE.width)+"px;bottom:"+(this.pos.y*TILE_SIZE.width)+"px");  
    }
  }
}