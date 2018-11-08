import './view_factory.scss';
import { ViewCommand } from './view_factory';
import beer1 from '@IMAGES/FtsNiomXZKYlSluRdsao8sbPqsdp.jpg';
import beer2 from '@IMAGES/FuaCKHP_C9kH1NiPowfoXr_cGvEy.jpg';
import beer3 from '@IMAGES/Fv9h5bhod2oWy5B6L6x20BILddlF.jpg';
import beer4 from '@IMAGES/Fv73JCOUY26HZAsk2UQR-VOYpr_k.jpg';

class CommandFactoryApp {
  constructor() {
    this.titleData = {
      title: '夏日里的一片温馨',
      tips: '暖暖的温情带给人们家的感受'
    };

    this.productData = [
      {
        src: beer1,
        text: '啤酒01'
      },
      {
        src: beer2,
        text: '啤酒02'
      },
      {
        src: beer3,
        text: '啤酒03'
      },
      {
        src: beer4,
        text: '啤酒04'
      }
    ];

    this.viewCommand = new ViewCommand();
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    $('#view').on('click', () => {
      this.viewCommand
        .excute({
          command: 'create',
          params: this.titleData,
          view: 'title'
        })
        .excute({
          command: 'create',
          params: this.productData,
          view: 'product'
        })
        .excute({
          command: 'display',
          params: {
            container: 'container'
          }
        })
    })
  }
}

const CommandFactory = new CommandFactoryApp();
