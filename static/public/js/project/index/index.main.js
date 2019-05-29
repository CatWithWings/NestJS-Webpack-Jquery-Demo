import ServerWorkTest from "./server-work";

class IndexApp {
  constructor() {}

  init() {
    this.bindEvents.apply(this);
  }

  testPost() {
    $.ajax({
      type: "POST",
      contentType: 'application/json',
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxNjMuY29tIiwiaWF0IjoxNTM3ODYyODM2fQ.Jzth5hNnRjTMRFGtlwXpPutBVXT-YE-sqGn-6CxkT-4"
     },
      url: "/customer/create",
      data: JSON.stringify({
        "name": 'May',
        "tel": 13911111111,
        "company": '腾讯',
        "view": 0,
        "isPublished": 0
      }),
      dataType: "json",
      success: function(data,){
        console.log('index', data)
      },
      complete: (XMLHttpRequest, textStatus) => {
        // 获取某个响应报头
        console.log(XMLHttpRequest.getResponseHeader('Connection'))
      }
    });
  }

  testOption(){
    $.ajax({
      type: "OPTIONS",
      contentType: 'application/json',
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxNjMuY29tIiwiaWF0IjoxNTM3ODYyODM2fQ.Jzth5hNnRjTMRFGtlwXpPutBVXT-YE-sqGn-6CxkT-4"
     },
      url: "/customer/options",
      complete: function(xhr, status){
        console.log('index option -->', xhr.getAllResponseHeaders())
      }
    });
  }

  headOption(){
    $.ajax({
      type: "HEAD",
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxNjMuY29tIiwiaWF0IjoxNTM3ODYyODM2fQ.Jzth5hNnRjTMRFGtlwXpPutBVXT-YE-sqGn-6CxkT-4"
     },
      url: "/customer/head",
      complete: function(xhr, status){
        console.log('index head -->', xhr)
      }
    });
  }

  /**
   * HTTP原生质询/响应框架测试
   * 质询看HTTP权威指南第12章
   * 一次质询通过后将不会再弹出询问狂，304缓存，需清空缓存
   * 质询看HTTP权威指南第12章
   */
  wwwAuthorization(){
    $.ajax({
      type: "GET",
      contentType: 'application/json',
      url: "/customer/www_authorization",
      dataType: "json",
      complete: (XMLHttpRequest, textStatus) => {
        // 获取某个响应
        console.log(XMLHttpRequest.getAllResponseHeaders());
      }
    });
  }

  testServerWork() {
    // ServerWorkTest.install();
  }

  bindEvents() {
    $("#test_post").on('click', this.testPost.bind(this));
    $("#test_option").on('click', this.testOption.bind(this));
    $("#test_head").on('click', this.headOption.bind(this));
    $('#test_ask').on('click', this.wwwAuthorization.bind(this));
    $("#test_sw_btn").on('click', this.testServerWork.bind(this));
  }
}

const IndexTasks = new IndexApp();
IndexTasks.init();