/**
 * 工厂类
 * @param {*} subType 子类
 * @param {*} superType 子类抽象类
 */
function VehicleFactory(subType, superType) {
  if (typeof VehicleFactory[superType] === 'function') {

    // 缓存类
    function F() {}

    // '复刻'父类所有的原型方法及对象属性
    F.prototype = new VehicleFactory[superType];

    subType.constructor = subType;

    // 子类原型继承抽象类
    subType.prototype = new F();
  }else {
    throw new Error('未创建该抽象类')
  }
}

// Car 产品
VehicleFactory.Car = function() {
  this.type = 'car';
  this.context = '';
}

VehicleFactory.Car.prototype = {
  getPrice: function(){
    throw new Error('Car 抽象类不允许实例化')
  },

  getSpeed: function(){
    throw new Error('Car 抽象类不允许实例化')
  }
}

// Bus 产品
VehicleFactory.Bus = function() {
  this.type = 'bus';
  this.context = '';
}

VehicleFactory.Bus.prototype = {
  getCompany: function() {
    throw new Error('Bus 抽象类不允许实例化')
  },

  getCarryPassengers : function() {
    throw new Error('Bus 抽象类不允许实例化')
  }
}

export default VehicleFactory;