import { SuperMarry } from './super_marry_factory';

class StateFactoryApp {
  constructor() {
    this.superMarry = new SuperMarry();
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents(){
    $('#run').on('click', () => {
      this.superMarry.changeStates(['run'])
        .exec();
    })

    $('#jump').on('click', () => {
      this.superMarry.changeStates(['jump'])
        .exec();
    })

    $('#shoot').on('click', () => {
      this.superMarry.changeStates(['shoot'])
        .exec();
    })

    $('#jump_shoot').on('click', () => {
      this.superMarry.changeStates(['jump', 'shoot'])
        .exec();
    })
  }
}

const StateFactory = new StateFactoryApp();