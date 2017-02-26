const crossOriginUrl = 'http://i.daleoooo.com/greetings';

fetch(crossOriginUrl)
  .then(res => {
    console.log(res);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  })
  .then(res => console.log(res))
  .catch(err => console.log(err));

const tag = document.createElement("script");
tag.src = `${crossOriginUrl}?callback=foo`;
document.getElementsByTagName("head")[0].appendChild(tag);

function foo (res) {
  console.log('jsonp', res);
}
