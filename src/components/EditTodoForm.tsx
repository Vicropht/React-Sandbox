import React, { useEffect, useState } from 'react'
import { ITodo, EPriority } from '../interface';


interface Props {
  todo: ITodo;
  // We can still accept null for the id, since the id for the todo will be assigned in the App
  onUpdateTodo: (id: number | null, too: ITodo) => void;
  setEdit: (bool: boolean) => void;
}

const EditTodoForm = (props: Props) => {
  const priorityEnum = EPriority;

  const [todo, setTodo] = useState(props.todo);

  // By using this Hook, you tell React that your component needs to do something after render.
  // React will remember this effect for later use, equivalent of ngOnInit for Angular
  useEffect(() => setTodo(props.todo), [props]);

  // Prevent creating a todo without a name or priority
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!todo.name || !todo.priority) {
      // TODO: Add form error handling
      return;
    }

    props.onUpdateTodo(todo.id, todo);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  return (
    <div className="todo-form">
      <h1>Edit Todo</h1>

      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            placeholder="What needs to be done?"
            name="name"
            value={todo.name}
            onChange={onInputChange}
            required
          />
          <div className="form-error">Empty entries are not accepted!</div>
        </div>

        <div className="form-row">
          <label>Details</label>
          <input
            type="text"
            placeholder="Any details to add?"
            name="details"
            value={todo.details}
            onChange={onInputChange}
          />
        </div>

        <div className="form-row">
          <label>Priority</label>
          <select name="priority">
            <option selected value={priorityEnum.LOW}>Low Priority</option>
            <option value={priorityEnum.MEDIUM}>Medium Priority</option>
            <option value={priorityEnum.HIGH}>High Priority</option>
          </select>
        </div>

        <div className="form-row">
          <button>Update Todo</button>
          <button onClick={() => props.setEdit(false)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditTodoForm