import VehicleFactory from './vehicle_factory';

function Lamborghini (price, speed) {
  this.price = price;
  this.speed = speed;
  this.priceContext = '';
  this.speedContext = '';
}

VehicleFactory(Lamborghini, 'Car')

Lamborghini.prototype.getPrice = function() {
  this.priceContext = `I\'m Lamborghini, I\'m a child of Car, my price is ${this.price}`;
}

Lamborghini.prototype.getSpeed = function() {
  this.speedContext = `I\'m Lamborghini, I\'m a child of Car, my speed is ${this.speed}`;
}

Lamborghini.prototype.result = function(){
  this.getPrice();
  this.getSpeed();
  alert(`${this.priceContext} \n ${this.speedContext}`)
}

export default Lamborghini