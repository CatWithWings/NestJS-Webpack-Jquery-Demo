if (!customElements.get('my-tips')) {
  customElements.define(
    'my-tips',
    class extends HTMLElement {
      constructor() {
        super();
        this.init();
        this.addEvent();
      }

      init() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
          <style>
            * {
              box-sizing: border-box !important;
            }

            :host-context(.success) {
              color: green;
            }

            :host-context(.warning) {
              color: orange;
            }

            ::slotted(.tips) {
              width: 100%;
              height: 28px;
              line-height: 28px;
              margin: 0 !important;
              padding: 0 15px !important;
              border-radius: 3px;
            }

            [name="successTips"]::slotted(.tips) {
              border: 1px solid green;
              background: #e0f5e0;
            }

            [name="warningTips"]::slotted(.tips) {
              border: 1px solid orange;
              background: #fbe9c9;
            }
          </style>
          <slot name="successTips"></slot>
          <slot name="warningTips"></slot>
          <button name="insideBtn">我是ShadowDom内部按钮</button>
        `;
      }

      addEvent() {
        this.addEventListener('click', () => {
          console.log('内部添加事件');
        })
      }
    }
  )
}