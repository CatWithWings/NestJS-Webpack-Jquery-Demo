// xPath解释器
var Interpreter = (function () {
  // 获取兄弟元素名称
  function getSulingName(node) {
    if (node.previousSibling) {
      var name = '',
        count = 1,
        nodeName = node.nodeName,
        sibling = node.previousSibling
      
      // 存在同一个兄弟元素
      while (sibling) {
        if (sibling.nodeType == 1 && sibling.nodeType === node.nodeType && sibling.nodeName) {
          // 如果节点名称和前一个兄弟元素名称相同
          if (nodeName == sibling.nodeName) {
            name += ++count
          } else {
            count = 1
            name += '|' + sibling.nodeName.toUpperCase()
          }
        }

        // 向前获取前一个兄弟元素
        sibling = sibling.previousSibling
      }
      return name
    } else {
      return ''
    }
  }
  return function f(node, wrap) {
    var path = [],
      wrap = wrap || document

    // 当前目标节点等于容器节点
    if (node == wrap) {
      if (wrap.nodeType == 1) { // 节点是元素节点
        path.push(wrap.nodeName.toUpperCase())
      }
      return path
    }

    // 当前节点父元素不是容器节点
    if (node.parentNode !== wrap) {
      // 递归调用匿名函数遍历父节点
      path = f(node.parentNode, wrap)
    }
    else {
      if (wrap.nodeType == 1) {
        path.push(wrap.nodeName.toUpperCase())
      }
    }
    var sublingsNames = getSulingName(node)
    if (node.nodeType == 1) {
      // 输入当前节点名称及前面兄弟节点名称统计
      path.push(node.nodeName.toUpperCase() + sublingsNames)
    }
    return path
  }
})();

export {
  Interpreter
}
