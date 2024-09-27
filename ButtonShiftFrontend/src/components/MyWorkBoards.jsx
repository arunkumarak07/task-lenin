import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { baseUrl, accessToken } from './auth';  // Ensure these are correctly exported from './auth'

const MyWorkBoards = () => {
  const [workboards, setWorkboards] = useState([]);  // State to store fetched workboards
  const [loading, setLoading] = useState(true);      // State to handle loading status
  const [error, setError] = useState(null);          // State to handle errors
  const navigate = useNavigate();

  // Function to handle navigation to create workboards page
  const handleClick = () => {
    navigate('/create-workboards');
  };

  // Fetch workboards from the API
  const fetchWorkboards = async () => {
    try {
      console.log('Attempting to fetch workboards...');
      const response = await axios.get(`${baseUrl}/app/workboardListcreate/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Ensure accessToken is a function if imported as such
        },
      });

      if (response.status === 200) {
        console.log('Workboards fetched successfully:', response.data);
        setWorkboards(response.data);  // Assuming response.data is an array of workboards
      } else {
        console.warn('Unexpected response status:', response.status);
        setError('Unexpected response from the server.');
      }
    } catch (error) {
      console.error('Error fetching workboards:', error);
      setError('Failed to fetch workboards. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to fetch workboards on component mount
  useEffect(() => {
    fetchWorkboards();
  }, []);

  return (
    <div className='w-full pl-6 pr-6 py-4'>
      <h1 className='text-3xl font-bold mb-6 text-center'>My WorkBoards</h1>

      {/* Create WorkBoard Button */}
      <div className='flex justify-center mb-8'>
        <button
          onClick={handleClick}
          className='flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md shadow-md transition duration-300'
        >
          <PlusIcon className='w-6 h-6 text-white' />
          <span className='ml-2 font-semibold'>Create WorkBoard</span>
        </button>
      </div>

      {/* Display Loading, Error, or WorkBoards */}
      {loading ? (
        <p className='text-center text-gray-500'>Loading workboards...</p>
      ) : error ? (
        <p className='text-center text-red-500'>{error}</p>
      ) : workboards.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1'>
          {workboards.map((workboard) => (
            <div
              key={workboard.id}  // Ensure each workboard has a unique `id`
              className='bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300 w-60'
            >
              <h2 className='text-lg font-semibold mb-3 text-black'>{workboard.workboardTitle}</h2>
              <div className='flex justify-between items-center'>
                <span className='text-gray-600'>Tasks: {workboard.tasks_count}</span>
                <span className='text-gray-600'>Assigned by ID: {workboard.assigned_by}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyWorkBoards;