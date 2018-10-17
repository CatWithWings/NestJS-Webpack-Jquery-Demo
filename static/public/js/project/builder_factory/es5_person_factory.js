/**
 * 
 * @param {*} information 用户信息
 * 该类包括：Name类, Work类
 */
function Person(information) {
  this.person = new Human({
    skill: information.skill,
    hobby: information.hobby
  })

  this.person.name = new Name(information.name);
  this.person.work = new Work(information.work);
}

Person.prototype = {
  getResult: function() {
    return [
      this.person.name.getName(),
      this.person.work.getWork(),
      this.person.getHuman(),
    ].join('\n')
  }
}

function Human(param) {
  this.skill = param && param.skill || '保密';
  this.hobby = param && param.hobby || '保密';
}

Human.prototype = {
  getSkill: function () {
    return this.skill
  },

  getHobby: function () {
    return this.hobby;
  },

  getHuman: function () {
    return `特长: ${this.skill}\n兴趣爱好: ${this.hobby}`
  }
}

function Name(name) {
  if (name === undefined) throw new Error('Name should be required')
  if (name.indexOf(' ') <= -1) throw new Error('Please input fullName')

  this.name = name;

  if (this.name.indexOf(' ') > -1) {
    this.firstName = this.name.slice(0, this.name.indexOf(' '))
    this.secondName = this.name.slice(this.name.indexOf(' '))
  }
}

Name.prototype = {
  getName() {
    return `姓: ${this.firstName}\n名: ${this.secondName}`;
  }
}

function Work(work) {
  this.switchWork(work)
}

Work.prototype = {
  switchWork(work) {
    switch (work) {
      case 'UI':
      case 'UE':
        this.work = '设计师';
        this.workDescript = '设计是艺术'
        break;

      case 'code':
        this.work = '工程师';
        this.workDescript = '编写代码是乐趣';
        break;

      case 'teach':
        this.work = '教师';
        this.workDescript = '分享是一种快乐';
        break;

      default:
        this.work = work;
        this.workDescript = '对不起，我们还不清楚您所选择的职位描述';
        break;
    }
  },

  changeWork: function (newWork) {
    this.switchWork(newWork)
  },

  changeDescript: function (newDescript) {
    this.workDescript = newDescript;
  },

  getWork: function () {
    return `职位: ${this.work}\n职位描述: ${this.workDescript}`;
  }
}

export {
  Person
}