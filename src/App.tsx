import React, { useState } from 'react';
import { EPriority, IBaseTodo, ITodo } from './interace';
import Table from './components/Table'
import EditTodoForm from './components/EditTodoForm';
import AddTodoForm from './components/AddTodoForm';

const defaultTodos: Array<ITodo> = [];
const initCurrentTodo: ITodo = { details: "", name: "", priority: EPriority.LOW, id: null };

function App() {
  const [todos, setTodos] = useState(defaultTodos);
  const [editTodo, setEditTodo] = useState(initCurrentTodo);
  const [editing, setEdit] = useState(false);

  const onAddTodo = (newTodo: IBaseTodo) => {
    const id = todos.length + 1;
    setTodos([...todos, { ...newTodo, id }]);
  };
  const onCurrentTodo = (todo: ITodo) => {
    setEditTodo(todo);
    setEdit(true);
  };
  const onUpdateTodo = (id: number | null, updatedTodo: ITodo) => {
    setEdit(false);
    setTodos(todos.map(i => (i.id === id ? updatedTodo : i)));
  };
  const onDeleteTodo = (todo: ITodo) => {
    setTodos(todos.filter(i => i.id !== todo.id));
  };

  return (
    <div className="App">
      <h1>CRUD App with Hooks</h1>

      <div className="user-flex-wrapper">
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
