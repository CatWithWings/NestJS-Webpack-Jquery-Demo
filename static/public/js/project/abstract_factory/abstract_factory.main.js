// import { BMW, Lamborghini, YiQi, ErQi } from './ES5_factory';
import { BMW, Lamborghini, YiQi, ErQi } from './ES6_factory/vehicle_factory';

class AbstractFactoryApp {
  constructor(){
    this.BMW = new BMW('1,000,000 RMB', '150km/h');
    this.Lamborghini = new Lamborghini('1,500,000 RMB', '180km/h');
    this.YiQi = new YiQi('公交一汽', 32)
    this.ErQi = new ErQi('公交二汽', 28)
  }

  init() {
    this.bindEvents()
  }

  setVehicle(name) {
    this[name].result();
  }
  
  bindEvents(){
    $('#BMW').on('click', this.setVehicle.bind(this, 'BMW'));

    $('#Lamborghini').on('click', this.setVehicle.bind(this, 'Lamborghini'));

    $('#YiQi').on('click', this.setVehicle.bind(this, 'YiQi'));

    $('#ErQi').on('click', this.setVehicle.bind(this, 'ErQi'));
  }
}

const AbstractFactory = new AbstractFactoryApp()
AbstractFactory.init();