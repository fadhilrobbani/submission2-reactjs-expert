import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import ThreadInput from '../components/ThreadInput';
import { asyncAddThread } from '../states/threads/action';

function NewThreadPage() {
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThreadHandler = ({ title, body, category }) => {
    if (title === '' || body === '') {
      swal('Title and Thread body is required');
      return;
    }
    dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  };

  useEffect(() => {
    if (!authUser) {
      navigate('/');
    }
  });

  if (!authUser) return null;
  return (
    <div className="h-screen mt-[-74px] flex justify-center items-center">
      <ThreadInput onAddThread={onAddThreadHandler} />
    </div>
  );
}

export default NewThreadPage;
