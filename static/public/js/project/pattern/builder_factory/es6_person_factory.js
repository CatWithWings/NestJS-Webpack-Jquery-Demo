/**
 * 
 * @param {skill?, hobby?, name, work} information 用户信息
 * 该类包括：Name类, Work类
 */
class Person {
  constructor(information) {
    this.person = new Human({
      skill: information.skill,
      hobby: information.hobby
    })

    this.person.name = new Name(information.name);
    this.person.work = new Work(information.work);
  }

  getResult() {
    return [
      this.person.name.getName(),
      this.person.work.getWork(),
      this.person.getHuman(),
    ].join('\n')
  }
}

class Human {
  constructor(param) {
    this.skill = param && param.skill || '保密';
    this.hobby = param && param.hobby || '保密';
  }

  getSkill() {
    return this.skill;
  }

  getHobby() {
    return this.hobby;
  }

  getHuman () {
    return `特长: ${this.skill}\n兴趣爱好: ${this.hobby}`
  }
}

class Name {
  constructor(name) {
    if (name === undefined) throw new Error('Name should be required')
    if (name.indexOf(' ') <= -1) throw new Error('Please input fullName')

    this.name = name;

    if (this.name.indexOf(' ') > -1) {
      this.firstName = this.name.slice(0, this.name.indexOf(' '))
      this.secondName = this.name.slice(this.name.indexOf(' '))
    }
  }

  getName() {
    return `姓: ${this.firstName}\n名: ${this.secondName}`;
  }
}

const switchWork = Symbol('switchWork') // 私有方法
class Work {
  constructor(work) {
    this[switchWork](work)
  }

  changeWork(newWork) {
    this[switchWork](newWork)
  }

  changeDescript(newDescript) {
    this.workDescript = newDescript;
  }

  getWork() {
    return `职位: ${this.work}\n职位描述: ${this.workDescript}`;
  }

  [switchWork](work) { // 私有方法
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
  }
}

export {
  Person
}