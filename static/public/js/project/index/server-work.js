export default class ServerWorkTest {
  static install() {
    if ('serviceWorker' in navigator) {
      console.log('支持');

      navigator.serviceWorker.register('/js/sw-demo-cache.js', {
        scope: "/"
      }).then(res => {
        console.log('注册成功');

        let serviceWorker;
        if (res.installing) {
          serviceWorker = res.installing;
          console.log('installing');
        } else if (res.waiting) {
          serviceWorker = res.waiting;
          console.log('waiting');
        } else if (res.active) {
          serviceWorker = res.active;
          console.log('active');
        }
        if (serviceWorker) {
          $('#swState').text(serviceWorker.state);
          serviceWorker.addEventListener('statechange', function (e) {
            console.log('&emsp;状态变化为' + e.target.state);
          });
        }
      }).catch(err => {
        console.log('注册没有成功');
      })
    } else {
      console.log('不支持');
    }
  }
}