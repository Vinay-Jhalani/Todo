import React, { useEffect, useState } from "react";
import api from "./api";
import Navbar from "./components/Navbar";

const STATUSES = ["backlog", "not-started", "completed"];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [newStatus, setNewStatus] = useState(STATUSES[0]);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const res = await api.get("/tasks");
    setTasks(res.data);
  }

  async function addTask(e) {
    e.preventDefault();
    if (!title) return;
    await api.post("/tasks", { title, status: newStatus });
    setTitle("");
    setNewStatus(STATUSES[0]);
    fetchTasks();
  }

  async function updateTask(id, updates) {
    await api.put(`/tasks/${id}`, updates);
    fetchTasks();
  }

  async function deleteTask(id) {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  }
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Todo App</h1>
        <form onSubmit={addTask} className="add-form">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task"
          />
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button type="submit">Add</button>
        </form>

        <div className="board">
          {STATUSES.map((status) => (
            <section key={status} className={`column column-${status}`}>
              <h2>{status.replace("-", " ")}</h2>
              <div className="column-list">
                {tasks
                  .filter((t) => t.status === status)
                  .map((task) => (
                    <div key={task._id} className="task card">
                      <div>
                        <strong>{task.title}</strong>
                        <div className="meta">
                          {new Date(task.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div className="task-right">
                        <select
                          value={task.status}
                          onChange={(e) =>
                            updateTask(task._id, { status: e.target.value })
                          }
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <button onClick={() => deleteTask(task._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
