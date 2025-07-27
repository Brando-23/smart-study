import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';

function ViewTasks() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tasks');
      setTasks(response.data);
      console.log('Tasks fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleComplete = async (id) => {
    console.log("Trying to delete task:", id);
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      // Update UI immediately
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      console.log('Task deleted successfully:', id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>📋 All Tasks</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {tasks.length > 0 ? (
          tasks.map((task1) => (
            <TaskCard
              key={task1._id}
              id={task1._id}
              task={task1.task}
              description={task1.description}
              dueDate={task1.dueDate}
              priority={task1.priority}
              onComplete={handleComplete}
            />
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
}

export default ViewTasks;
