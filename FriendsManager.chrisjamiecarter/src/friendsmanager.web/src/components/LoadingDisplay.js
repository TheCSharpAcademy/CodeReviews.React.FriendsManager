import React from 'react';
import { useSelector } from 'react-redux';

const LoadingDisplay = () => {
  const loading = useSelector((state) => state.friends.status);

  console.log("loading", loading);

  if (!loading || loading !== 'loading') return null;

  return (
    <div className="w-full text-white bg-amber-500">
      <div className="container flex items-center justify-center px-6 py-4 mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 fill-current">
          <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
        </svg>

        <p className="mx-3">Loading Friends... Please wait...</p>
      </div>
    </div>
  );
};

export default LoadingDisplay;
