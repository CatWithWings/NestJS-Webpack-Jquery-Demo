import VehicleFactory from './vehicle_factory';

function ErQi (company, carrayPassengers) {
  this.company = company;
  this.carrayPassengers = carrayPassengers;
  this.companyContext = '';
  this.carrayPassengersContext = '';
}

VehicleFactory(ErQi, 'Bus')

ErQi.prototype.getCompany = function() {
  this.companyContext = `I\'m ErQi, I\'m a child of Bus, my company is ${this.company}`;
}

ErQi.prototype.getCarryPassengers = function() {
  this.carrayPassengersContext = `I\'m ErQi, I\'m a child of Bus, my carray passengers is ${this.carrayPassengers}`;
}

ErQi.prototype.result = function(){
  this.getCompany();
  this.getCarryPassengers();
  alert(`${this.companyContext} \n ${this.carrayPassengersContext}`)
}

export default ErQi