function FactoryParent(text, modelId) {
  this.$model = $(`#${modelId}`);
  this.context = text;
}

/**
 * 需要被重写的方法必须挂载咋父类原型上而非实例
 * this指向实例，由于子类的重载方法挂载在子类原型上
 * 如果将这些方法放在实例上， 实例中重写的方法反而成为了原型链上层的对象方法
 */
FactoryParent.prototype = {

  // 原型挂载时不可以使用箭头函数
  // 箭头函数的this来自外围作用域
  setContext: function () {
    this.$model.find('[name="context"]').append(this.context);
  },

  emptyContext: function () {
    this.$model.find('[name="context"]').empty();
  },

  show: function () {
    this.$model.addClass('show')
    this.setContext()
  },

  hide: function () {
    this.$model.removeClass('show')
    this.emptyContext()
  },
}

function AlertFactory(text, modelId) {
  FactoryParent.call(this, text, modelId);
}
AlertFactory.prototype = Object.create(FactoryParent.prototype)


function PromptFactory(text, modelId) {
  FactoryParent.call(this, text, modelId);
}
PromptFactory.prototype = Object.create(FactoryParent.prototype)
PromptFactory.prototype.hide = function () {
  this.$model.removeClass('show')
  this.emptyContext()
  this.$model.find('[name="btn_wapper"]').removeClass('show');
}


function ConfirmFactory(text, modelId) {
  FactoryParent.call(this, text, modelId);
}
ConfirmFactory.prototype = Object.create(FactoryParent.prototype)
ConfirmFactory.prototype.hide = function () {
  this.$model.removeClass('show')
  this.emptyContext()
  this.$model.find('[name="btn_wapper"]').removeClass('show');
  this.$model.find('[name="cancel"]').removeClass('show');
}


function ClassCreatePop(type, text, modelId) {
  switch (type) {
    case 'alert':
      const alertModal = new AlertFactory(text, modelId)
      alertModal.show()
      setTimeout(() => {
        alertModal.hide()
      }, 2000)
      return alertModal;

    case 'prompt':
      const promptModal = new PromptFactory(text, modelId)
      promptModal.show();
      promptModal.$model.find('[name="btn_wapper"]').addClass('show');
      return promptModal;

    case 'confirm':
      const confirmModal = new ConfirmFactory(text, modelId)
      confirmModal.show();
      confirmModal.$model.find('[name="btn_wapper"]').addClass('show');
      confirmModal.$model.find('[name="cancel"]').addClass('show');
      return confirmModal;

    default:
      return false;
  }
}

export {
  ClassCreatePop
}