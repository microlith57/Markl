'use strict'

const Scenario = require('../server/core/scenario')

// 1. (drag-over)
// 2. flow.splash
// 3. flow.fighter
// 4. flow.stage
// 5. flow.arena
// 6. supervisor.play
// 7. stage.triggers
// 8. fightscript.react
// 9. fighter.enact
// 10. supervisor.end

function Markl () {
  this.el = document.createElement('div')
  this.el.id = 'app'

  this.assets = new AssetsManager()
  this.flow = new Flow()
  this.interface = new Interface()
  this.controller = new Controller()
  this.keyboard = new Keyboard()

  this.supervisor = require('../server/core/supervisor')
  this.scenario = null

  this.install = function (host) {
    console.log('Markl.Install')

    this.flow.install(this.el)
    this.interface.install(this.el)

    this.keyboard.install()
    host.appendChild(this.el)
  }

  this.setup = function () {
    console.log('Markl.Setup')
    console.log('==================')
    this.assets.load({
      'interface': ['logo'],
      'arena': ['dojo5x5'],
      'fighter': ['sin', 'pest', 'patience', 'lancer', 'dummy']
    }, this.start)
  }

  this.start = function () {
    console.log('Markl.Start')
    console.log('==================')

    this.flow.start()
  }

  this.update = function () {
    this.el.className = `${this.navigator.is_visible ? 'designer_on' : 'designer_off'}`
  }

  this.load = function (script) {
    this.reset()
    this.scenario.set_script(script)
    this.run()
  }

  this.run = function () {
    markl.flow.goto('splash')
  }

  this.reset = function () {
    markl.scenario = new Scenario()
    markl.flow.reset()
  }

  // Events

  window.addEventListener('dragover', function (e) {
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'

    add_class(markl.el, 'dragover')
  })

  window.addEventListener('drop', function (e) {
    e.stopPropagation()
    e.preventDefault()

    let files = e.dataTransfer.files

    for (let id in files) {
      let file = files[id]
      if (!file.path) { continue }
      if (file.type && !file.type.match(/text.*/)) { console.log(`Skipped ${file.type} : ${file.path}`); continue }
      markl.load_path(file.path)
    }

    remove_class(markl.el, 'dragover')
  })

  // Options

  this.new = function () {
    console.log('New FightStyle')
  }

  this.open = function () {
    console.log('Open FightStyle')
  }

  this.load_path = function (path) {
    console.log('Loading path:', path)

    let data
    try {
      data = fs.readFileSync(path, 'utf-8')
    } catch (err) {
      console.warn(`Could not load ${path}`)
      return
    }

    markl.load(data)
  }
}
