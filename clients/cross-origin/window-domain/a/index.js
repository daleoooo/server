const crossOriginHost = 'http://m.daleoooo.dev';
const crossOriginSite = `${crossOriginHost}/cross-origin/window-domain/b/`;

const iframe = document.createElement('iframe');
iframe.src = crossOriginSite;
document.body.appendChild(iframe);

function fetchFromCrossOriginServer (fetch) {
  return fetch(`${crossOriginHost}/greetings`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(err => console.log(err));
}

iframe.onload = function iframeOnload() {
  console.log('iframe on load');

  window.document.domain = 'daleoooo.dev';

  fetchFromCrossOriginServer(iframe.contentWindow.fetch)
    .then(res => console.log(res))
}
