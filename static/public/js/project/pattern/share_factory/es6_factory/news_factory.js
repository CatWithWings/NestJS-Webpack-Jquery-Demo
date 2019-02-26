/**
 * 将创建新闻list Item的部分提取出来
 * 由于一页只需显示5条，所以创建li也只需处理5条，而不是全部的列表数据
 */
class NewsFactory {
  static create({type, href, text}) {
    let wapper = document.createElement('li');
    wapper.className = 'icon';

    let icon = document.createElement('i');
    icon.className = `fa fa-${type}`;

    let a = document.createElement('a');
    a.href = href;

    let span = document.createElement('span');
    span.innerHTML = text;

    a.appendChild(icon);
    a.appendChild(span);
    wapper.appendChild(a);
    return wapper;
  }

  static getNews(listAarry) {
    const result = listAarry.map((item) => {
      return this.create({
        type: item.type, 
        href: item.href, 
        text:item.text
      });
    })
    return result;
  }
}

export {
  NewsFactory
}