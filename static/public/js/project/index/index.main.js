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
      success: function(data){
        console.log('index', data)
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
      dataType: "json",
      success: function(data){
        console.log('index option', data)
      }
    });
  }

  headOption(){
    $.ajax({
      type: "HEAD",
      contentType: 'application/json',
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxNjMuY29tIiwiaWF0IjoxNTM3ODYyODM2fQ.Jzth5hNnRjTMRFGtlwXpPutBVXT-YE-sqGn-6CxkT-4"
     },
      url: "/customer/head",
      dataType: "json",
      success: function(data){
        console.log('index head', data)
      }
    });
  }

  bindEvents() {
    $("#test_post").on('click', this.testPost.bind(this));
    $("#test_option").on('click', this.testOption.bind(this));
    $("#test_head").on('click', this.headOption.bind(this));
  }
}

const IndexTasks = new IndexApp();
IndexTasks.init();