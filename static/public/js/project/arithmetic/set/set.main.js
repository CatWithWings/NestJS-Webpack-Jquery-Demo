import CustomSet from './customSet';
import SetUtils from './utils';

class SetApp {
  constructor() {
    this.customSet = new CustomSet();
    this.customSetOther = new CustomSet();
    this.init();
    this.bindEvents();
  }

  init() {}

  configSet() {
    const result = this.customSet
      .add('Alice')
      .add('Ben')
      .add('Alice')
      .add('John')
      .print();
    const result2 = this.customSetOther
      .add('张三')
      .add('李四')
      .add('Alice')
      .add('王朝')
      .print();

    $('#result').empty().append(result);
    $('#result2').empty().append(result2);
    $('#set').attr('disabled', true);
    $('#union, #intersection, #difference').removeAttr('disabled');
  }

  unionSet() {
    const result = SetUtils.union(this.customSet, this.customSetOther);
    $('#unionResult').empty().append(`{ ${Object.keys(result).join(', ')} }`);
  }

  intersectionSet() {
    const result = SetUtils.intersection(this.customSet, this.customSetOther);
    $('#intersectionResult')
      .empty()
      .append(`{ ${Object.keys(result).join(', ')} }`);
  }

  setDifference() {
    const result = SetUtils.difference(this.customSet, this.customSetOther);
    $('#differenceResult')
      .empty()
      .append(`{ ${Object.keys(result).join(', ')} }`);
  }

  bindEvents() {
    $("#set").on('click', () => this.configSet());

    $('#union').on('click', () => this.unionSet());

    $('#intersection').on('click', () => this.intersectionSet());

    $('#difference').on('click', () => this.setDifference());
  }
}

new SetApp();