import React, { ReactElement, useEffect, useState } from "react";
import { priorityLabels, Todo } from "../interface";

// Props, Angular equivalent of @Import
interface Props {
  todos: Array<Todo>;
  onEdit(todo: Todo): void;
  onDelete(todo: Todo): void;
}

function Table(props: Props): ReactElement {
  const [list, setList] = useState(props.todos);
  const [hasActiveSearch, setHasActiveSearch] = useState(false);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const s = e.target.value;

    (s.length) ? setHasActiveSearch(true) : setHasActiveSearch(false);

    const filteredList = props.todos.filter((todo: Todo) => { return todo.name.includes(s) || todo.details.includes(s) });
    setList(filteredList);
  }

  useEffect(() => {
    setList(props.todos);
    const searchBar: HTMLInputElement = document.getElementById('search-input') as HTMLInputElement;
    searchBar.value = '';
  }, [props.todos])

  return (
    <div className="todo-table">
      <h1>View todos</h1>

      <label>Search</label>
      <input
        id="search-input"
        type="text"
        placeholder="Search for a todo"
        onChange={onSearch}
      />

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
          {list.length > 0 ? (
            list.map(i => (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.details}</td>
                <td>{priorityLabels[i.priority]}</td>
                <td>
                  <button onClick={() => props.onEdit(i)}>edit</button>
                  <button onClick={() => props.onDelete(i)}>delete</button>
                </td>
                <td>{hasActiveSearch}</td>
              </tr>
            ))
          ) : (
            <tr>
              {hasActiveSearch ?
                (<td colSpan={3}>No results for your search</td>) :
                (<td colSpan={3}>Your Todo List is empty! Start by creating a new Todo above</td>)
              }
            </tr>
          )}
        </tbody>
      </table>

      <p>{'You currently have ' + props.todos.length + ' todos left'}</p>
    </div>
  );
};
export default Table;
