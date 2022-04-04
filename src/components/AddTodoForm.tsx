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

    console.log(formValue)

    props.onAddTodo(formValue);
    setFormValue(initTodo);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(e.target.value)
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div className="todo-form">
      <h1>Add todo</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            placeholder="What needs to be done?"
            name="name"
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
            value={formValue.details}
            onChange={onInputChange}
          />
        </div>
        <div className="form-row">
          <label>Priority</label>
          <select defaultValue={priorities[0]} onChange={onInputChange} name="priority">
            {Object.entries(priorityLabels).map(([prio, label]) =>
              <option value={prio}>{label}</option>
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