'use strict'

function Supervisor (fightscript, fighter, stage) {
  const history = []

  // Turns

  function play (stage) {
    console.log('-------------')
    const fighter = find_next(stage)[0]
    console.log(`Play Turn: ${fighter.name}`)

    // Find reaction of fighter style against stage
    const triggers = stage.triggers(fighter)
    const reaction = fighter.fightscript.react(triggers)

    // TODO: Connect reaction to stage/state
    fighter.enact(reaction)
    record(stage,reaction)
  }

  function record (stage,reaction = null) {
    history.push({stage:stage.serialize(),reaction:reaction})
  }

  function render (f, c, s) {
    console.log('Rendering game!')
    const stage = new s([c], [f])
    record(stage)

    for (let i = 0; i < 2; i++) {
      play(stage)
    }

    return history
  }

  // Helpers

  function find_alive (stage) {
    const p = []
    for (const id in stage.fighters) {
      if (stage.fighters[id].hp > 0) { p.push(stage.fighters[id]) }
    }
    return p
  }

  function find_next (stage) {
    const fighters = find_alive(stage)
    return fighters.sort((a, b) => {
      return a.sp - b.sp
    }).reverse()
  }

  return render(fightscript, fighter, stage)
}

module.exports = Supervisor
