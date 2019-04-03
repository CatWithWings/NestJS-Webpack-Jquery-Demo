import Dictionary from './dictionary';
import HashTable from './hashTable';
import ListHashTable from './listHashTable';
import LineHashTable from './lineHashTable';

class DictionaryApp {
  constructor() {
    this.dictionary = new Dictionary();
    this.hashTable = new HashTable();
    this.listHashTable = new ListHashTable();
    this.lineHashTable = new LineHashTable();
    this.init();
  }

  init() {
    this.bindEvents();
  }

  // 字典
  setDictionary() {
    this.dictionary.set('name', 'Alice')
      .set('age', 25)
      .set('job', 'teacher')
      .set('home', 'China')
    
    const keys = this.dictionary.keys().join(', ');
    const values = this.dictionary.values().join(', ');

    $('#dictionaryKeys').empty().append(keys);
    $('#dictionaryValues').empty().append(values);
  }

  // 散列表
  setHashTable() {
    const result = this.hashTable
      .put('Alice', 'alice@gmail.com')
      .put('Ben', 'ben@gmail.com')
      .put('Sue', 'sue@gmail.com')
      .print();

    $('#hashValues').empty().append(result);
  }

  // 分离链接散列表
  setListHashTable() {
    // Tyrion 与 Aaron 得到的index相同但key并不相同
    const result = this.listHashTable
      .put('Gandair', 'gandair@gmail.com')
      .put('Tyrion', 'tyrion@gmail.com')
      .put('Aaron', 'aaron@gmail.com')
      .put('Mindy', 'mindy@gmail.com')
      .put('Mindy', 'testRepeat@gmail.com')
      .print();
    $('#listHashValues').empty().append(result);
  }

  // 线性探查散列表
  setLineHashTable() {
    // Tyrion 与 Aaron 得到的index相同但key并不相同
    const result = this.lineHashTable
      .put('Gandair', 'gandair@gmail.com')
      .put('Tyrion', 'tyrion@gmail.com')
      .put('Aaron', 'aaron@gmail.com')
      .put('Mindy', 'mindy@gmail.com')
      .put('Mindy', 'testRepeat@gmail.com')
      .print();
    $('#lineHashValues').empty().append(result);
  }

  bindEvents() {
    $('#setDictionary').on('click', () => this.setDictionary());
    $('#setHashTable').on('click', () => this.setHashTable());
    $('#setListHashTable').on('click', () => this.setListHashTable());
    $('#setLineHashTable').on('click', () => this.setLineHashTable());
  }
}

new DictionaryApp();
