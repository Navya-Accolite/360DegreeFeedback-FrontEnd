import React, { useEffect, useState } from 'react'
import '../index.css';
import HomeTable from './HomeTable';
import axios from 'axios';
import { ImportOutlined } from '@ant-design/icons';

function HomeContent() {
  
  const emailId = window.localStorage.getItem('emailId');
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4545/api/pendingResponses/"+emailId)
        .then((response) => setData(response.data));
    console.log(data)
}, []);

  return (
    <>
    <div>
      <h3>Your Feedbacks!</h3>
    </div>

    <div>
    <HomeTable data={data} />
    </div>
    
    </>

  )
}

export default HomeContent



// <div className='feedbacks'>
//           <div class="relative flex flex-col items-start p-4 mt-3 bg-green-100 rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100" draggable="true">
//             <button class="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
//               <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                 <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
//               </svg>
//             </button>
//             <span class="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">Design</span>
//             <h4 class="mt-3 text-sm font-medium">This is the title of the card for the thing that needs to be done.</h4>
//             <div class="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
//               <div class="flex items-center">
//                 <svg class="w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                   <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
//                 </svg>
//                 <span class="ml-1 leading-none">Dec 12</span>
//               </div>
//               <div class="relative flex items-center ml-4">
//                 <svg class="relative w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                   <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
//                 </svg>
//                 <span class="ml-1 leading-none">4</span>
//               </div>
//               <div class="flex items-center ml-4">
//                 <svg class="w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                   <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
//                 </svg>
//                 <span class="ml-1 leading-none">1</span>
//               </div>
//               <img class="w-6 h-6 ml-auto rounded-full" src='https://randomuser.me/api/portraits/women/26.jpg' />
//             </div>
//           </div>



//           <div class="relative flex flex-col items-start p-4 mt-3 bg-green-100 rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100" draggable="true">
//             <button class="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
//               <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                 <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
//               </svg>
//             </button>
//             <span class="flex items-center h-6 px-3 text-xs font-semibold text-green-500 bg-pink-100 rounded-full">Dev</span>
//             <h4 class="mt-3 text-sm font-medium">This is the title of the card for the thing that needs to be done.</h4>
//             <div class="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
//               <div class="flex items-center">
//                 <svg class="w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                   <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
//                 </svg>
//                 <span class="ml-1 leading-none">Dec 12</span>
//               </div>
//               <div class="relative flex items-center ml-4">
//                 <svg class="relative w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                   <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
//                 </svg>
//                 <span class="ml-1 leading-none">4</span>
//               </div>
//               <div class="flex items-center ml-4">
//                 <svg class="w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                   <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
//                 </svg>
//                 <span class="ml-1 leading-none">1</span>
//               </div>
//               <img class="w-6 h-6 ml-auto rounded-full" src='https://randomuser.me/api/portraits/men/64.jpg' />
//             </div>
//           </div>
//         </div>
     