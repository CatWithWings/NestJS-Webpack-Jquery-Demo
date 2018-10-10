// vendors
import '@babel/polyfill';
import $ from 'expose-loader?$!jquery';

class BaseApp {
  init() {
    this.getActiveNav.apply(this);
    this.bindEvents.apply(this);
  }

  getActiveNav() {
    const $mainNavItem = $('#main_nav > li');

    $mainNavItem.each((index, element) => {
      const $item = $(element);
      const currentMenu = $item.data('current');
      const key = $item.data('key');

      if (currentMenu === key) {
        $item.addClass('active').siblings('li').removeClass('active');
      }
    })
  }

  bindEvents() {}
}

const BaseTasks = new BaseApp();
BaseTasks.init();