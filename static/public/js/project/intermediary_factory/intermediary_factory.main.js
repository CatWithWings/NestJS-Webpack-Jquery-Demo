import './intermediary_factory.scss';

import {
  BookManger,
  Visitor
} from './book_manger';

class IntermediaryFactoryApp {
  constructor() {
    this.peter = new Visitor('Peter');
    this.mary = new Visitor('Marry');
    this.init();
  }

  init() {
    const initLibrary = [{
        book: '哈利波特与魔法石',
        stock: 10,
      },
      {
        book: '深入浅出NodeJS',
        stock: 5,
      },
      {
        book: '莎士比亚全集',
        stock: 11,
      }
    ];

    BookManger.changeStock(initLibrary, 'add');
    this.showStockList('orgain_stock', BookManger.viewStock());
    this.showStockList('current_stock', BookManger.viewStock());
    this.showLendist('lend_list', BookManger.viewLendList());
    this.bindEvents();
  }

  showStockList(containerId, data) {
    const dom = data.map((item) => {
      return `<li>《${item.book}》: ${item.stock}</li>`;
    });
    $(`#${containerId}`).html(dom);
  }

  showLendist(containerId, data) {
    let dom = '';
    for (let name in data) {
      const personReadList = data[name].map((item) => {
        return `<li>《${item.book}》 ${item.num}本</li>`;
      }).join('');
      dom += `
        <li>
          ${name}: 
          <ul>${personReadList}</ul>
        </li>
      `
    }

    $(`#${containerId}`).html(dom);
  }

  showBackist(containerId, data) {
    const dom = data.map((item) => {
      return `<li>《${item.book}》 ${item.num}本</li>`;
    }).join('');

    $(`#${containerId}`).html(dom);
  }

  lendBook(name, books) {
    this[name.toLowerCase()].lend(books);
    this.showLendist('lend_list', BookManger.viewLendList());
    this.showStockList('current_stock', BookManger.viewStock());
  }

  backBook(name, books) {
    this[name.toLowerCase()].back(books);
    this.showLendist('lend_list', BookManger.viewLendList());
    this.showStockList('current_stock', BookManger.viewStock());
  }
 
  bindEvents() {
    $('#peter').on('click', () => {
      this.lendBook(
        'Peter',
        [{
          book: '哈利波特与魔法石',
          num: 2
        },
        {
          book: '莎士比亚全集',
          num: 1
        }
        ]);
    });

    $('#peter_back').on('click', () => {
      const data = [
        {
          book: '哈利波特与魔法石',
          num: 2
        }
      ];

      this.backBook('Peter', data);
      this.showBackist('peter_back_list', data);
    });

    $('#mary').on('click', () => {
      this.lendBook(
        'Mary',
        [{
            book: '深入浅出NodeJS',
            num: 2
          },
          {
            book: '神雕侠侣',
            num: 1
          }
        ]);
    });

    $('#mary_back').on('click', () => {
      const data = [
        {
          book: '深入浅出NodeJS',
          num: 1
        },
        {
          book: '神雕侠侣',
          num: 1
        }
      ];

      this.backBook('Mary', data);
      this.showBackist('mary_back_list', data);
    });
  }
}

const IntermediaryFactory = new IntermediaryFactoryApp();
