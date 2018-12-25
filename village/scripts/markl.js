'use strict'

const RENDER = {
  tile: { w: 50, h: 50 },
  viewport: { w: 720, h: 380 }
}

const INPUT = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right'
}

function Markl () {
  GameObject.call(this, 'markl', 'div')

  this.control = new Control(this)
  this.control.install(this.el)
  this.stage = new Stage(this)
  this.stage.install(this.el)

  this.timer = null
  this.drawer = null

  this.setup = function () {
    console.log('!!')
    this.el.style.width = `${RENDER.viewport.w}px`
    this.el.style.height = `${RENDER.viewport.h}px`
  }

  this.start = function () {
    console.log(this.id, 'Start')

    this.stage.start()
    this.control.start()

    this.timer = setInterval(() => { this.run() }, 250)
    this.drawer = setInterval(() => { this.stage.camera.update() }, 50)
  }

  this.stop = function () {
    clearInterval(this.timer)
  }

  this.run = function () {
    if (this.control.isPlaying !== true) { return }

    this.stage.run()
  }
}