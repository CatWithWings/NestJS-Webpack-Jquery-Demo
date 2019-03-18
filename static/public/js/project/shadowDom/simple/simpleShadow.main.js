import "./simpleShadow.main.scss";

class SimpleShadowDomApp {
  constructor() {
    this.init();
  }

  init() {
    const div = document.createElement('div');
    const shadowRoot = div.attachShadow({mode: 'open'});
    div.setAttribute("class", "simple-container");
    shadowRoot.innerHTML = `
      <style>
        .shadow-container {
          color: pink;
        }
      </style>
      <p class="shadow-container">Hello World</p>
    `;

    // 直接挂在div下的元素不会被渲染
    div.innerHTML = "<h1>Normal DOM</h1>";
    $('#simpleContainer').empty().append(div);
  }
}

new SimpleShadowDomApp();