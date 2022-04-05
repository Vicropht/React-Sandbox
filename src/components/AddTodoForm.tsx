import React, { ReactElement, useState } from 'react'
import { BaseTodo, priorities, priorityLabels } from '../interface';

type Props = {
  onAddTodo: (todo: BaseTodo) => void;
}

const initTodo: BaseTodo = { name: "", details: "", priority: priorities[0] };

function AddTodoForm(props: Props): ReactElement {
  const [formValue, setFormValue] = useState(initTodo);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.onAddTodo(formValue);
    const form: HTMLFormElement = document.getElementById('search-input') as HTMLFormElement;
    form.reset();
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div className="todo-form">
      <h1>Add todo</h1>
      <form id='add-form' onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            placeholder="What needs to be done?"
            name="name"
            maxLength={30}
            value={formValue.name}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Details</label>
          <input
            type="text"
            placeholder="Any details to add?"
            name="details"
            maxLength={50}
            value={formValue.details}
            onChange={onInputChange}
          />
        </div>
        <div className="form-row">
          <label>Priority</label>
          <select onChange={onInputChange} name="priority">
            {Object.entries(priorityLabels).map(([prio, label]) =>
              <option key={prio} value={prio}>{label}</option>
            )}
          </select>
        </div>
        <div className="form-row">
          <button>Create Todo</button>
        </div>
      </form>
    </div>
  )
}

export default AddTodoForm