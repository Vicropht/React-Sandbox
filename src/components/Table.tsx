import React from "react";
import { EPriority, ITodo } from "../interface";

// Props, Angular equivalent of @Import
interface Props {
  todos: Array<ITodo>;
  onEdit: (todo: ITodo) => void;
  onDelete: (todo: ITodo) => void;
}

const Table: React.FunctionComponent<Props> = props => {
  const translatePriority = (priority: EPriority) => {
    console.log(priority)
    switch (priority) {
      case EPriority.LOW:
        return 'Low Priority';

      case EPriority.MEDIUM:
        return 'Medium Priority';

      case EPriority.HIGH:
        return 'High Priority';
    }
  }

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
                <td>{i["name"]}</td>
                <td>{i["details"]}</td>
                <td>{translatePriority(i["priority"])}</td>
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
