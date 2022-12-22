import React from 'react';
import { useNavigate } from 'react-router-dom';
import notFound from '../assets/notFound.webp';

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div
      className="bg-slate-700 text-slate-200
         py-8 h-screen mt-[-74px] flex flex-col justify-center items-center gap-7"
    >
      <img className="w-3/4 max-w-xl" src={notFound} alt="notfound" />
      <h1 className="font-bold text-lg sm:text-2xl">
        Sory, Your destination page is not found
      </h1>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="bg-yellow-600 cursor-pointer text-slate-100 hover:bg-yellow-800  px-4 py-2 rounded-lg "
      >
        Back To Home
      </button>
    </div>
  );
}

export default NotFoundPage;
