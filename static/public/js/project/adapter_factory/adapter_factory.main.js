import { A } from './jquery_rewrite';

class AdapterFactoryApp {
  constructor(){}

  init(){
    this.bindEvents();
  }

  bindEvents(){
    A.on('test0', 'click', () => {
      alert('Success !');
    })
  }
}

const AdapterFactory = new AdapterFactoryApp();
AdapterFactory.init();