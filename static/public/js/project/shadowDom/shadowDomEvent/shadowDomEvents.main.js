import './shadowDomEvents.scss';
import './components/my-tips';

class shadowDomEventsApp {
  constructor() {
    this.init();
  }

  init() {
    this.setShadowDom();
    this.bindEvents();
  }

  setShadowDom() {
    const $success = $('#success');
    const $warning = $('#warning');
    const successInnerHTML = `
      <my-tips>
        <p id="test1" slot="successTips" class="tips">我是success</p>
        <p id="test11" slot="successTips" class="tips">我是success</p>
      </my-tips>
    `;
    const warningInnerHTML = `
      <my-tips>
        <p id="test2" slot="warningTips" class="tips">我是warning</p>
      </my-tips>
    `;

    $success.empty().append(successInnerHTML);
    $warning.empty().append(warningInnerHTML);
  }

  addEvents() {
    // 获取第一个my-tips的shadowRoot
    const $shadowRoot = document.querySelectorAll('my-tips')[0]
      .shadowRoot;
    const test1Slot = document.getElementById('test1').assignedSlot;

    // shadowRoot中添加元素
    const childBtn = document.createElement("button");
    childBtn.setAttribute('type', 'button');
    childBtn.setAttribute('class', 'btn btn-primary');
    childBtn.setAttribute('id', 'addBtnTest');
    childBtn.textContent = "我是动态添加的按钮";
    $shadowRoot.appendChild(childBtn);
    $shadowRoot.appendChild(document.createElement('input'));

    console.log('第一个<my-tips>的shadowRoot是', $shadowRoot);
  
    console.log(`id为test1的元素分配给的slot是： `, test1Slot);
     
    console.log(
      'id为test1分配给的slot正在渲染的元素有：', 
      test1Slot.assignedNodes()
    );

    console.log($shadowRoot.activeElement)
  }

  bindEvents() {
    $('#addBtn').on('click', () => this.addEvents());
    $('body').on('click', "#addBtnTest", () => {
      console.log('外部是无法为shadom内部的元素添加事件的')
    })
  }
}

new shadowDomEventsApp();