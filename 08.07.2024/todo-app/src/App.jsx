import { useState } from "react";
import style from "./App.module.css";
import deleteIcon from "./assets/bin.png";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: crypto.randomUUID(),
      text: "Doctor Appointment",
      completed: true,
    },
    {
      id: crypto.randomUUID(),
      text: "Meeting at School",
      completed: false,
    },
  ]);

  const [newTask, setNewTask] = useState("");

  const HandleInput = (e) => {
    setNewTask(e.target.value);
  };

  const AddTask = () => {
    if (newTask.trim() === "") return;

    const newTaskObject = {
      id: crypto.randomUUID(),
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObject]);
    setNewTask("");
  };

  const DeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const ToggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className={style.container}>
      <header>
        <input
          type="text"
          placeholder="Add a TODO"
          value={newTask}
          onChange={HandleInput}
        />
        <button className={style.addButton} onClick={AddTask}>
          {" "}
          Add{" "}
        </button>
      </header>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              className={style.taskText}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <button
              className={`${style.doneButton} ${
                task.completed ? style.completed : style.incomplete
              }`}
              onClick={() => ToggleTaskCompletion(task.id)}
            >
              {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
            </button>
            <button
              className={style.deleteButton}
              onClick={() => DeleteTask(task.id)}
            >
              <img src={deleteIcon} width="18px" alt="Delete" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
