import logo from './logo.svg';
import './App.css';

import {foo, bar} from "./Util"

const onClick = function(e){
  console.log(e)
}

const uncovered = function() {
    console.log("uncovered")
    foo()
    if(false) {
      console.log("never covered")
    }
}

console.log("app");
uncovered();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" onClick={onClick} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
