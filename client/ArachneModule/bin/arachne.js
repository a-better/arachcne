/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var KakaoLink = __webpack_require__(1)

	var kakaoLink = new KakaoLink();
	kakaoLink.setScript();
	kakaoLink.setKakao();
	kakaoLink.sendKakaoLink();


/***/ },
/* 1 */
/***/ function(module, exports) {

	var KakaoLink = function(){
		this.kakaoScript;
		this.kakao;
		kakaoLink = this;
	}

	KakaoLink.prototype.constructor = KakaoLink

	KakaoLink.prototype = {
		setScript : function(){
	  		var firstScript = document.getElementsByTagName('script')[0];
	  		this.kakaoScript = document.createElement('script');
	  		this.kakaoScript.src = '//developers.kakao.com/sdk/js/kakao.min.js';
	  		firstScript.parentNode.insertBefore(this.kakaoScript, firstScript);
	  		alert('kakaoScript is loaded');
	  		console.log(kakaoLink.kakaoScript);
		},
		setKakao : function(){
	  		this.kakaoScript.onload = function () {
	  			this.kakao = Kakao;
	  			this.kakao.init('d875beadbeaca371a2a21d629017b4f4');
	  		};      

		},
		sendKakaoLink : function(){
			this.kakaoScript.onload = function () {	
	  			Kakao.Link.sendTalkLink({
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
		}
	}

	module.exports = KakaoLink;

/***/ }
/******/ ]);