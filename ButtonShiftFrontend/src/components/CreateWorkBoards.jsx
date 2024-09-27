import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from './auth';
import { ACCESS_TOKEN } from './constants';

const CreateWorkBoards = () => {
  const [showTaskFields, setShowTaskFields] = useState(false);
  const [taskForm, setTaskForm] = useState({
    taskTitle: '',
    taskDescription: '',
    assignTo: '',
    status: 'To-Do',
  });
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch tasks using axios
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/app/workboardListcreate/`,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`, // Add your token or any other headers
            'Content-Type': 'application/json',
          },
        });
        confirm.log(response.data)
        if (response.status === 200) {
          console.log(response.data)
          setTasks(response.data); // Assuming response.data is an array of tasks
        }
      } catch (error) {
        setError('Failed to load tasks.');
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTaskField = () => {
    setShowTaskFields(true);
  };

  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleTaskSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { taskTitle, assignTo } = taskForm;
      if (taskTitle && assignTo) {
        setTasks([...tasks, { ...taskForm }]);
        resetTaskForm();
      }
    }
  };

  const resetTaskForm = () => {
    setTaskForm({
      taskTitle: '',
      taskDescription: '',
      assignTo: '',
      status: 'To-Do',
    });
  };

  const handleCreateWorkBoard = (e) => {
    e.preventDefault();
    // Logic for creating workboard can be added here
  };

  return (
    <div className='pl-4 pt-3 w-1/2'>
      <h2 className='text-gray-950 font-bold'>Create a WorkBoard</h2>
      <form onSubmit={handleCreateWorkBoard} className='flex flex-col gap-8 pt-9'>
        <div className='bg-gray-200 border-2 border-gray-400 rounded-lg shadow-md'>
          <input
            type="text"
            placeholder='Name your Board'
            className='bg-transparent py-2 pl-2 w-full'
          />
        </div>
        <div className='border-b-2 border-gray-400'>
          <input
            type="text"
            placeholder='Board description'
            className='bg-transparent py-2 pl-2 w-full'
          />
        </div>

        {/* Render task cards if tasks exist */}
        <div className='pt-6'>
          {loading ? (
            <></>
          ) : error ? (
            <></>
          ) : tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div key={index} className='p-4 bg-white border text-black border-gray-300 rounded shadow-md mb-4'>
                <h3 className='font-bold'>{task.taskTitle}</h3>
                <p className='text-gray-600'>{task.taskDescription}</p>
                <p className='text-gray-800'>Assigned To: {task.assignTo}</p>
                <p className='text-gray-800'>Status: {task.status}</p>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>

        {/* Show task input fields if Add Task is clicked */}
        {showTaskFields ? (
          <div className='flex flex-col gap-4'>
            <input
              type="text"
              name="taskTitle"
              placeholder='Task Title'
              value={taskForm.taskTitle}
              onChange={handleTaskFormChange}
              className='bg-gray-200 py-2 pl-2 w-full border border-gray-400 rounded'
              required
            />
            <input
              type="text"
              name="taskDescription"
              placeholder='Task Description'
              value={taskForm.taskDescription}
              onChange={handleTaskFormChange}
              className='bg-gray-200 py-2 pl-2 w-full border border-gray-400 rounded'
            />
            <input
              type="text"
              name="assignTo"
              placeholder='Assign To'
              value={taskForm.assignTo}
              onChange={handleTaskFormChange}
              onKeyDown={handleTaskSubmit}
              className='bg-gray-200 py-2 pl-2 w-full border border-gray-400 rounded'
              required
            />
            <select
              name="status"
              value={taskForm.status}
              onChange={handleTaskFormChange}
              onKeyDown={handleTaskSubmit}
              className='bg-gray-200 py-2 pl-2 w-full border border-gray-400 rounded'
            >
              <option value="To-Do">To-Do</option>
              <option value="Processing">Processing</option>
              <option value="Finished">Finished</option>
            </select>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAddTaskField}
            className='bg-white text-gray-400 py-2 border-2 border-gray-400 rounded w-full text-center'
          >
            Add Task
          </button>
        )}
        <button type="submit" className='w-full text-center text-white bg-green-600'>Create Work Board</button>
      </form>
    </div>
  );
};

export default CreateWorkBoards;