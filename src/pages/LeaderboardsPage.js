import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncGetLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const { leaderboards = [] } = useSelector((states) => states);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);
  return (
    <div className="text-white py-10 w-3/4 mx-auto flex flex-col gap-4 pb-28">
      <p className="font-semibold text-lg">Klasemen Pengguna Aktif</p>
      <div className="overflow-x-auto w-full ring-2 ring-slate-500 rounded-lg ">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {leaderboards.map((leaderboard) => (
              <tr key={leaderboard.user.id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={leaderboard.user.avatar}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{leaderboard.user.name}</div>
                      <div className="text-sm opacity-50">
                        {leaderboard.user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{leaderboard.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderboardsPage;
