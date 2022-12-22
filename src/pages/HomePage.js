import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import ThreadsList from '../components/ThreadsList';
import {
  asyncDownVotesThread,
  asyncNeutralVotesThread,
  asyncUpVotesThread,
} from '../states/threads/action';
import AddThreadButton from '../components/AddThreadButton';
import CategoriesList from '../components/CategoriesList';
import { setCategoriesActionCreator } from '../states/categories/action';

function HomePage() {
  const {
    threads = [],
    users = [],
    categories,
    authUser,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  const onUpVotesHandler = (threadId) => {
    dispatch(asyncUpVotesThread(threadId));
  };
  const onDownVotesHandler = (threadId) => {
    dispatch(asyncDownVotesThread(threadId));
  };
  const onNeutralVotesHandler = ({ threadId, voteTypeBefore }) => {
    dispatch(asyncNeutralVotesThread({ threadId, voteTypeBefore }));
  };

  const onSetCategoryHandler = (category) => {
    if (categories === category) {
      dispatch(setCategoriesActionCreator(''));
    } else {
      dispatch(setCategoriesActionCreator(category));
    }
  };

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadsList = threads
    .map((thread) => ({
      ...thread,
      owner: users.find((user) => user.id === thread.ownerId),
      authUserId: authUser ? authUser.id : '',
    }))
    .filter((thread) => (categories ? thread.category === categories : true));
  return (
    <div className=" text-slate-200  justify-center items-center p-10 pb-20 flex flex-col gap-7">
      <CategoriesList
        onSetCategory={onSetCategoryHandler}
        threads={threads}
        categories={categories}
      />
      <ThreadsList
        threads={threadsList}
        onUpVotes={onUpVotesHandler}
        onDownVotes={onDownVotesHandler}
        onNeutralVotes={onNeutralVotesHandler}
      />
      <AddThreadButton />
    </div>
  );
}

export default HomePage;
