import React, { useState, useEffect } from 'react';
import DeleteIcon from './icon/deleteIcon';
import DoneIcon from './icon/doneIcon';

function Todo() {
  const [isCompletedScreen, setIsCompletedScreen] = useState(false); //false==>means todo btn is selected 
  const [TodosList, setTodosList] = useState([]);
  const [TodoTitle, setTodoTitle] = useState('');
  const [TodoDescription, setTodoDescription] = useState('');
  const [TodoDate, setTodoDate] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const AddTODO = () => {
    let newTodoItem = {
      title: TodoTitle,
      description: TodoDescription,
      date:TodoDate
    };
    //copy all todo that in TodosList in a new one(updatedTodoArr) 
    let updatedTodoArr = [...TodosList];
    updatedTodoArr.push(newTodoItem);
    setTodosList(updatedTodoArr);
    //JSON.Stringify==>will store my arr as a string not as an object
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
    setTodoTitle('');
    setTodoDescription('');
    setTodoDate('');
  }
  const DeleteCompletedToDo=(index)=>{

    let reducedTodos = [...completedTodos];
    reducedTodos.splice(index,1);

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodos));
    setCompletedTodos(reducedTodos);
  }
  useEffect(() => {
    //to convert String to array
    let savedTodos = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedToDos = JSON.parse(localStorage.getItem ('completedTodos'))
    if (savedTodos) {
      setTodosList(savedTodos);
    }

    if (savedCompletedToDos) {
      setCompletedTodos (savedCompletedToDos);
    }
  }, []);

  const DeleteToDo = index => {
    let reducedTodos = [...TodosList];
    reducedTodos.splice(index,1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodos));
    setTodosList(reducedTodos);
  };
  const CompleteToDo = index => {
    const date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var minutes = date.getMinutes();
    var finalDate =
      dd + '/' + mm + '/' + yyyy + ' at  ' + hh + ':' + minutes ;

    let filteredTodo = {
      ...TodosList[index],
      completedOn: finalDate,
    };
    let updatedCompletedList = [...completedTodos];
    updatedCompletedList.push(filteredTodo)
    setCompletedTodos(updatedCompletedList);
    DeleteToDo(index);
    localStorage.setItem (
      'completedTodos',
      JSON.stringify (updatedCompletedList)
    );
  };
    return (
      <div className="App">
        <div className="container border">
          <h1 className="my-todo"> MY TODOS</h1>
          <div className="todo-inputs ">
            <div className="todo-input-item">
              <label for="title" >Title:</label>
              <input type="text" value={TodoTitle} onChange={(e) => { setTodoTitle(e.target.value) }}
                placeholder="What's The Title of Your To Do??" id="title" />
            </div>
            <div className="todo-input-item">
              <label for="desc">Description:</label>
              <input type="text" value={TodoDescription} onChange={(e) => { setTodoDescription(e.target.value) }}
                placeholder="What's The Description of Your To Do??" id="desc" />
            </div>
            <div className="todo-input-item1">
              <label for="datee">Select Date:</label>
              <input type="date" value={TodoDate} onChange={(e) => { setTodoDate(e.target.value) }}
                 id="datee" />
            </div>
          </div>
            <button className="btn-add" onClick={AddTODO}> Add</button>
          {/* toggle between two class */}
          <div className='divider'/>
          <div className="btn-area">
            <button
              className={`second-btn ${isCompletedScreen === false && 'active'}`}
              onClick={() => setIsCompletedScreen(false)}>
              Todo
            </button>
            <button
              className={`second-btn ${isCompletedScreen === true && 'active'}`}
              onClick={() => setIsCompletedScreen(true)}>
              Completed
            </button>
          </div>
          <div className="todo-list">
            {isCompletedScreen===false&&TodosList.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <h3>{item.title}</h3>
                  <br></br>
                  <p>{item.description}</p>
                  <p><i> Day:{item.date}</i></p>
                  <button className='icon-btn' onClick={() => DeleteToDo(index)} >
                    <DeleteIcon />
                  </button>
                  <button className='icon-btn' onClick={() => CompleteToDo(index)}>
                    <DoneIcon />
                  </button>
                </div>
              )
            })}
            {isCompletedScreen&&completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <h3>{item.title}</h3>
                  <br></br>
                  <p>{item.description}</p>
                  <p><i>Completed at:{item.completedOn}</i></p>
                  <button className='icon-btn' onClick={() => DeleteCompletedToDo(index)} >
                    <DeleteIcon />
                  </button>
                </div>
              )
            })}
            
          </div>
        </div>
      </div>
    )
  }
export default Todo;
