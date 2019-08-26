function httpGetAsync(method, theUrl, data = null) {
  return new Promise((resolve, reject) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) resolve(xmlHttp.responseText);
    }
    xmlHttp.open(method, theUrl, true);
    if ('POST' == method) {
      xmlHttp.setRequestHeader("Content-Type", "application/json");
    }
    xmlHttp.send(data);
  });
}

function requestData() {
  httpGetAsync('GET', 'https://fathomless-peak-55967.herokuapp.com/echo/all')
    .then((data) => {
      let el = document.getElementById('getRequest');
      el.innerText = data;
    });
  let mySongs = ['Happy New Year', 'Jingle balls'];
  httpGetAsync('POST', 'https://fathomless-peak-55967.herokuapp.com/echo/songs', JSON.stringify(mySongs))
    .then((data) => {
      let el = document.getElementById('postRequest');
      el.innerText = data;
    });
}

window.addEventListener('load', async function( event ) {
  // requestData();
});
