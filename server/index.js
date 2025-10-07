const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Task = require("./models/task");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todo_app";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Mongo connection error", err));

app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

app.post("/api/tasks", async (req, res) => {
  const { title, status } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const task = new Task({ title, status: status || "backlog" });
  await task.save();
  res.status(201).json(task);
});

app.put("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const task = await Task.findByIdAndUpdate(id, updates, { new: true });
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
