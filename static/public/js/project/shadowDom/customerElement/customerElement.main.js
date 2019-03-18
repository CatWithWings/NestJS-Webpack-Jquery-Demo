import "./customerElement.scss";
import './components/my-article';

class CustomerElementApp {
  constructor() {
    this.init();
  }

  init() {
    const $wapper = $('#wapper');
    const innerHtml = `
      <my-article>
        <p slot="mainHeader" class="main-title__p">我是主标题</p>
        <h5 slot="subHeader" class="header-wapper__sub-header">
          我是副标题
        </h5>
        <p slot="content">
          我是文章主体
        </p>
        <ul slot="aside">
          <li><a>我是外部链接1</a></li>
          <li><a>我是外部链接2</a></li>
        </ul>
      </my-article>
    `;
    $wapper.empty().append(innerHtml);
  }
}

new CustomerElementApp()