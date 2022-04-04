import React, { ReactElement } from "react";
import { Priority, priorityLabels, Todo } from "../interface";

// Props, Angular equivalent of @Import
interface Props {
  todos: Array<Todo>;
  onEdit(todo: Todo): void;
  onDelete(todo: Todo): void;
}

function Table(props: Props): ReactElement {
  return (
    <div className="todo-table">
      <h1>View todos</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Details</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {/* Are there any todos? Else, show the empty table message */}
          {props.todos.length > 0 ? (
            props.todos.map(i => (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.details}</td>
                <td>{priorityLabels[i.priority]}</td>
                <td>
                  <button onClick={() => props.onEdit(i)}>edit</button>
                  <button onClick={() => props.onDelete(i)}>delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>Your Todo List is empty! Start by creating a new Todo above</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
