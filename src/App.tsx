import { nanoid } from 'nanoid';
import { useState } from 'react';
import Accordion from './components/Accordion';
import AddTodoForm from './components/AddTodoForm';
import EditTodoForm from './components/EditTodoForm';
import Table from './components/Table';
import { BaseTodo, priorities, Todo } from './interface';

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
      <h1 className='title'>Vicrophts Bizarre React Sandbox</h1>
      <div className="body-wrapper">
        <div className='todo-section'>
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
        <Accordion />
      </div>
    </div>
  );
}

export default App;
