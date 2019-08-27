// class FakeServer {
//   static createBomb() {

//   }

//   static newGame(data) {
//     for (let i = 0; i < data.game.count; i++) {
//       console.log(`bomb created ${i}`)
//     }
//     console.log(data);
//     return 'I FakeServer.newGame';
//   }
// }

class App {
  getButtonByXY(x, y) {
    let el = document.getElementById(`x${x}y${y}`);
    return el;
  }

  updateField(data) {
    data.cells.forEach((row) => {
      let el = this.getButtonByXY(row.x, row.y);
      if (0 == row.count) {
        el.innerHTML = '&nbsp;';
      } else if (-1 == row.count) {
        el.innerHTML = '*';
      } else {
        el.innerHTML = row.count;
      }
      console.log(row);
    });
    // console.log(data);
    console.log('Hello from updateField');
  }

  onClickBox(x, y) {
    let o = this.gameOptions;
    return new Promise((resolve, reject) => {
      let options = {'x': x, 'y': y};
      httpGetAsync('POST', `https://${App.host}/games/${o.game.id}/reveal`, JSON.stringify(options))
        .then((data) => {
          let result = JSON.parse(data);
          this.updateField(result);
          resolve(result);
        });
    });
  }

  addRow(y) {
    let o = this.gameOptions;
    let content = '';
    for (let x = 0; x < o.game.width; x++ ) {
      content += `<button id="x${x}y${y}" onclick="app.onClickBox(${x}, ${y});" style="width: 25px;">_</button>`;
    }
    return content;
  }

  drawField() {
    let o = this.gameOptions;
    let content = '';
    for (let y = 0; y < o.game.height; y++) {
      content += `<div>${this.addRow(y)}</div>`;
    }
    this.fieldTag.innerHTML = content;
    console.log('drawField');
  }

  newGame(options) {
    return new Promise((resolve, reject) => {
      httpGetAsync('POST', 'https://fathomless-peak-55967.herokuapp.com/games', JSON.stringify(options))
        .then((data) => {
          this.gameOptions = JSON.parse(data);
          this.drawField();
          resolve(data);
        });
    });
  }

  constructor(options) {
    this.fieldTag = options['field'];
    // alert('I works');
  }

}

App.host = 'fathomless-peak-55967.herokuapp.com';
