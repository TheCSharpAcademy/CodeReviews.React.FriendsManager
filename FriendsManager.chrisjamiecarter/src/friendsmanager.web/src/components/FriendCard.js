import React from 'react';
import { Link } from "react-router-dom";
import { differenceInDays, parseISO } from 'date-fns';

const FriendCard = ({ friend }) => {
  const { id, name, desiredContactFrequency, lastContactDate, lastContactType, category } = friend;
  const lastContactDaysAgo = differenceInDays(new Date(), parseISO(lastContactDate));
  const needsAttention = lastContactDaysAgo > desiredContactFrequency;

  return (
    <div className={`w-full max-w-sm overflow-hidden rounded-lg shadow-lg ${needsAttention ? 'border-2 border-red-500' : ''}`}>

      <div className="px-6 py-4">
        <h1 className="text-center text-xl font-semibold text-gray-800">{name}</h1>

        <div className='py-4'>
          <p className="font-semibold text-gray-700">
            Date: <span className="font-normal">{parseISO(lastContactDate).toDateString()}</span>
          </p>
          <p className="font-semibold text-gray-700">
            Type: <span className="font-normal">{lastContactType}</span>
          </p>
          <p className="font-semibold text-gray-700">
            Elapsed Days: <span className={needsAttention ? 'font-normal text-red-500' : 'font-normal'}>{lastContactDaysAgo}/{desiredContactFrequency}</span>
          </p>
        </div>

        <div className="flex items-center py-2 text-gray-700">
          <svg aria-label="category icon" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current" viewBox="0 0 24 24" >
            <path d="M14 11H10V13H14V11Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z" />
          </svg>
          <p className="px-2 text-sm text-gray-700">{category.name}</p>
        </div>

        <div className="flex justify-between pt-4 text-gray-700">
          <Link to={`/friend/contact/${id}`}>
            <button type="button" className="px-5 py-2 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              <svg aria-label='add icon' xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 448 512">
                <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256zm176 40c-13.3 0-24 10.7-24 24l0 48-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l48 0 0 48c0 13.3 10.7 24 24 24s24-10.7 24-24l0-48 48 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-48c0-13.3-10.7-24-24-24z" />
              </svg>
            </button>
          </Link>
          <Link to={`/friend/edit/${id}`}>
            <button type="button" className="px-5 py-2 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              <svg aria-label='edit icon' xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 512 512">
                <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
              </svg>
            </button>
          </Link>
          <Link to={`/friend/delete/${id}`}>
            <button type="button" className="px-5 py-2 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              <svg aria-label='delete icon' xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 448 512">
                <path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
              </svg>
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default FriendCard;
