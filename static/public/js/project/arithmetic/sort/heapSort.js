/**
 * 堆排序就是把最大堆堆顶的最大数取出，
 * 将剩余的堆继续调整为最大堆，再次将堆顶的最大数取出，
 * 这个过程持续到剩余数只有一个时结束
 */
export default class HeapSort {
  static heapSort(array) {
    let heapSize = array.length;

    /**
     * 构造一个满足array[parent(i)] ≥ array[i]的堆结构
     * Parent(i) = floor(i/2)，i 的父节点下标
     * Left(i) = 2i + 1，i 的左子节点下标
     * Right(i) = 2(i + 1)，i 的右子节点下标
     * 最大元素值出现在根结点
     */
    this.buildHeap(array);

    while(heapSize > 1) {
      heapSize --;

      // 交换堆里第一个元素（数组中较大的值）和最后一个元素的位置
      this.swap(array, 0 , heapSize);

      /**
       * 可能会丢掉堆的属性
       * 因此，我们还需要执行一个heapify函数，再次将数组转换成堆
       * 也就是说，它会找到当前堆的根节点（较小的值），重新放到树的底部
       */
      this.heapify(array, heapSize, 0);
    }
    return array;
  }

  // 构造最大堆
  static buildHeap(array) {
    const heapSize = array.length;
    for(let i = Math.floor(array.length / 2); i>=0; i--) {
      this.heapify(array, heapSize, i);
    }
  }

  static heapify(array, heapSize, i) {
    let left = i * 2 + 1;
    let right = i * 2 + 2;
    let largest = i;

    if (left < heapSize && array[left] > array[largest]) {
      largest = left;
    }

    if (right < heapSize && array[right] > array[largest]) {
      largest = right;  
    }

    if (largest !== i) {
      this.swap(array, i, largest);
      this.heapify(array, heapSize, largest);
    }
  }

  static swap(array, i, largest) {
    var temp = array[i];
    array[i] = array[largest];
    array[largest] = temp;
  }
}