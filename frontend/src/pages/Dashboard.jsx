import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/tasks");
      setTasks(data);
    } catch (error) {
      setError("Failed to fetch tasks");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    
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
      } finally {
        setSubmitting(false);
      }
    } else {
      // Add new task
      try {
        await api.post("/tasks", { title });
        setTitle("");
        fetchTasks();
      } catch (error) {
        setError("Failed to add task");
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      setError("Failed to delete task");
      console.error(error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, { completed: !task.completed });
      fetchTasks();
    } catch (error) {
      setError("Failed to update task");
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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Task Manager</h1>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={addTask} className="mb-6">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder={editingTask ? "Edit task..." : "New task"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button 
                type="submit" 
                disabled={submitting}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {editingTask ? "Updating..." : "Adding..."}
                  </span>
                ) : (
                  editingTask ? "Update" : "Add"
                )}
              </button>
              {editingTask && (
                <button 
                  type="button" 
                  onClick={cancelEdit} 
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search task..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-2">
              {tasks
                .filter((task) =>
                  task.title.toLowerCase().includes(search.toLowerCase())
                )
                .length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="mt-2 text-sm">No tasks found</p>
                </div>
              ) : (
                tasks
                  .filter((task) =>
                    task.title.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((task) => (
                    <div key={task._id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <span 
                        className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                      >
                        {task.title}
                      </span>

                      <div className="flex space-x-2">
                        <button 
                          onClick={() => startEdit(task)} 
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          Edit
                        </button>

                        <button 
                          onClick={() => toggleComplete(task)} 
                          className={`px-3 py-1 rounded transition-colors ${
                            task.completed 
                              ? 'bg-yellow-500 hover:bg-yellow-600' 
                              : 'bg-green-500 hover:bg-green-600'
                          } text-white`}
                        >
                          {task.completed ? "Undo" : "Complete"}
                        </button>

                        <button 
                          onClick={() => deleteTask(task._id)} 
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
