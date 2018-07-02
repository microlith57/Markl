function FightLang() 
{
  this.spec = {
    TRIGGER : [
      "SIGHT",
      "COLLIDE",
      "HIT",
      "ANY"],
    EVENT : [
      "FIGHTER", 
      "BLOCKER", 
      "PROJECTILE", 
      "ANY"],
    CONDITION : [
      "DISTANCE IS 4",
      "DISTANCE IS 3",
      "DISTANCE IS 2",
      "DISTANCE IS 1",
      "TURN IS 1",
      "TURN IS 2",
      "TURN IS 3",
      "TURN IS 4",
      "HEALTH IS 1",
      "HEALTH IS 2",
      "HEALTH IS 3",
      "HEALTH IS 4",
      "CHAR IS SIN",
      "CHAR IS PEST",
      "CHAR IS PATIENCE",
      "CHAR IS LANCER",
      "CHAR IS GOAT",
      "ANY"],
    ACTION : [
      "MOVE LEFT",
      "MOVE UP",
      "MOVE RIGHT",
      "MOVE DOWN",
      "MOVE TOWARD",
      "MOVE AWAY",
      "MOVE ANY",
      "MOVE ASIDE",
      "ATTACK LEFT",
      "ATTACK UP",
      "ATTACK RIGHT",
      "ATTACK DOWN",
      "ATTACK TOWARD",
      "ATTACK AWAY",
      "ATTACK ANY",
      "DASH LEFT",
      "DASH UP",
      "DASH RIGHT",
      "DASH DOWN",
      "DASH TOWARD",
      "DASH AWAY",
      "DASH ANY",
      "FIRE LEFT",
      "FIRE UP",
      "FIRE RIGHT",
      "FIRE DOWN",
      "FIRE TOWARD",
      "FIRE AWAY",
      "FIRE ANY",
      "WAIT"
    ]
  }

  this.fragments = function()
  {
    var a = []
    for(type in this.spec){
      for(id in this.spec[type]){
        a.push(new Fragment(type,this.spec[type][id]))
      }
    }
    return a;
  }
}