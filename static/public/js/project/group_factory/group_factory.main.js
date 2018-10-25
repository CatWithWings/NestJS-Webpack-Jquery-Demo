import '@STYLE_SHEETS/group_factory.scss';
import BeerImg from '@IMAGES/beer.jpg';
import * as News from './es6_factory/news_factory';

class GroupFactoryApp {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
  }

  setNews() {
    let news = new News.Container({
      id: 'new_container',
      parent: document.getElementById('wapper')
    })

    news
      .add(
        new News.Item({className: 'icon'})
          .add(
            new News.IconNews({
              type: 'video', 
              href: '#', 
              text: '我是视频新闻'
            })
          )
      )
      .add(
        new News.Item({className: 'icon'})
          .add(
            new News.IconNews({
              type: 'headset', 
              href: '#', 
              text: '我是直播新闻'
            })
          )
      )
      .add(
        new News.Item({className: 'group'})
          .add(
            new News.NewsGroup({className: 'image-text'})
              .add(
                new News.ImageNews({
                  url: BeerImg, 
                  href: '#', 
                  className: 'l-img'
                })
              )
              .add(
                new News.EasyNews({
                  text: '我是第一条Easy News', 
                  href: '#',
                  className: 'text-r'
                })
              )
              .add(
                new News.EasyNews({
                  text: '我是第二条Easy News', 
                  href: '#',
                  className: 'text-r'
                })
              )
          )
          
      )
      .add(
        new News.Item({className: 'type'})
          .add(
            new News.TypeNews({
              type: 'NBA', 
              pos: 'left', 
              href: '#', 
              text: '我是分类新闻left'
            })
          )
      )
      .add(
        new News.Item({className: 'type'})
          .add(
            new News.TypeNews({
              type: 'CBA', 
              pos: 'right', 
              href: '#', 
              text: '我是分类新闻right'
            })
          )
      )
      .show();
  }

  bindEvents() {
    $('#news').on('click', this.setNews.bind(this));
  }
}

const GroupFactory = new GroupFactoryApp();