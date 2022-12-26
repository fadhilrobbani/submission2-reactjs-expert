import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function ThreadInput({ onAddThread }) {
  const [title, setTitle] = useInput('');
  const [body, setBody] = useInput('');
  const [category, setCategory] = useInput('');

  return (
    <div className="bg-slate-600 text-slate-200 w-3/4 h-fit max-w-lg py-10 gap-4 rounded-lg flex flex-col items-center shadow-md">
      <h1 className="text-center font-bold text-xl">Create New Discussion</h1>
      <div className="w-4/5 flex flex-col gap-6 justify-center">
        <div className="flex flex-col gap-2 justify-center">
          <input
            className="bg-slate-500 text-slate-200 
               border border-slate-400 py-2 px-4 rounded-md w-full"
            type="text"
            value={title}
            placeholder="Title"
            onChange={setTitle}
          />
        </div>
        <div className="flex flex-col justify-center">
          <input
            className="bg-slate-500 text-slate-200 
               border border-slate-400 py-2 px-4 rounded-md w-full"
            type="text"
            value={category}
            placeholder="Category"
            onChange={setCategory}
          />
        </div>
        <div className="flex flex-col justify-center ">
          <textarea
            className="bg-slate-500 text-slate-200 
               border border-slate-400 py-2 px-4 rounded-md w-full"
            type="text"
            value={body}
            data-testid="textArea"
            placeholder="Write Something ..."
            onChange={setBody}
          />
        </div>
        <button
          type="button"
          className=" text-slate-100 bg-teal-700 px-3 py-2 rounded-md hover:bg-teal-800 "
          onClick={() => onAddThread({ title, body, category })}
        >
          Create
        </button>
      </div>
    </div>
  );
}

ThreadInput.propTypes = {
  onAddThread: PropTypes.func.isRequired,
};

export default ThreadInput;
