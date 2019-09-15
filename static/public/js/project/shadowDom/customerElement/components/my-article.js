// 组件内部控制写在外部slot的样式需要用::slotted伪类
if (!customElements.get('my-article')) {
  customElements.define(
    'my-article',
    class extends HTMLElement {
      constructor() {
        super();
        this.init();
      }

      init() {
        // shadowRoot.host 称为宿主
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
          <style>
            * {
              box-sizing: border-box !important;
            }

            :host(*) {
              font-weight: bold;
            }

            :host-context(.greenTheme) {
              color: green;
            }

            ::slotted(*){
              box-sizing: border-box !important;
            }

            article {
              border: 1px solid #e5e5e5;
            }

            .header-wapper {
              background: #f5f5f5;
              padding: 10px 15px;
            }
            .header-wapper__main-title {
              color: pink;
              padding: 0 !important;
              margin: 0 !important;
              margin-bottom: 10px !important;
            }

            ::slotted(.main-title__p) {
              font-size: 28px !important;
              padding: 0 !important;
              margin: 0 !important;
            }

            ::slotted(.header-wapper__sub-header) {
              font-size: 16px !important;
              color: #999 !important;
            }

            .content {
              width: 100%;
              overflow: hidden;
              clear: both;
              margin-top: 20px;
            }

            .content__main-world,
            .content__aside {
              float: left;
            }
            
            .content__main-world {
              width: 80%;
              padding: 10px 15px;
            }

            .content__aside {
              width: 20%;
              list-style: none;
            }

            footer {
              width: 100%;
              overflow: hidden;
              clear: both;
              padding: 10px 15px;
              background: var(--footer-bg, #000);
              text-align: center;
            }

            #mainFooter::slotted(.footer) {
              color: #069dd5 !important;
              padding: 0 !important;
              margin: 0 !important;
            }

            #subFooter::slotted(.footer) {
              color: orange !important;
              padding: 0 !important;
              margin: 0 !important;
            }
          </style>
          <article>
            <header class="header-wapper">
              <h4 class="header-wapper__main-title">
                <slot name="mainHeader">Main Header</slot>
              </h4>
              <slot name="subHeader"></slot>
            </header>
            <div class="content">
              <section class="content__main-world">
                <slot name="content"></slot>
                <slot>我是默认slot</slot>
              </section>
              <aside class="content__aside">
                <slot name="aside"></slot>
              </aside>
            </div>
            <footer>
              <slot id="mainFooter" name="mainFooter"></slot>
              <slot id="subFooter" name="subFooter"></slot>
            </footer>
          </article>
        `;
      }
    }
  )
}