import React from 'react';
import { MdDelete } from 'react-icons/md';
import { CiCircleCheck } from 'react-icons/ci';

const TodoList = () => {
  // States & Ref
  const [isCompleteScreen, setIsCompleteScreen] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [completeTodos, setCompleteTodos] = React.useState([]);
  const [inputTitle, setInputTitle] = React.useState('');
  const [inputDesc, setInputDesc] = React.useState('');
  const inputTitleTxt = React.useRef();

  //Functions

  React.useEffect(() => {
    let savedItems = JSON.parse(localStorage.getItem('ToDoList'));
    if (savedItems) {
      setList(savedItems);
    }
  }, []);

  const addTodo = () => {
    let newItem = {
      title: inputTitle,
      desc: inputDesc,
    };

    let UpdatedList = [...list];
    UpdatedList.push(newItem);
    setList(UpdatedList);
    localStorage.setItem('ToDoList', JSON.stringify(UpdatedList));

    setInputTitle('');
    setInputDesc('');
    inputTitleTxt.current.focus();
  };

  const deleteTodo = (index) => {
    if (isCompleteScreen === false) {
      let reducedTodo = [...list];
      reducedTodo.splice(index, 1);

      localStorage.setItem('ToDoList', JSON.stringify(reducedTodo));
      setList(reducedTodo);
    }

    if (isCompleteScreen === true) {
      let reducedCompleted = [...completeTodos];
      reducedCompleted.splice(index, 1);

      localStorage.setItem('ToDoList', JSON.stringify(reducedCompleted));
      setCompleteTodos(reducedCompleted);
    }
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    let completedOn = `${dd}-${mm}-${yyyy} at ${hour}:${minute}:${second}`;

    let filteredTodo = {
      ...list[index],
      completedOn: completedOn,
    };

    let CompletedArr = [...completeTodos, filteredTodo];
    setCompleteTodos(CompletedArr);

    let reducedTodo = [...list];
    reducedTodo.splice(index, 1);

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
      {isCompleteScreen === false &&
        list.map((item, index) => {
          return (
            <div key={index} className="task">
              <div>
                <h3>{item.title}</h3>
                <span>{item.desc}</span>
              </div>
              <div className="icons">
                <MdDelete className="icon" onClick={deleteTodo} />
                <CiCircleCheck
                  className="check-icon"
                  onClick={() => handleComplete(index)}
                />
              </div>
            </div>
          );
        })}

      {isCompleteScreen === true &&
        completeTodos.map((item, index) => (
          <div key={index} className="task">
            <div>
              <h3>{item.title}</h3>
              <span>{item.desc}</span>
              <p>{item.completedOn}</p>
            </div>
            <div className="icons">
              <MdDelete className="icon" onClick={deleteTodo} />
            </div>
          </div>
        ))}
    </section>
  );
};

export default TodoList;
