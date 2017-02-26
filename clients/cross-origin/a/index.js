const crossOriginHost = 'http://m.daleoooo.dev';
const crossOriginSite = `${crossOriginHost}/cross-origin/b/`;

window.document.domain = 'daleoooo.dev';

function appendToBody (element) {
  document.body.appendChild(element);
}

const iframe = document.createElement('iframe');
iframe.src = crossOriginSite;
appendToBody(iframe);

function fetchFromCrossOriginServer (fetchAPI) {
  return fetchAPI(`${crossOriginHost}/greetings`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(err => console.log(err));
}

/* iframe */
iframe.onload = function iframeOnload () {
  console.log('iframe on load');
}

const iframeFetchButton = document.createElement('button');
iframeFetchButton.onclick = iframeFetch;
iframeFetchButton.textContent = 'fetch via iframe';
appendToBody(iframeFetchButton);

function iframeFetch () {
  fetchFromCrossOriginServer(iframe.contentWindow.fetch)
    .then(res => console.log(res))
}

/* window.open */
const openTabButton = document.createElement('button');
openTabButton.onclick = openTab;
openTabButton.textContent = 'open tab';
appendToBody(openTabButton);

let crossOriginWindow = null;
function openTab () {
  crossOriginWindow = window.crossOriginWindow = window.open(crossOriginSite);
}

const fetchCrossOriginButton = document.createElement('button');
fetchCrossOriginButton.onclick = fetchCrossOrigin;
fetchCrossOriginButton.textContent = 'fetch via new tab';
appendToBody(fetchCrossOriginButton);

function fetchCrossOrigin () {
  fetchFromCrossOriginServer(crossOriginWindow.fetch)
    .then(res => console.log(res));
}

/* jsonp */
const jsonpButton = document.createElement('button');
jsonpButton.onclick = jsonp;
jsonpButton.textContent = 'jsonp';
appendToBody(jsonpButton);

function jsonp () {
  const tag = document.createElement("script");
  tag.src = `${crossOriginHost}/greetings?callback=jsonpCallback`;
  document.getElementsByTagName("head")[0].appendChild(tag);
}

function jsonpCallback (res) {
  console.log('jsonp', res);
}

