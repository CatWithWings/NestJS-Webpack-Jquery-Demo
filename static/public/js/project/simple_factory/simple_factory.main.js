import '@STYLE_SHEETS/simple_factory.scss';

import {
  objectCreatePop
} from './object_factory';

import { 
  ClassCreatePop 
} from './class_factory';

class SimpleFactoryApp {
  constructor() {
    this.popType = null;
    this.popModal = null;
  }

  init() {
    this.bindEvents();
  }

  modelSure() {
    switch (this.popType) {
      case 'prompt':
        this.popModal.hide()
        break;

      case 'confirm':
        this.popModal.hide()
        break;

      default:
        break;
    }
  }

  modelCancel() {
    switch (this.popType) {
      case 'prompt':
        this.popModal.hide()
        break;

      case 'confirm':
        this.popModal.hide()
        break;

      default:
        break;
    }

    this.popType = null;
    this.popModal = null;
  }

  bindEvents() {
    /* 对象工厂 */
    $('#object_alert').on('click', () => {
      const alertModal = objectCreatePop('alert', '我是alert', 'model')

      this.popType = 'alert';
      this.popModal = alertModal;
    }),

    $('#object_prompt').on('click', () => {
      const promptModal = objectCreatePop('prompt', '我是prompt', 'model')

      this.popType = 'prompt';
      this.popModal = promptModal;
    })

    $('#object_confirm').on('click', () => {
      const confirmtModal = objectCreatePop('confirm', '我是confirm', 'model')

      this.popType = 'confirm';
      this.popModal = confirmtModal;
    })
    /* 对象工厂 end */

    /* 类工厂 */
    $('#class_alert').on('click', () => {
      const alertModal = ClassCreatePop('alert', '我是class alert', 'model')

      this.popType = 'alert';
      this.popModal = alertModal;
    })

    $('#class_prompt').on('click', () => {
      const promptModal = ClassCreatePop('prompt', '我是class prompt', 'model')

      this.popType = 'prompt';
      this.popModal = promptModal;
    })

    $('#class_confirm').on('click', () => {
      const confirmModal = ClassCreatePop('confirm', '我是class confirm', 'model')

      this.popType = 'confirm';
      this.popModal = confirmModal;
    })
    /* 类工厂 end */


    $('#model [name="sure"]').on('click', this.modelSure.bind(this))

    $('#model [name="cancel"]').on('click', this.modelCancel.bind(this))
  }
}

const SimpleFactoryTask = new SimpleFactoryApp();
SimpleFactoryTask.init();