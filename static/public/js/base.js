// vendors
import '@babel/polyfill';
import $ from 'expose-loader?$!jquery';

class BaseApp {
  init() {
    this.getActiveNav.apply(this);
    this.bindEvents.apply(this);
  }

  getActiveNav() {
    const $mainNavItem = $('#main_nav li');

    $mainNavItem.each((index, element) => {
      const $item = $(element);
      const currentMenu = $item.data('current');
      const key = $item.data('key');

      if (currentMenu === key) {
        const $title = $item.children('a');

        $title.addClass('active')
          .siblings('li').children('a').removeClass('active');
        $title.siblings('ul[name="sub_menu"]').show();
      }
    })
  }

  toggleMenu(e) {
    console.log(e)
    const $subMenu = $(e.target).closest('a');
    $subMenu.siblings('[name="sub_menu"]').slideToggle();
  }

  bindEvents() {
    $('#main_nav').on('click', '[name="toggle_menu"] > a', this.toggleMenu.bind(this))
  }
}

const BaseTasks = new BaseApp();
BaseTasks.init();