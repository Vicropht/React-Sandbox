import React from "react";
import { ITodo } from "../interace";

// Props, Angular equivalent of @Import
interface IProps {
  todos: Array<ITodo>;
  onEdit: (user: ITodo) => void;
  onDelete: (user: ITodo) => void;
}

const Table: React.FunctionComponent<IProps> = props => {
  return (
    <div className="user-table">
      <h1>View users</h1>
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
                <td>{i["priority"]}</td>
                <td>
                  <button onClick={() => props.onEdit(i)}>edit</button>
                  <button onClick={() => props.onDelete(i)}>delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>Your Todo List is empty! Start by creating a new Todo (+)</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
