import React, { useState, useEffect } from "react";
// importing react icon 
import { IoIosCheckbox } from "react-icons/io";
// importing custom css
import "./Todo.css";

const ToDo = () => {
  const [tasks, setTasks] = useState([]); //empty array to store added task
  const [NewTask, setNewTask] = useState(""); //empty string to store task
  const [completedTasks, setCompletedTasks] = useState([]); //empty array to store completed task
  const [inProgress, setInProgress] = useState(0);  //use to count the number of task that are not completed
  const [countCompleted, setCountCompleted] = useState(0); //use to count the number of task that are completed

  //function to count the changes made within tasks and completedTasks
  useEffect(() => { 
    setInProgress(tasks.length);
    setCountCompleted(completedTasks.length);
  }, [tasks, completedTasks]);

  // function to extract value of the input 
  function handleInputTask(e) {
    setNewTask(e.target.value);
  }

  //function to add task btn
  function handleAddBtn() {
    if (NewTask.trim() !== "") {
      setTasks((prevTasks) => [...prevTasks, NewTask]);
      setNewTask("");
    }
  }


  //function add task on hitting enter
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleAddBtn();
    }
  }

  //function to delete task btn
  function handleDeleteTaskBtn(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  //function to done task btn
  function handleDoneBtn(index) {
    const taskToComplete = tasks[index];
    setCompletedTasks((prevCompleted) => [...prevCompleted, taskToComplete]);
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  // function to clear task btn 
  function handleClearbtn() {
    setCompletedTasks([]);
  }

  return (

    //main div in which all the content is included
    <div className="m-6 h-screen bg-cover bg-center p-4 shadow-lg rounded-l bg-gray-700">
      {/* title of the page */}
      <h1 className="text-center mb-4 text-4xl font-bold text-white font-mono">
        To-do List
      </h1>
      {/* div for input field and add task button  */}
      <div className="flex gap-4 justify-center">
        <input
          type="text"
          value={NewTask}
          onChange={handleInputTask}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          className="border px-4 py-2 rounded-lg w-[50%]"
        />
        <button
          onClick={handleAddBtn}
          className="px-4 py-2 text-white bg-green-700 rounded-lg shadow-lg hover:shadow-green-400 transition duration-300"
        >
          Add Task
        </button>
      </div>

      <hr className="my-6" />

      {/* div to display the status of the tasks  */}
      <div className="w-[30%] px-6 py-3 rounded-2xl font-mono my-4 bg-gray-100">
        <h2 className="font-bold text-2xl blinking-text">Status:</h2>
        <p className="font-semibold">
          Task to be Completed:{" "}
          <span className="text-red-700 text-lg blinkRed">{inProgress}</span>
        </p>
        <p className="font-semibold">
          Task completed:{" "}
          <span className="text-green-700 text-lg blinkGreen">
            {countCompleted}
          </span>
        </p>
      </div>
      {/* main div in which task which are in progress and are completed is shown  */}
      <div className="flex justify-evenly gap-4 max-h-72">
        {/* div in which task which are in progress in shown  */}
        <div className="shadow-xl px-10 py-5 w-full  rounded-2xl max-h-72 overflow-y-auto bg-gray-100">
          <h2 className="text-xl font-bold bg-red-700 text-center py-2 px-3 rounded-xl text-white font-mono">
            In Progress...
          </h2>
          <ol>
            {tasks.map((task, index) => (
              <React.Fragment key={index}>
                <li className="flex  justify-between py-4">
                  <p className="text-xl font-mono flex gap-4">
                    <span>{index + 1}.</span>
                    {task}
                  </p>
                  <div className="flex  gap-2">
                    <button
                      onClick={() => handleDeleteTaskBtn(index)}
                      className="w-auto h-12 px-4 py-2 text-white bg-red-700 rounded-lg shadow-lg hover:shadow-red-400 transition duration-300"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleDoneBtn(index)}
                      className=" w-auto h-12 px-4 py-2 text-white bg-green-700 rounded-lg shadow-lg hover:shadow-green-400 transition duration-300"
                    >
                      Done
                    </button>
                  </div>
                </li>
                <hr className="border-gray-300" />
              </React.Fragment>
            ))}
          </ol>
        </div>

        {/* div in which the completed task are shown */}
        <div className="shadow-xl px-10 py-5 w-full bg-gray-100 rounded-2xl max-h-72 overflow-y-auto ">
          <h2 className="text-xl font-bold bg-green-700 text-center py-2 px-3 rounded-xl text-white font-mono mb-4">
            Completed...
          </h2>
          <ul>
            {completedTasks.map((task, index) => (
              <li key={index}>
                <p className="text-xl font-mono flex justify-between gap-4">
                  <span>
                    {index + 1}. {task}
                  </span>
                  <IoIosCheckbox className="text-green-700 w-auto h-12 " />
                </p>
                <hr className="border-gray-300 my-5" />
              </li>
            ))}
          </ul>
          {/* adding functionality to show the clear all button when the completed task have at least one task or else hidden  */}
          <div className="flex">
            {completedTasks < 1 ? (
              <button
                onClick={handleClearbtn}
                className="px-4 py-2 text-white bg-red-700 rounded-lg shadow-lg hover:shadow-red-400 transition duration-300 hidden"
              >
                Clear
              </button>
            ) : (
              <button
                onClick={handleClearbtn}
                className="px-4 py-2 text-white bg-red-700 rounded-lg shadow-lg hover:shadow-red-400 transition duration-300"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
