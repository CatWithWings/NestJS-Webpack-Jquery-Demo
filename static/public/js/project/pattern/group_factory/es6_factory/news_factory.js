class News {
  constructor() {
    this.children = [];
    this.element = null;
  }

  init() {
    throw new Error('请重写init方法');
  }

  add() {
    throw new Error('请重写add方法');
  }

  getElement() {
    throw new Error('请重写getElement方法');
  }
}

class Container extends News {
  /**
   * 
   * @param {*} id container id
   * @param {*} parent contaner's parent
   */
  constructor({id, parent}) {
    super();

    this.id = id;
    this.parent = parent;

    this.init();
  }

  init() {
    this.element = document.createElement('ul');
    this.element.id = this.id;
    this.element.className = 'news-container';
  }

  add(child) {
    this.children.push(child);
    this.element.appendChild(child.getElement());
    return this;
  }

  getElement() {
    return this.element;
  }

  show() {
    this.parent.appendChild(this.getElement());
  }
}

class Item extends News {
  constructor({className}) {
    super();

    this.className = className || '';
    this.init();
  }

  init() {
    this.element = document.createElement('li');
    this.element.className = this.className;
  }

  add(child) {
    this.children.push(child);
    this.element.appendChild(child.getElement());
    return this;
  }

  getElement() {
    return this.element;
  }
}

class NewsGroup extends News {
  constructor({className}) {
    super();
    
    this.className = className;
    this.init();
  }

  init() {
    this.element = document.createElement('div');
    this.element.className = this.className;
  }

  add(child) {
    this.children.push(child);
    this.element.appendChild(child.getElement());
    return this;
  }

  getElement() {
    return this.element;
  }
}

// 最小单元元素
class IconNews extends News {
  constructor({type, href, text}) {
    super();

    this.type = type || 'video';
    this.href = href || '#';
    this.text = text || '';

    this.init();
  }

  init() {
    let icon = document.createElement('i');
    icon.className = `fas fa-${this.type}`;

    let span = document.createElement('span');
    span.innerHTML = this.text;

    this.element = document.createElement('a');
    this.element.href = this.href;

    this.element.appendChild(icon);
    this.element.appendChild(span);
  }

  getElement() {
    return this.element;
  }
}


// 最小单元元素
class TypeNews extends News {
  constructor({type, pos, href, text}) {
    super();

    this.type = type || '';
    this.pos = pos || 'left';
    this.href = href || '#';
    this.text = text || '#';

    this.init();
  }

  init() {
    this.element = document.createElement('a');
    this.element.href = this.href;

    if (this.pos === 'left') {
      this.element.innerHTML = `[${this.type}] ${this.text}`;
    } else if (this.pos === 'right') {
      this.element.innerHTML = `${this.text} [${this.type}]`;
    }
  }

  getElement() {
    return this.element;
  }
}

// 最小单元组件
class EasyNews extends News {
  constructor({text, href, className}){
    super();

    this.text = text || '';
    this.href = href || '#';
    this.className = className || '';

    this.init()
  }

  init() {
    this.element = document.createElement('a');
    this.element.href = this.href;
    this.element.className = this.className;
    this.element.innerHTML = this.text;
  }

  getElement() {
    return this.element;
  }
}

class ImageNews extends News {
  constructor({url, href, className}) {
    super();

    this.url = url || '';
    this.href = href || '#';
    this.className = className || 'normal';

    this.init();
  }

  init() {
    let img = new Image();
    img.src = this.url;
    img.alt = '新闻图'

    this.element = document.createElement('a');
    this.element.href = this.href;
    this.element.appendChild(img);
    this.element.className = `image-news ${this.className}`;
  }

  getElement() {
    return this.element;
  }
}

export {
  Container,
  Item,
  NewsGroup,
  IconNews,
  TypeNews,
  EasyNews,
  ImageNews
}