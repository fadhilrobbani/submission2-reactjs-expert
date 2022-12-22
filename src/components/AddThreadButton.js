import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AddThreadButton() {
  const { authUser } = useSelector((states) => states);
  const navigate = useNavigate();
  if (!authUser) return null;
  return (
    <div className="bg-teal-500 cursor-pointer shadow-md z-[100] fixed rounded-full p-2 bottom-[85px] right-[30px] hover:bg-teal-700 opacity-90">
      <AiOutlinePlus
        onClick={() => navigate('/new')}
        className="text-slate-200"
        size={40}
      />
    </div>
  );
}

export default AddThreadButton;
