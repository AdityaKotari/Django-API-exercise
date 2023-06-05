import './App.css';
import logo from './logo.svg';
import './components/TodoList'
import TodoList from './components/TodoList';

export function App() {
  return (
    <div className="App">
      <h2>Aditya Kotari, Adbrew take-home assignment</h2>
      <TodoList/>
    </div>
  );
}

export default App;
