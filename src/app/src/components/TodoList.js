import { useState, useEffect } from 'react'

const TodoList = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    // replace with env var to API URL?
    fetch("http://localhost:8000/todos/", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(data => {
        data = JSON.parse(data)
        if (!data || !data.todo || !Array.isArray(data.todo)) {
          console.log("Incorrect response recieved in place of todo list.");
        } else {
          setTodos(data.todo)
        }
      }).catch(error => {
        console.log("Error fetching todos:", error);
      })
  }, [])

  const handleAddTodo = (todo) => {
    if (todo) {
      fetch("http://localhost:8000/todos/", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ todo: todo })
      }).then(res => res.json())
        .then(data => {
          data = JSON.parse(data)
          if (!data || !data.todo || !Array.isArray(data.todo)) {
            console.log("Incorrect response recieved in place of todo list.");
          } else {
            setTodos(data.todo)
          }
        }).catch(error => {
          console.log("Error updating todos:", error);
        })
    }

  }

  return (
    <div>
      <div>
        {/* <p>{JSON.stringify(todos)}</p> */}
        <h1>List of TODOs</h1>
        <ol>
          {todos.map((todo) => (
            <li key={JSON.stringify(todo._id)}>{todo.todo}</li>
          ))}
        </ol>
      </div>
      <div>
        <h1>Create a ToDo</h1>
        <form>
          <div>
            <label >ToDo: </label>
            <input type="text" id="todoInput" />
          </div>
          <div style={{ "marginTop": "5px" }}>
            <button onClick={() => handleAddTodo(document.getElementById('todoInput').value)}>Add ToDo!</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TodoList