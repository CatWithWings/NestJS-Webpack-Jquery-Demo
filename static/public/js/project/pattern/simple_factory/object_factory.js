function objectCreatePop(type, text, modelId) {
  let o = new Object();

  o.$model = $(`#${modelId}`);

  o.context = text;

  o.setContext = () => {
    o.$model.find('[name="context"]').append(o.context);
  }

  o.emptyContext = () => {
    o.$model.find('[name="context"]').empty();
  }

  o.show = () => {
    o.$model.addClass('show')
    o.setContext()
  };

  o.hide = () => {
    o.$model.removeClass('show')
    o.emptyContext()
    o.$model.find('[name="btn_wapper"]').removeClass('show');
    o.$model.find('[name="cancel"]').removeClass('show');
  };

  switch (type) {
    case 'alert':
      o.show()
      setTimeout(() => {
        o.hide()
      }, 2000)
      break;

    case 'prompt':
      o.show();
      o.$model.find('[name="btn_wapper"]').addClass('show');
      break;

    case 'confirm':
      o.show();
      o.$model.find('[name="btn_wapper"]').addClass('show');
      o.$model.find('[name="cancel"]').addClass('show');
      break;

    default:
      break;
  }

  return o;
}

export {
  objectCreatePop
}