import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { baseUrl } from './auth';  // Assume this is the base API URL
import { accessToken } from './auth';  // Assume accessToken is a function that returns the token

const MyWorkBoards = () => {
  const [workboards, setWorkboards] = useState([]);  // State to store fetched workboards
  const navigate = useNavigate();

  // Function to handle navigation to create workboards page
  const handleClick = () => {
    navigate('/create-workboards');
  };

  // Fetch workboards from the API
  const fetchWorkboards = async () => {
    try {
      console.log('im try nnn')
      const response = await axios.get(`${baseUrl}/app/workboardListcreate/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setWorkboards(response.data);  // Assuming response.data is an array of workboards
      }
    } catch (error) {
      setWorkboards({id:'1',title:'arun',taskCount:'4'})
      console.log(error);
    }
  };

  // UseEffect to fetch workboards on component mount
  useEffect(() => {
    fetchWorkboards();
  }, []);

  return (
    <>
      <div className='w-full pl-6'>
        <h1 className='text-2xl font-bold mb-4'>My WorkBoards</h1>
        <button
          onClick={handleClick}
          className='flex items-center bg-white border border-gray-400 px-24 py-12 rounded-md mb-6 content-center text-center'
        >
          <PlusIcon className='w-6 h-6 text-gray-400' />
        </button>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {workboards.length > 0 ? (
            workboards.map((workboard) => (
              <div
                key={workboard.id}  // Assuming each workboard has an `id`
                className='bg-white shadow-md rounded-lg p-4 border border-gray-200'
              >
                <h2 className='text-xl font-semibold mb-2 text-black'>{workboard.title}</h2>
                <p className='text-gray-600'>Task Count: {workboard.taskCount}</p>
              </div>
            ))
          ) : (
            <p>No workboards found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyWorkBoards;



//workboards
