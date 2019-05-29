export default class ServerWorkTest {
  static install() {
    if ('serviceWorker' in navigator) {
      $("#isSupport").text("支持");

      navigator.serviceWorker.register('../public/js/project/index/sw-demo-cache.js', {
        scope: "/"
      }).then(res => {
        $('#isSuccess').text('注册成功');

        let serviceWorker;
        if (res.installing) {
          serviceWorker = res.installing;
          $('#state').text('installing');
        } else if (res.waiting) {
          serviceWorker = res.waiting;
          $('#state').text('waiting');
        } else if (res.active) {
          serviceWorker = res.active;
          $('#state').text('active');
        }
        if (serviceWorker) {
          $('#swState').text(serviceWorker.state);
          serviceWorker.addEventListener('statechange', function (e) {
            $('#swState').append('&emsp;状态变化为' + e.target.state);
          });
        }
      }).catch(err => {
        $('#isSuccess').text('注册没有成功');
      })
    } else {
      $('#isSupport').text('不支持');
    }
  }
}