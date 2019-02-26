// import {
//   Person
// } from './es5_person_factory';

import {
  Person
} from './es6_person_factory';

class BuilderFactoryApp {

  init() {
    this.bindEvent()
  }

  setPerson(personName, params) {
    if (this[personName] === undefined) {
      this[personName] = new Person(params)
    }
    alert(this[personName].getResult());
  }

  /**
   * 
   * @param {*} personName 
   * @param {'changeWork', 'changeDescript'} type
   */
  changePersonInfo(personName, type, value) {
    if (!this[personName]) {
      const message = '该用户不存在';
      alert(message)
      throw new Error(message)
    }

    if (!['changeWork', 'changeDescript'].includes(type)) {
      const message = '该项不存在或不能够修改';
      alert(message)
      throw new Error(message)
    }

    this[personName].person.work[type](value)
    alert(this[personName].getResult());
  }

  bindEvent() {
    $('#zhangsan').on('click', this.setPerson.bind(this, 'zhangsan', {
      name: '张 三',
      work: 'UI'
    }))

    $('#lisi').on('click', this.setPerson.bind(this, 'lisi', {
      name: '李 四',
      work: 'code',
      skill: 'JAVA',
      hobby: '打电玩'
    }))

    $('#zhangsan_change')
      .on(
        'click', 
        this.changePersonInfo.bind(this, 'zhangsan', 'changeWork', 'teach')
      )

    $('#lisi_change')
      .on(
        'click', 
        this.changePersonInfo.bind(this, 'lisi', 'changeDescript', '快乐的码农')
      )
  }
}

const BuilderFactory = new BuilderFactoryApp();
BuilderFactory.init();