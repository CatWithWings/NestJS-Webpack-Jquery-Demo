import VehicleFactory from './vehicle_factory';

function BMW (price, speed) {
  this.price = price;
  this.speed = speed;
  this.priceContext = '';
  this.speedContext = '';
}

VehicleFactory(BMW, 'Car')

BMW.prototype.getPrice = function() {
  this.priceContext = `I\'m BWM, I\'m a child of Car, my price is ${this.price}`;
}

BMW.prototype.getSpeed = function() {
  this.speedContext = `I\'m BWM, I\'m a child of Car, my speed is ${this.speed}`;
}

BMW.prototype.result = function(){
  this.getPrice();
  this.getSpeed();
  alert(`${this.priceContext} \n ${this.speedContext}`)
}

export default BMW