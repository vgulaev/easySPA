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

function newGame() {
  let options = {
    'height': 10,
    'width': 10,
    'count': 12
  };
  app.newGame(options)
    .then((data) => {
      // let r = {"status":"ok","cells":[{"x":9,"y":3,"count":0},{"x":8,"y":2,"count":1},{"x":8,"y":3,"count":1},{"x":8,"y":4,"count":2},{"x":9,"y":2,"count":0},{"x":8,"y":1,"count":0},{"x":7,"y":0,"count":0},{"x":6,"y":0,"count":0},{"x":5,"y":0,"count":0},{"x":4,"y":0,"count":0},{"x":3,"y":0,"count":1},{"x":3,"y":1,"count":2},{"x":4,"y":1,"count":1},{"x":5,"y":1,"count":0},{"x":4,"y":2,"count":1},{"x":5,"y":2,"count":1},{"x":6,"y":1,"count":0},{"x":6,"y":2,"count":2},{"x":7,"y":1,"count":0},{"x":7,"y":2,"count":2},{"x":8,"y":0,"count":0},{"x":9,"y":0,"count":0},{"x":9,"y":1,"count":0},{"x":9,"y":4,"count":1}]}
      // app.updateField(r);
    });
}

window.addEventListener('load', async function( event ) {
  let el = document.getElementById('field');
  app = new App({'field': el});
  newGame();

  // requestData();
});
