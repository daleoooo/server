
fetch('http://daleoooo.meituan.com/api/greetings').then(res => res.json()).then(res => console.log(res))
function foo (res) {
  console.log('jsonp', res);
}

document.getElementById('id-frame').onload = function iframeOnLoad () {
  console.log('iframe is loaded');
}
const tag = document.createElement("script");
tag.src = 'http://daleoooo.meituan.com/api/greetings?callback=foo';
document.getElementsByTagName("head")[0].appendChild(tag);
