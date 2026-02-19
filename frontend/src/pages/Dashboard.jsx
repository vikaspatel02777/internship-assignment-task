import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const { data } = await api.get("/tasks");
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    
    if (editingTask) {
      // Update existing task
      try {
        await api.put(`/tasks/${editingTask._id}`, { title });
        setEditingTask(null);
        setTitle("");
        fetchTasks();
      } catch (error) {
        setError("Failed to update task");
        console.error(error);
      }
    } else {
      // Add new task
      setLoading(true);
      try {
        await api.post("/tasks", { title });
        setTitle("");
        fetchTasks();
      } catch (error) {
        setError("Failed to add task");
        console.error("Error adding task:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setTitle("");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Task Manager</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={addTask} className="mb-6">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder={editingTask ? "Edit task..." : "New task"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-md"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? "Adding..." : (editingTask ? "Update" : "Add")}
            </button>
            {editingTask && (
              <button 
                type="button" 
                onClick={cancelEdit} 
                className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <ul className="space-y-2">
          {tasks
            .filter((task) =>
              task.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((task) => (
              <li key={task._id} className="flex justify-between items-center p-3 bg-white rounded-lg shadow">
                <span 
                  className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                >
                  {task.title}
                </span>

                <div className="flex space-x-2">
                  <button 
                    onClick={() => startEdit(task)} 
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button 
                    onClick={() => toggleComplete(task)} 
                    className={`px-3 py-1 rounded ${task.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </button>

                  <button 
                    onClick={() => deleteTask(task._id)} 
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
