import React from 'react';
import { MdDelete } from 'react-icons/md';
import { CiCircleCheck } from 'react-icons/ci';

const TodoList = () => {
  // States & Ref
  const [isCompleteScreen, setIsCompleteScreen] = React.useState(false);
  const [completeTodos, setCompleteTodos] = React.useState([]);
  const [list, setList] = React.useState([]);
  const [inputTitle, setInputTitle] = React.useState('');
  const [inputDesc, setInputDesc] = React.useState('');
  const inputTitleTxt = React.useRef();

  //Functions

  const addTodo = () => {
    let newItem = {
      title: inputTitle,
      desc: inputDesc,
    };

    setList([...list, newItem]);
    localStorage.setItem('ToDoList', JSON.stringify(newItem));
    setInputTitle('');
    setInputDesc('');
  };

  const deleteLi = (index) => {
    let reducedTodo = [...list];
    reducedTodo.splice(index);

    localStorage.setItem('ToDoList', JSON.stringify(reducedTodo));
    setList(reducedTodo);
  };

  //Return Component
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="inputs">
        <label>
          <h4>Title:</h4>
          <input
            ref={inputTitleTxt}
            placeholder="Title of your Todo"
            className="input"
            type="text"
            value={inputTitle}
            onChange={({ target }) => setInputTitle(target.value)}
          />
        </label>

        <label>
          <h4>Description:</h4>
          <input
            placeholder="Description of your Todo"
            className="input"
            type="text"
            value={inputDesc}
            onChange={({ target }) => setInputDesc(target.value)}
          />
        </label>

        <button className="button_addTask" onClick={addTodo}>
          Add
        </button>
      </div>
      <hr width="100%" />
      <div className="buttons">
        <button
          className={isCompleteScreen === false && 'active'}
          onClick={() => setIsCompleteScreen(false)}
        >
          To Do
        </button>
        <button
          className={isCompleteScreen === true && 'active'}
          onClick={() => setIsCompleteScreen(true)}
        >
          Completed
        </button>
      </div>
      {list.map(({ title, desc }, index) => (
        <div key={index} className="task">
          <div>
            <h4 key={title}>{title}</h4>
            <span key={desc}>{desc}</span>
          </div>
          <div className="icons">
            <MdDelete className="icon" onClick={() => deleteLi(index)} />
            <CiCircleCheck className="check-icon" />
          </div>
        </div>
      ))}
    </section>
  );
};

export default TodoList;
