class VehicleFactory {
  constructor(superClass) {
    if (Object.getPrototypeOf(superClass) !== VehicleFactory) {
      throw new Error('不是VehicleFactory的子类')
    }

    if (new.target === superClass) {
      throw new Error(`抽象类不可以实例化!`)
    }
  }
}

// 抽象类
class Car extends VehicleFactory {
  constructor(type) {
    super(Car)
    this.type = type
  }

  getPrice() {}

  getSpeed() {}
}

class Bus extends VehicleFactory {
  constructor(type) {
    super(Bus)
    this.type = type
  }

  getCompany() {}

  getCarryPassengers() {}
}
// 抽象类 end

class BMW extends Car {
  constructor(price, speed) {
    super('BMW')

    this.price = price;
    this.speed = speed;
    this.priceContext = '';
    this.speedContext = '';
  }

  getPrice() {
    this.priceContext = `I\'m BWM, I\'m a child of Car, my price is ${this.price}`;
  }

  getSpeed() {
    this.speedContext = `I\'m BWM, I\'m a child of Car, my speed is ${this.speed}`;
  }
  
  result(){
    this.getPrice();
    this.getSpeed();
    alert(`${this.priceContext} \n ${this.speedContext}`)
  }
}

class Lamborghini extends Car {
  constructor(price, speed) {
    super('Lamborghini')

    this.price = price;
    this.speed = speed;
    this.priceContext = '';
    this.speedContext = '';
  }

  getPrice() {
    this.priceContext = `I\'m Lamborghini, I\'m a child of Car, my price is ${this.price}`;
  }

  getSpeed() {
    this.speedContext = `I\'m Lamborghini, I\'m a child of Car, my speed is ${this.speed}`;
  }
  
  result(){
    this.getPrice();
    this.getSpeed();
    alert(`${this.priceContext} \n ${this.speedContext}`)
  }
}

class YiQi extends Bus {
  constructor(company, carrayPassengers) {
    super('YiQi')
    this.company = company;
    this.carrayPassengers = carrayPassengers;
    this.companyContext = '';
    this.carrayPassengersContext = '';
  }

  getCompany() {
    this.companyContext = `I\'m YiQi, I\'m a child of Bus, my company is ${this.company}`;
  }
  
  getCarryPassengers() {
    this.carrayPassengersContext = `I\'m YiQi, I\'m a child of Bus, my carray passengers is ${this.carrayPassengers}`;
  }
  
  result(){
    this.getCompany();
    this.getCarryPassengers();
    alert(`${this.companyContext} \n ${this.carrayPassengersContext}`)
  }
}

class ErQi extends Bus {
  constructor(company, carrayPassengers) {
    super('ErQi')
    this.company = company;
    this.carrayPassengers = carrayPassengers;
    this.companyContext = '';
    this.carrayPassengersContext = '';
  }

  getCompany() {
    this.companyContext = `I\'m ErQi, I\'m a child of Bus, my company is ${this.company}`;
  }
  
  getCarryPassengers() {
    this.carrayPassengersContext = `I\'m ErQi, I\'m a child of Bus, my carray passengers is ${this.carrayPassengers}`;
  }
  
  result(){
    this.getCompany();
    this.getCarryPassengers();
    alert(`${this.companyContext} \n ${this.carrayPassengersContext}`)
  }
}

export {
  BMW,
  Lamborghini,
  YiQi,
  ErQi
}