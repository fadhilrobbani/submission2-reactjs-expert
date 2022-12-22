import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

function CommentsList({
  comments,
  onUpVotesComment,
  onDownVotesComment,
  onNeutralVotesComment,
}) {
  return (
    <div className="mt-4">
      <p className="font-semibold text-lg">{`Comments (${comments.length}): `}</p>
      <div className="flex flex-col gap-5 mt-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onUpVotesComment={onUpVotesComment}
            onDownVotesComment={onDownVotesComment}
            onNeutralVotesComment={onNeutralVotesComment}
          />
        ))}
      </div>
    </div>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string,
        avatar: PropTypes.string.isRequired,
      }).isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  onUpVotesComment: PropTypes.func.isRequired,
  onDownVotesComment: PropTypes.func.isRequired,
  onNeutralVotesComment: PropTypes.func.isRequired,
};

export default CommentsList;
