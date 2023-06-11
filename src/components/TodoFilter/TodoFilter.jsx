import React from 'react';
import './TodoFilter.css';

const TodoFilter = ({ value, onChange }) => (
  <div className="TodoFilter">
    <p className="TodoFilter__label">Filter by content</p>
    <input
      type="text"
      className="TodoFilter__input"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TodoFilter;

// const Filter = ({ value, onChange }) => (
//   <label>
//     Filter by name
//     <input
//       type="text"
//       value={value}
//       onChange={onChange}
//       style={{
//         backgroundColor: '#fff ',
//         outline: '1px solid rgba(33, 33, 33, 0.2)',
//         borderRadius: '4px',
//         border: '1px solid rgba(33, 33, 33, 0.2)',
//       }}
//     />
//   </label>
// );

// export default Filter;
