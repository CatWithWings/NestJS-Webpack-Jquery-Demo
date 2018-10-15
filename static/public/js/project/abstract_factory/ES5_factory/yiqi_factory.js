import VehicleFactory from './vehicle_factory';

function YiQi (company, carrayPassengers) {
  this.company = company;
  this.carrayPassengers = carrayPassengers;
  this.companyContext = '';
  this.carrayPassengersContext = '';
}

VehicleFactory(YiQi, 'Bus')

YiQi.prototype.getCompany = function() {
  this.companyContext = `I\'m YiQi, I\'m a child of Bus, my company is ${this.company}`;
}

YiQi.prototype.getCarryPassengers = function() {
  this.carrayPassengersContext = `I\'m YiQi, I\'m a child of Bus, my carray passengers is ${this.carrayPassengers}`;
}

YiQi.prototype.result = function(){
  this.getCompany();
  this.getCarryPassengers();
  alert(`${this.companyContext} \n ${this.carrayPassengersContext}`)
}

export default YiQi