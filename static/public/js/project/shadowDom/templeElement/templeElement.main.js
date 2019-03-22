class TempleElementApp {
  constructor() {
    this.init();
  }

  init() {
    this.defineCustomElement();
    this.appendHtml();
  }

  defineCustomElement() {
    customElements.define(
      'x-foo-tel',
      class extends HTMLElement {
        constructor() {
          super()
          this.init();
        }

        init() {
          let shadowRoot = this.attachShadow({
            mode: 'open'
          });
          const template = document.querySelector('#x-foo-tel');
          const instance = template.content.cloneNode(true);
          shadowRoot.appendChild(instance);
        }
      }
    )
  }

  appendHtml() {
    const innerHtml = '<x-foo-tel></x-foo-tel>';
    $('#wapper').empty().append(innerHtml);
  }
}

new TempleElementApp();