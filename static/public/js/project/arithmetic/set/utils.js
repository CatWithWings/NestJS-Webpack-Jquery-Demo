export default class SetUtils {

  /**
   * 求并集
   * @param {*} setOne Set实例
   * @param {*} setTwo Set实例
   */
  static union(setOne, setTwo) {
    const target = setOne.getJson();
    const orgain = setTwo.getJson();

    return {
      ...target,
      ...orgain
    };
  }

  /**
   * 求交集
   * @param {*} setOne Set实例
   * @param {*} setTwo Set实例
   */
  static intersection(setOne, setTwo) {
    const orgain = setOne.size() > setTwo.size()
      ? setOne.getJson()
      : setTwo.getJson();
    const target = setOne.size() > setTwo.size()
    ? setTwo.getJson()
    : setOne.getJson();
    let result = {};

    for (let key in orgain) {
      if(target[key]) {
        result[key] = key;
      }
    }
    return result;
  }

  /**
   * 求差集 (即求在target中不在orgin中的元素)
   * @param {*} target 集合实例
   * @param {*} orgin 集合实例
   */
  static difference(target, orgin) {
    const targetJson = target.getJson();
    const orginJson = orgin.getJson();
    let result = {};

    for(let key in targetJson) {
      if (!orginJson[key]) {
        result[key] = key;
      }
    }

    return result;
  }
}