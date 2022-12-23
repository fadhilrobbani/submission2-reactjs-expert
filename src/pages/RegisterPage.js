import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onRegisterHandler = ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      alert("Password and confirm password doesn't match");
      return;
    }
    dispatch(asyncRegisterUser({ name, email, password }));
    alert('Success to register the user');
    navigate('/login');
  };

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, []);
  if (authUser) return null;
  return (
    <div className=" text-slate-200 h-screen mt-[-74px] flex justify-center items-center">
      <RegisterInput onRegister={onRegisterHandler} />
    </div>
  );
}

export default RegisterPage;
