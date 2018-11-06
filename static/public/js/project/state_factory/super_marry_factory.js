// 私有变量
let _super_marry_currentStates = {};
const _super_marry_states = {
  jump: () => {
    alert('Jump;')
  },

  run: () => {
    alert('Run;')
  },

  shoot: () => {
    alert('Shoot;')
  }
}

class SuperMarry {
  changeStates(actions) {
    if(!Array.isArray(actions)) {
      console.error('actions必须为数组');
      return this;
    }

    _super_marry_currentStates = {};
    if(actions.length > 0) {
      for(let i = 0, len = actions.length; i < len; i++) {
        _super_marry_currentStates[actions[i]] = true;
      }
    }

    return this;
  }

  exec() {
    for (let key in _super_marry_currentStates) {
      if (_super_marry_currentStates[key] === true) {
        _super_marry_states[key] &&  _super_marry_states[key]();
      }
    }

    return this;
  }
}

export {
  SuperMarry
}