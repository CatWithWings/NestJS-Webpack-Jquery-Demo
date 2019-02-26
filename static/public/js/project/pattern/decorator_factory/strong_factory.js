import OrginFactory from './orgin_factory';

export default class StrongFactory {
  static init(){
    const newInit = () => {
      alert(`我是加强的新方法`);
    };

    if (typeof OrginFactory.init === 'function') {
      OrginFactory.init();
    }

    newInit();
  }
}