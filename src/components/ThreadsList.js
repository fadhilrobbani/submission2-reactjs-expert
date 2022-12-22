import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadsList({ threads, onUpVotes, onDownVotes, onNeutralVotes }) {
  return (
    <div className="flex flex-col gap-5 pt-0 w-full justify-center items-center p-5">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          threadId={thread.id}
          title={thread.title}
          body={thread.body}
          category={thread.category}
          createdAt={thread.createdAt}
          upVotesBy={thread.upVotesBy}
          downVotesBy={thread.downVotesBy}
          totalComments={thread.totalComments}
          owner={thread.owner}
          authUserId={thread.authUserId}
          onUpVotes={onUpVotes}
          onDownVotes={onDownVotes}
          onNeutralVotes={onNeutralVotes}
        />
      ))}
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      ownerId: PropTypes.string.isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      totalComments: PropTypes.number.isRequired,
    })
  ).isRequired,
  onUpVotes: PropTypes.func.isRequired,
  onDownVotes: PropTypes.func.isRequired,
  onNeutralVotes: PropTypes.func.isRequired,
};
export default ThreadsList;
