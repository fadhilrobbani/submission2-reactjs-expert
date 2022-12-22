import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';

function Navbar() {
  return (
    <div className="fixed w-full top-0 z-50">
      <div className="p-4 bg-slate-700">
        <p className="text-xl text-slate-100 font-semibold px-4">
          <Link to="/">FORUM APP</Link>
        </p>
      </div>
      <Loading />
    </div>
  );
}

export default Navbar;
