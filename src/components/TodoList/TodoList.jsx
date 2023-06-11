import React from 'react';
import classNames from 'classnames';
import Todo from '../Todo';
import './TodoList.css';
// import './TodoList.scss';

const TodoList = ({ todos, onDeleteTodo, onToggleCompleted }) => (
  <ul className="TodoList">
    {todos.map(({ id, text, completed }) => (
      <li
        key={id}
        className={classNames('TodoList__item', {
          'TodoList__item--completed': completed,
        })}
      >
        <Todo
          // Рефакторинг коду - винесли в окремий компонент Todo
          text={text}
          completed={completed}
          onToggleCompleted={() => onToggleCompleted(id)}
          onDelete={() => onDeleteTodo(id)}
        />

        {/* <input
          type="checkbox"
          className="TodoList__checkbox"
          checked={completed}
          onChange={() => onToggleCompleted(id)}
        />
        <p className="TodoList__text">{text}</p>
        <button
          type="button"
          className="TodoList__btn"
          onClick={() => onDeleteTodo(id)}
        >
          Видалити
        </button> */}
      </li>
    ))}
  </ul>
);

export default TodoList;
