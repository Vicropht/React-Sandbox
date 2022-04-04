import React, { useState } from 'react';
import { BaseTodo, Todo, priorities } from './interface';
import Table from './components/Table'
import EditTodoForm from './components/EditTodoForm';
import AddTodoForm from './components/AddTodoForm';

const defaultTodos: Array<Todo> = [];
const initCurrentTodo: Todo = { details: "", name: "", priority: priorities[0], id: null };

function App() {
  const [todos, setTodos] = useState(defaultTodos);
  const [editTodo, setEditTodo] = useState(initCurrentTodo);
  const [editing, setEdit] = useState(false);

  const onAddTodo = (newTodo: BaseTodo) => {
    // FIXME: breaks if you delete stuff. should prob use nanoid or something like that
    // https://www.npmjs.com/package/nanoid
    const id = todos.length + 1;
    setTodos([...todos, { ...newTodo, id }]);
  };
  const onCurrentTodo = (todo: Todo) => {
    setEditTodo(todo);
    setEdit(true);
  };
  const onUpdateTodo = (id: Todo['id'], updatedTodo: Todo) => {
    setEdit(false);
    setTodos(todos.map(i => (i.id === id ? updatedTodo : i)));
  };
  const onDeleteTodo = (todo: Todo) => {
    setTodos(todos.filter(i => i.id !== todo.id));
  };

  return (
    <div className="App">
      <h1>Tooodooo</h1>

      <div className="todo-flex-wrapper">
        {editing ? (
          <EditTodoForm
            todo={editTodo}
            onUpdateTodo={onUpdateTodo}
            setEdit={setEdit}
          />
        ) : (
          <AddTodoForm onAddTodo={onAddTodo} />
        )}
        <Table
          todos={todos}
          onEdit={onCurrentTodo}
          onDelete={onDeleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
