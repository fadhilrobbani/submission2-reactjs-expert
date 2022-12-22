import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/action';
import LoginInput from '../components/LoginInput';

function LoginPage() {
  const { authUser = null } = useSelector((states) => states);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLoginHandler = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, []);
  if (authUser) return null;
  return (
    <div className=" text-slate-200 h-screen mt-[-74px] flex justify-center items-center">
      <LoginInput onLogin={onLoginHandler} />
    </div>
  );
}

export default LoginPage;
