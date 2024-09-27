import React, { useState } from 'react';

const CreateWorkBoards = () => {
  const [showTaskFields, setShowTaskFields] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [status, setStatus] = useState('To-Do');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    setShowTaskFields(true);
  };

  const handleSubmitTask = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      if (taskTitle && assignTo) {
        const newTask = {
          title: taskTitle,
          description: taskDescription,
          assignedTo: assignTo,
          status,
        };
        setTasks([...tasks, newTask]);
        // Reset fields for the next entry
        setTaskTitle('');
        setTaskDescription('');
        setAssignTo('');
        setStatus('To-Do');
      }
    }
  };

  const handleCreateWork = (e) => {
    e.preventDefault();
  }

  return (
    <div className='pl-4 pt-3 w-1/2'>
      <h2 className='text-gray-950 font-bold'>Create a WorkBoard</h2>
      <form className='flex flex-col gap-8 pt-9'>
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
        {/* Render the task cards below the Board Description input */}
      <div className='pt-6'>
        {tasks.map((task, index) => (
          <div key={index} className='p-4 bg-white border border-gray-300 rounded shadow-md mb-4'>
            <h3 className='font-bold'>{task.title}</h3>
            <p className='text-gray-600'>{task.description}</p>
            <p className='text-gray-800'>Assigned To: {task.assignedTo}</p>
            <p className='text-gray-800'>Status: {task.status}</p>
          </div>
        ))}
      </div>
        
        {showTaskFields ? (
          <div className='flex flex-col gap-4'>
            <input
              type="text"
              placeholder='Task Title'
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              onKeyDown={handleSubmitTask} // Listen for Enter key
              className='bg-gray-200 py-2 pl-2 w-full border border-gray-400 rounded'
              required
            />
            <input
              type="text"
              placeholder='Task Description'
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              onKeyDown={handleSubmitTask} // Listen for Enter key
              className='bg-gray-200 py-2 pl-2 w-full border border-gray-400 rounded'
            />
            <input
              type="text"
              placeholder='Assign To'
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              onKeyDown={handleSubmitTask} // Listen for Enter key
              className='bg-gray-200 py-2 pl-2 w-full border border-gray-400 rounded'
              required
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className='bg-gray-200 py-2 pl-2 w-full border border-gray-400 rounded'
            >
              <option value="To-Do">To-Do</option>
              <option value="Processing">Processing</option>
              <option value="Finished">Finished</option>
            </select>
          </div>
        ) : (
          <div>
            <button
              type="button"
              onClick={handleAddTask}
              className='bg-white text-gray-400 py-2 border-2 border-gray-400 rounded w-full text-center'
            >
              Add Task
            </button>
          </div>
        )}
        <button onSubmit={handleCreateWork} className='w-full text-center bg-green-600'>Create Work Board</button>
      </form>
    </div>
  );
};

export default CreateWorkBoards;