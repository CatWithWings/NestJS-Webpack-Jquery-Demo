let tpls = {
  product: (data) => {
    return `
      <div class="product-wapper">
        <img src="${data.src}" alt="产品图片" />
        <div class="text"><p>${data.text}</p></div>
      </div>
    `
  },

  title: (data) => {
    return `
      <div class="title-wapper">
        <div class="title">
          <h4 class="main-title">${data.title}</h4>
          <p class="sub-tips">——${data.tips}</p>
        </div>
      </div>
    `
  }
}

class ViewCommand {
  constructor() {
    this.itemWapper = document.createElement('div');
    this.itemWapper.className = 'view-container';
    this.html = '';
  }

  excute({command, params, view}) {
    const formatString = (params, view) => {
      return tpls[view] !== undefined ? tpls[view](params) : '';
    }
    const actions = {
      create: (data, view) => {
        if (Array.isArray(data) && data.length > 0) {
          data.forEach((item) => {
            this.html += formatString(item, view);
          })
        } else {
          this.html += formatString(data, view);
        }
      },

      display: ({container, type}) => {
        const displayType = type || 'append';

        if (displayType === 'replace') {
          this.itemWapper.innerHTML = this.html;
        }

        if (displayType === 'append') {
          this.itemWapper.innerHTML += this.html;
        }
        
        document.getElementById(container).innerHTML = '';
        document.getElementById(container).appendChild(this.itemWapper);
        this.html = '';
        return this;
      }
    }

    actions[command].apply(this, [params, view]);
    return this;
  }
}

export {
  ViewCommand
}