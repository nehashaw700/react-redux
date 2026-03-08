import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import store from './app/store';

import { Provider } from 'react-redux';
import SearchTab from './components/SearchTab';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
      </header> */}
      <Provider store={store}>
      {/* <TodoList /> */}
      <SearchTab />
      </Provider>
    </div>
  );
}

export default App;
