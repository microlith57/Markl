'use strict'

const Fightscript = require('../fightlang/fightscript')
const Stage = require('./stage')
const Fighter = require('../events/fighter')
const Dummy = require('../events/dummy')

function Dojo1v0 (c = [], f = []) {
  Stage.call(this,"dojo")

  this.bounds = { x: 4, y: 4 }

  const s1 = new c[0](0, { x: 0, y: 0 }, new Fightscript(f[0]))
  const s2 = new Dummy(1, { x: 0, y: 4 }, new Fightscript(''))

  this.fighters = [s1, s2]
}

module.exports = Dojo1v0