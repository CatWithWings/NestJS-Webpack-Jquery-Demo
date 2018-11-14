class BookManger {

  // // 图书库存 
  // // [{book: string, stock: number}, ...]
  // static stock = [];

  // // 借阅者信息列表
  // // { name: [{ book: string, num: number }, ...]}
  // static lendList = {}; 

  static viewStock() {
    return this.stock;
  }

  static viewLendList() {
    return this.lendList;
  }

  /**
   * 
   * @param {array} books 
   * books =  [
   *   {book: string, stock: number},
   *   ...
   * ]
   * @param {string} command
   */
  static changeStock(books, command) {
    const oldStock = [...this.stock];

    if (command === 'add') { // 加库存 
      books.forEach((bookItem) => {
        const inLibraryIndex = oldStock
          .findIndex((oldItem) => oldItem.book === bookItem.book);

          if (inLibraryIndex !== -1) {
            this.stock[inLibraryIndex].stock += bookItem.stock;
          } else {
            this.stock.push({
              book: bookItem.book,
              stock: bookItem.stock
            });
          }
      })
      return this;
    }

    if (command === 'minus') { // 减库存
      books.forEach((bookItem) => {
        const inLibraryIndex = oldStock
          .findIndex((oldItem) => oldItem.book === bookItem.book);

          if (inLibraryIndex !== -1) {
            if (this.stock[inLibraryIndex].stock < bookItem.stock) {
              alert(`《${bookItem.book}》库存不足！`)
            } else {
              this.stock[inLibraryIndex].stock -= bookItem.stock;
            }
          } else {
            console.warn('该书不存在')
          }
      })
      return this;
    }

    if (command === 'remove' && this.stock.length > 0) { // 移除书
      books.forEach((bookItem) => {
        this.stock = oldStock.filter(
          (oldItem) => oldItem.book !== bookItem.book
        );
      })
      return this;
    }
  }

  /**
   * 借书
   * @param {string} name
   * @param {array} books
   * books =  [
   *   {book: string, num: number},
   *   ...
   * ]
   */
  static lend(name, books) {
    if (this.lendList[name] === undefined) {
      this.lendList[name] = [];
    }
    const oldStock = [...this.stock];
    const OldVistorLend = this.lendList[name];
    const changeBooks = [];

    books.forEach((bookItem) => {
      const inLendIndex = OldVistorLend
        .findIndex((oldItem) => oldItem.book === bookItem.book);
      const inLibraryIndex = oldStock
        .findIndex((oldItem) => oldItem.book === bookItem.book);

      if (inLibraryIndex === -1) {
        alert(`图书馆没有《${bookItem.book}》`);
      } else if(inLendIndex !== -1) {
        this.lendList[name][inLendIndex].num += bookItem.num;
        changeBooks.push({
          book: bookItem.book,
          stock: bookItem.num
        });
      } else {
        this.lendList[name].push({
          book: bookItem.book,
          num: bookItem.num
        })
        changeBooks.push({
          book: bookItem.book,
          stock: bookItem.num
        });
      }
    });
    this.changeStock(changeBooks, 'minus');
    return this;
  }

  /**
   * 还书
   * @param {string} name
   * @param {array} books
   * books =  [
   *   {book: string, num: number},
   *   ...
   * ]
   */
  static back(name, books) {
    if (this.lendList[name] === undefined) {
      this.lendList[name] = [];
    }

    const OldVistorLend = [...this.lendList[name]];
    const changeBooks = [];

    books.forEach((bookItem) => {
      const inLendIndex = OldVistorLend
        .findIndex((oldItem) => oldItem.book === bookItem.book);

      if(
          inLendIndex !== -1 && 
          this.lendList[name][inLendIndex].num >= bookItem.num
        ) {
        this.lendList[name][inLendIndex].num -= bookItem.num;
        changeBooks.push({
          book: bookItem.book,
          stock: bookItem.num
        });
      } else {
        alert(`您没有借《${bookItem.book}》`);
      }
    });
    this.changeStock(changeBooks, 'add');
    return this;
  }
}
  
// 图书库存 [{book: string, stock: number}, ...]
BookManger.stock = [];

// 借阅者信息列表 { name: [{ book: string, num: number }, ...]}
BookManger.lendList = {}; 


class Visitor {
  constructor(name) {
    this.name = name;
  }

  /**
   * 借书
   * @param {*} books 
   * books = [
   *   {book: string, num: number},
   *   ...
   * ]
   */
  lend(books) {
    const name = this.name;
    BookManger.lend(name, books);
  }

  /**
   * 还书
   * @param {*} books 
   * books = [
   *   {book: string, num: number},
   *   ...
   * ]
   */
  back(books) {
    const name = this.name;
    BookManger.back(name, books);
  }
}

export {
  BookManger,
  Visitor
}