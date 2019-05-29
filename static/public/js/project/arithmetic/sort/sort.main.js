import HeapSort from "./heapSort";

class SortApp {
  constructor() {
    this.origin = [2, 5, 1, 20, 13, 3, 7, 100, 20, 66];
    this.init();
  }

  init() {
    const bubble = this.bubbleSort(this.origin).join(" - ");
    $('#bubble').empty().append(bubble);

    const select = this.selectSort(this.origin).join(" - ");
    $('#select').empty().append(select);

    const insert = this.insertSort(this.origin).join(" - ");
    $('#insert').empty().append(insert);

    const quick = this.quickSort(this.origin).join(" - ");
    $('#quick').empty().append(quick);

    const heap = HeapSort.heapSort(this.origin).join(" - ");
    $('#heap').empty().append(heap);
  }

  // 冒泡排序
  bubbleSort(origin) {
    const source = [...origin];
    const len = source.length;
    for(let i = 0; i < len - 1; i++) {
      for(let j = 0; j < len - 1 -i; j++) {
        if(source[j] > source[j+1]) {
          const temp = source[j];
          source[j] = source[j+1];
          source[j+1] = temp;
        }
      }
    }
    return source;
  }

  /**
   * 选择排序
   * 找到数组最小的元素，将它和数组红第一个元素交换位置，
   * 接下来，在剩下的元素中找到最小的元素，将它与数组的第二个元素交换位置，
   * 往复如此，直到将整个数组排序
   * @param {*} origin 源数据
   */
  selectSort(origin) {
    const source = [...origin];
    const len = source.length;

    // len-1，是因为到最后两个元素，交换位置，整个数组就已经排好序了
    for (let i = 0; i < len-1; i++) {
      let minNum = source[i];
      for (let j = i+1; j < len; j++) {
        // 替换最小值
        if (source[j] < minNum) {
          const temp = source[j];
          source[j] = minNum;
          minNum = temp;
        }
      }

      // 每次循环将最小的数字交换到循环到的当前位置
      source[i] = minNum;
    }

    return source;
  }

  /**
   * 插入排序
   * 对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入
   * @param {*} origin 
   */
  insertSort(origin) {
    const source = [...origin];
    const len = source.length;
    let preIndex, current;

    for(let i=1; i<len; i++) {
      preIndex = i - 1;
      current = source[i];

      while(preIndex >= 0 && source[preIndex] > current) {
        source[preIndex + 1] = source[preIndex];
        source[preIndex] = current;
        preIndex--;
      }
      source[preIndex + 1] = current;
    }
    return source;
  }

  /**
   * 快速排序 (二分法排序)
   * @param {Array} origin 源数组
   * @param {Number} index 作为基数的index值
   */
  quickSort(origin) {
    if (origin.length <= 1) return origin;

    const base = origin[0];
    const left = [];
    const right = [];

    for(let i=1, len=origin.length; i<len; i++) {
      if (origin[i] > base) {
        right.push(origin[i]);
      } else {
        left.push(origin[i]);
      }
    }

    return [...this.quickSort(left), base, ...this.quickSort(right)];
  }

}

new SortApp();
