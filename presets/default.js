module.exports = `
# This is the default fighting style
SIGHT
  FIGHTER
    DISTANCE IS 4
      DASH TOWARD
    DISTANCE IS 3
      FIRE TOWARD
    DISTANCE IS 2
      DASH TOWARD
    DISTANCE IS 1
      ATTACK TOWARD
    DEFAULT
      MOVE TOWARD
  OBJECT
    DISTANCE IS 1
      ATTACK TOWARD
  PROJECTILE
    DEFAULT
      STEP
DEFAULT
  DEFAULT
    DEFAULT
      MOVE ANY`;