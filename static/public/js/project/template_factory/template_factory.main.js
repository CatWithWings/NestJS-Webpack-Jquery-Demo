import { MIInterview } from './interview_factory';

class TemplateFactoryApp {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    $('#interview').on('click', () => {
      const miInterview = new MIInterview();
      const step = miInterview.init();
      $('#result').html(step);
    })
  }
}

const TemplateFactory = new TemplateFactoryApp();

