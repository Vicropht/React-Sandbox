import React, { useState } from 'react';
import { BaseTodo, Todo, priorities } from './interface';
import Table from './components/Table'
import EditTodoForm from './components/EditTodoForm';
import AddTodoForm from './components/AddTodoForm';
import { nanoid } from 'nanoid';

const defaultTodos: Array<Todo> = [];
const initCurrentTodo: Todo = { details: "", name: "", priority: priorities[0], id: '' };

function App() {
  const [todos, setTodos] = useState(defaultTodos);
  const [editTodo, setEditTodo] = useState(initCurrentTodo);
  const [editing, setEdit] = useState(false);

  const onAddTodo = (newTodo: BaseTodo) => {
    const id = nanoid();
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
      <div className="body-wrapper">
        {editing ? (
          <EditTodoForm
            todo={editTodo}
            onUpdateTodo={onUpdateTodo}
            setEdit={setEdit}
          />
        ) : (
          <div className='add-form'>
            <AddTodoForm onAddTodo={onAddTodo} />
          </div>
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
