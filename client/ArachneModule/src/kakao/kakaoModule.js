var KakaoModule = function(){
	this.kakaoScript;
	this.kakao;
	kakaoModule = this;
}

KakaoModule.prototype.constructor = KakaoModule;

KakaoModule.prototype = {
	setScript : function(){
  		var firstScript = document.getElementsByTagName('script')[0];
  		this.kakaoScript = document.createElement('script');
  		this.kakaoScript.src = '//developers.kakao.com/sdk/js/kakao.min.js';
  		firstScript.parentNode.insertBefore(this.kakaoScript, firstScript);
  		alert('kakaoScript is loaded');
  		console.log(kakaoModule.kakaoScript);
	},
	setKakao : function(){
  		this.kakaoScript.onload = function () {
  			this.kakao = Kakao;
  			this.kakao.init('d875beadbeaca371a2a21d629017b4f4');
  		};      

	},
	sendKakaoLink : function(){
		this.kakaoScript.onload = function () {	
  			kakaoModule.kakao.Link.sendTalkLink({
    	      label: '2048',
    	      image: {
    	        src: 'test',
    	        width: '300',
    	        height: '200'
    	      },
    	      webButton: {
    	        text: 'test',
    	        url:  'test'// 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
    	      }
    	    });
    	} 
	},
  login : function(){
    this.kakaoScript.onload = function(){
      kakaoModule.kakao.Auth.login({
       success: function(authObj) {
       //로그인 성공시, API를 호출합니다.
        Kakao.API.request({
            url: '/v1/user/me',
            success: function(res) {
              var parsing_res = JSON.stringify(res);
              kakaoModule.registerUser(parsing_res);
              //user data rest api send
              //ajax run when use get, post
            },
            fail: function(error) {
              alert(JSON.stringify(error));
            }
          });
        },
       fail: function(err) {
          alert(JSON.stringify(err));
        }
      });
    }
  },
  registerUser : function(user_data){
    var domain = document.domain;
    var port = location.port;
    var url = "http://"+domain+":"+port;
    var json_data = JSON.parse(user_data);
    var ID = json_data.id;
    var NICKNAME = json_data.properties.nickname;
    var THUMBNAIL_IMAGE = json_data.properties.thumbnail_image;
    var MESSENGER = 'kakao'
    var body = {
      "ID" : ID,
      "NICKNAME" : NICKNAME,
      "THUMBNAIL_IMAGE" : THUMBNAIL_IMAGE,
      "MESSENGER" : 'kakao'
    }
    alert(body);
  
    $.ajax({
      url: "http://"+domain+":"+port +'/user',
      type: 'PUT',
      datatype : 'json',
      data: body,
      success: function(result) {
        alert(result);
        redirect(user_data);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(textStatus);
      }
  });

}

module.exports = KakaoModule;