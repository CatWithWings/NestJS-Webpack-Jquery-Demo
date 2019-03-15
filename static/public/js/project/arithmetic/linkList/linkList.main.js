import SimpleLinkList from './simpleLinkList';
import DoubleLikList from './doubleLinkList';

class LinkListApp {
  constructor() {
    this.simpleLinkList = new SimpleLinkList();
    this.doubleLinkList = new DoubleLikList();
    this.init();
  }

  init(){
    this.bindEvents();
  }

  setSimpleLinkList() {
    const result = this.simpleLinkList
      .append("Alice")
      .append("Tom")
      .append("Ben")
      .insert(1, "Amy")
      .print();

    $("#simpleLinkList").empty().append(result);
  }

  delSimpleLinkList() {
    const result = this.simpleLinkList.remove("Alice").print();
    $("#simpleLinkList").empty().append(result);
  }

  setDoubleLinkList() {
    const result = this.doubleLinkList
      .append("张三")
      .append("李四")
      .append("艾米")
      .insert(2, "约翰")
      .print();

    $('#doubleLinkList').empty().append(result);
  }

  delDoubleLinkList() {
    const result = this.doubleLinkList.remove("李四").print();
    $('#doubleLinkList').empty().append(result);
  }

  bindEvents() {
    $("#setSimpleLinkList").on('click', () => this.setSimpleLinkList());
    $("#delSimpleLinkList").on('click', () => this.delSimpleLinkList());

    $('#setDoubleLinkList').on('click', () => this.setDoubleLinkList());
    $('#delDoubleLinkList').on('click', () => this.delDoubleLinkList());
  }
}

new LinkListApp();