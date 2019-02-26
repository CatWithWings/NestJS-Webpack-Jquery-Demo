import { Interpreter } from './xPath_factory';

class InterpreterFactoryApp {
  constructor () {
    this.init()
  }

  init () {
    this.bindEvents()
  }

  bindEvents () {
    $('#show').on('click', () => {
      const path = Interpreter(document.getElementById('orgain'));

      $('#content').html(path.join('>'));
    })
  }
}

const InterpreterFactory = new InterpreterFactoryApp();