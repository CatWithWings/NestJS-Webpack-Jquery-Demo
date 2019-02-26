import { A } from './old_factory';

A.g = function(id) {
  return $(`#${id}`);
}

A.on = function(id, type, fn) {
  const dom = typeof id === 'string' ? this.g(id) : $(id);
  dom.on(type, fn);
}

export {
  A
}