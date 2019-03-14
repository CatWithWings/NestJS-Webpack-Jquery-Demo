import SimpleQueue from './simpleQueue';
import PriorityQueue from './priorityQueue';
import HotPotato from './hotPotato';

class QueueApp {
  constructor() {
    this.simpleQueue = new SimpleQueue();
    this.priorityQueue = new PriorityQueue();
    this.hotPotato = new HotPotato(
      $('#hotName').html().split(','), 
      Number($('#hotNum').html())
    );
    this.init();
  }

  init() {
    this.bindEvents()
  }

  setSimpleQueue() {
    const data = ["Amy", "Alice", "Tom", "Ben", "John"];
    this.simpleQueue.enqueue(...data);
    $('#simpleQueue').empty().append(this.simpleQueue.print());
  }

  setPriorityQueue() {
    // 期望结果为 Amy, Alice, Ben, Tom, John (数值越小，优先级越高)
    const data = [
      {name: "Amy", priority: 0},
      {name: "Alice", priority: 0},
      {name: "Tom", priority: 2},
      {name: "Ben", priority: 1},
      {name: "John", priority: 3}
    ];
    $('#priorityQueue')
      .empty()
      .append(this.priorityQueue.enqueue(...data).print());
  }

  setHotPotato() {
    const result = this.hotPotato.start();
    $('#hotPotatoResult').empty().append(result);
  }

  bindEvents() {
    $("#pushQueue").on('click', () => this.setSimpleQueue());

    $("#pushPriorityQueue").on('click', () => this.setPriorityQueue());

    $('#hotPotato').on('click', () => this.setHotPotato())
  }
}

new QueueApp()