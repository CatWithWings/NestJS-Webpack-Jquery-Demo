import "./customerElement.scss";
import './components/my-article';

class CustomerElementApp {
  constructor() {
    this.init();
  }

  init() {
    this.setUnContextWapper();
    this.setContextWapper();
  }

  setUnContextWapper() {
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
        <p>我们会被加入default slot 0</p>
        <p>我们会被加入default slot 1</p>
      </my-article>
    `;
    $wapper.empty().append(innerHtml);
  }

  setContextWapper() {
    const $wapper = $('#wapperContext');
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
        <p slot="mainFooter" class="footer">我是 Main Footer</p>
        <p slot="subFooter" class="footer">我是 Sub Footer</p>
      </my-article>
    `;
    $wapper.empty().append(innerHtml);
  }
}

new CustomerElementApp()