import '@STYLE_SHEETS/share_factory.scss';
import {
  NewsFactory
} from './es6_factory/news_factory';

class ShareFactoryApp {
  constructor() {
    this.size = 5;
    this.page = 1;
    this.news = [];
    this.getList()
      .then(() => {
        this.setNews(this.page, this.news.length);
      });
    this.init();
  }

  init() {
    this.bindEvents();
  }

  getList() {
    return new Promise((reslove, reject) => {
      $.ajax({
        type: "GET",
        contentType: 'application/json',
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxNjMuY29tIiwiaWF0IjoxNTM3ODYyODM2fQ.Jzth5hNnRjTMRFGtlwXpPutBVXT-YE-sqGn-6CxkT-4"
        },
        url: "/news/list",
        dataType: "json",
        success: (data) => {
          this.news = data.data;
          reslove();
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }

  filterByPage(e) {
    const total = this.news.length;
    const $dom = $(e.target).closest('li');
    const page = $dom.data('page');

    this.page = page;

    $dom.addClass('actvie')
      .siblings('li').removeClass('actvie');

    this.setNews(this.page, total);
  }

  setNews(page, total) {
    const $wapper = document.getElementById('wapper');
    let currentList = [];

    $wapper.innerHTML = '';

    if (page * this.size < total) { // 当前页有size条数据
      const start = (page - 1) * this.size;
      const end = start + this.size;
      currentList = this.news.slice(start, end);
    } else { // 当前页不满size条数据
      currentList = this.news.slice((this.page - 1) * this.size);
    }

    const result = NewsFactory.getNews(currentList);

    /**
     * 将创建新闻list Item的部分提取出来
     * 由于一页只需显示5条，所以创建li也只需最多处理5条，而不是全部的列表数据
     */
    result.forEach(element => {
      $wapper.appendChild(element);
    });
  }

  bindEvents() {
    $('#page').on('click', this.filterByPage.bind(this))
  }
}

const ShareFactory = new ShareFactoryApp();