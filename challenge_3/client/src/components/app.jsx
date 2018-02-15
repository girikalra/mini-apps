import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [[0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0]],
      turn: true,
      winner: false

    }
    this.handleClick = this.handleClick.bind(this);
  }

  checkRows() {
    var board = this.state.board;
    for (var i = 0; i <board.length; i++) {
      for (var j = 0; j < 4; j++) {
        var temp = board[i][j] + board[i][j+1] + board[i][j+2] + board[i][j+3]
        if (temp === 'XXXX') {
          console.log('x wins')
          this.setState({winner: 'red'});
        } else if(temp === 'OOOO') {
          console.log('o wins')
          this.setState({winner: 'yellow'});
        }
      }
    }
  }

  checkColumns() {
    var board = this.state.board;
    for (var i = 0; i <board.length-3; i++) {
      for (var j = 0; j < 7; j++) {
        var temp = board[i][j] + board[i+1][j] + board[i+2][j] + board[i+3][j]
        if (temp === 'XXXX') {
          console.log('x wins')
          this.setState({winner: 'red'});
        } else if(temp === 'OOOO') {
          console.log('o wins')
          this.setState({winner: 'yellow'});
        }
      }
    }
  }

  checkAcross() {
    var board = this.state.board;
    var combos = [
    [ board[0][3],board[1][4],board[2][5],board[3][6] ],
    [ board[1][3],board[2][4],board[3][5],board[4][6] ],
    [ board[2][3],board[3][4],board[4][5],board[5][6] ],
    [ board[0][3],board[1][2],board[2][1],board[3][0] ],
    [ board[1][3],board[2][2],board[3][1],board[4][0] ],
    [ board[2][3],board[3][2],board[4][1],board[5][0] ],
    [ board[5][3],board[4][4],board[3][5],board[2][6] ],
    [ board[4][3],board[3][4],board[2][5],board[1][6] ],
    [ board[3][3],board[2][4],board[1][5],board[0][6] ],
    [ board[5][3],board[4][2],board[3][1],board[2][0] ],
    [ board[4][3],board[3][2],board[2][1],board[1][0] ],
    [ board[3][3],board[2][2],board[1][1],board[0][0] ]
    ]

    for (var i = 0; i < combos.length; i++) {
      var temp = combos[i].join('');
      if (temp === 'XXXX') {
        console.log('x wins')
        this.setState({winner: 'red'});
      } else if (temp === 'OOOO') {
        console.log('o wins')
        this.setState({winner: 'yellow'});
      }
    }
  }


  handleClick(e) {
    if (!this.state.winner){
      var id = e.target.id;
      var board = this.state.board;
      var x = id.split('-')[0];
      var y = id.split('-')[1];
      var posx;
      var posy;
      for (var i = 5; i >= 0; i--) {
        if (board[i][y] === 0) {
          this.state.turn ? board[i][y] = 'X' : board[i][y] = 'O';
          this.setState({turn: !this.state.turn});
          break;
        }
      }

      this.checkRows();
      this.checkColumns();
      this.checkAcross(); 
    }
  }

  render() {

    var board = [];
    for (var i = 0; i < 6; i++) {
      var rowID = `${i}`
      var cell = [];
      for (var j = 0; j < 7; j++) {
        var cellID = `${i}-${j}`
        cell.push(<td key={cellID} id={cellID} className="box" onClick={this.handleClick}>{this.state.board[i][j]}</td>)
      }
      board.push(<tr key={i} id={rowID} className="board">{cell}</tr>)
    }

    if (this.state.winner) {
      return (
      <div>
        <table>
          <tbody>
            {board}
          </tbody>
        </table>
        <h1>{this.state.winner} wins</h1>
      </div>
      );
    }

    return (
      <div>
        <table>
          <tbody>
            {board}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;

