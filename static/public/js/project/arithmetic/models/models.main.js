class Models {
  constructor() {
    this.init();
  }

  init() {
    const changeModel = this.changeModel([50, 5, 1, 100, 20, 10], 273);
    $('#changeResult').empty().append(changeModel);

    this.getKnapsack01();
    this.getDoubleKnapsack();
  }

  // 快速排序，从大到小排序
  quickSort(array) {
    if (array.length <= 1) return array;

    const base = array[0];
    const left = [];
    const right = [];

    for (let i = 1, len = array.length; i < len; i++) {
      if (array[i] > base) {
        left.push(array[i]);
      } else {
        right.push(array[i]);
      }
    }

    return [...this.quickSort(left), base, ...this.quickSort(right)];
  }

  /**
   * 
   * @param {Array} moneySets 面值集合
   * @param {Number} money 需找零的数值
   */
  changeModel(moneySets, money) {
    const moneyArray = this.quickSort(moneySets);
    const result = {};
    moneyArray.forEach(item => {
      while (money >= item) {
        if (result[item]) {
          result[item]++
        } else {
          result[item] = 1;
        }
        money = money - item;
      }
    });

    let res = "";
    for (let key in result) {
      res += `${key}元: ${result[key]}; `;
    }
    return res;
  }

  // 01背包问题
  getKnapsack01() {
    const selected = [];
    const ws = [2, 2, 6, 5, 4];
    const vs = [6, 3, 5, 4, 6];
    const W = 10;
    const ValueResult = this.knapsack01(ws.length, W, ws, vs, selected);

    let result = `总价值为：${ValueResult}<br>`;

    selected.forEach(function (el, i) {
      if (el) {
        result += `选择了物品${i}, 其重量为${ws[i]}其价值为${vs[i]}<br>`;
      }
    });

    $('#01BagResult').empty().append(result);
  }

  /**
   * 01背包问题 （动态规划解法）
   * @param {Number} n 物品数量
   * @param {Number} W 背包剩余容量 
   * @param {Array} weights 物品重量集合
   * @param {Array} values 物品价值集合
   * @param {selected} selected 已选择的物品
   * @return 选择后的总价值
   */
  knapsack01(n, W, weights, values, selected) {
    // 当物品数量为0，或者背包容量为0时
    if (n === 0 || W === 0) {
      return 0;
    } else {
      //从当前所剩物品的最后一个物品开始向前，逐个判断是否要添加到背包中
      for (let i = n - 1; i >= 0; i--) {
        //如果当前要判断的物品重量大于背包当前所剩的容量，那么就不选择这个物品
        if (weights[i] > W) {
          return this.knapsack01(n - 1, W, weights, values, selected)
        } else {
          // 不选择物品i的情况得到的价值
          const preValue = this.knapsack01(n - 1, W, weights, values, selected);

          // 选择物品i的情况得到的价值
          const selectedVaule =
            values[i] + this.knapsack01(n - 1, W - weights[i], weights, values, selected);

          if (preValue > selectedVaule) {
            selected[i] = 0; //这种情况下表示物品 i 未被选取
            return preValue;
          } else {
            selected[i] = 1; //物品 i 被选取
            return selectedVaule;
          }
        }
      }
    }
  }

  getKsack() {
    const origin = [
      {
        weight: 5,
        val: 50,
        percent: 10
      },
      {
        weight: 20,
        val: 140,
        percent: 7
      },
      {
        weight: 10,
        val: 60,
        percent: 6
      }
    ]
  }
}

new Models();
