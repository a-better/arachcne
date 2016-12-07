var KakaoLink = require('./src/kakao/kakaoModule');

var kakaoLink = new KakaoLink();
kakaoLink.setScript();
kakaoLink.setKakao();
kakaoLink.sendKakaoLink();
