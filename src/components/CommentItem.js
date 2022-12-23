import React from 'react';
import PropTypes from 'prop-types';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import postedAt from '../utils';

function CommentItem({
  comment,
  onUpVotesComment,
  onDownVotesComment,
  onNeutralVotesComment,
}) {
  const { authUser = null } = useSelector((states) => states);

  const isCommentUpVotes = comment.upVotesBy.includes(authUser?.id);
  const isCommentDownVotes = comment.downVotesBy.includes(authUser?.id);

  const onUpVotesCommentClick = () => {
    if (!authUser?.id) {
      alert('You must login to like/dislike this comment');
      return;
    }
    onUpVotesComment(comment.id);
  };

  const onDownVotesCommentClick = () => {
    if (!authUser?.id) {
      alert('You must login to like/dislike this comment');
      return;
    }
    onDownVotesComment(comment.id);
  };

  const onNeutralVotesCommentClick = ({ voteTypeBefore }) => {
    if (!authUser?.id) {
      alert('You must login to like/dislike this comment');
      return;
    }
    onNeutralVotesComment({ commentId: comment.id, voteTypeBefore });
  };

  return (
    <div
      className="flex flex-col gap-4 bg-slate-500 rounded-lg p-4 relative"
      key={comment.id}
    >
      <div className="flex flex-row  items-center gap-3">
        <div className="mask mask-squircle w-12 h-12">
          <img src={comment.owner.avatar} alt="avatar" />
        </div>
        <div className="font-bold text-lg">{comment.owner.name}</div>
      </div>
      <div>
        <div className="px-2">{parse(comment.content)}</div>
        <div className="flex flex-col sm:flex-row sm:gap-4  items-center p-2 w-full sm:w-fit rounded-lg  mt-2">
          <div className="flex flex-row gap-4">
            {isCommentUpVotes ? (
              <div className="flex flex-row">
                <AiFillLike
                  className="hover:cursor-pointer hover:text-teal-400"
                  size={25}
                  onClick={() =>
                    onNeutralVotesCommentClick({
                      commentId: comment.id,
                      voteTypeBefore: 1,
                    })
                  }
                />
                <p> &nbsp;{comment.upVotesBy.length}</p>
              </div>
            ) : (
              <div className="flex flex-row">
                <AiOutlineLike
                  className="hover:cursor-pointer hover:text-teal-400"
                  size={25}
                  onClick={() => onUpVotesCommentClick()}
                />
                <p> &nbsp;{comment.upVotesBy.length}</p>
              </div>
            )}

            {isCommentDownVotes ? (
              <div className="flex flex-row">
                <AiFillDislike
                  className="hover:cursor-pointer hover:text-pink-500"
                  size={25}
                  onClick={() =>
                    onNeutralVotesCommentClick({
                      voteTypeBefore: -1,
                    })
                  }
                />
                <p> &nbsp;{comment.downVotesBy.length}</p>
              </div>
            ) : (
              <div className="flex flex-row">
                <AiOutlineDislike
                  className="hover:cursor-pointer hover:text-pink-500"
                  size={25}
                  onClick={() => onDownVotesCommentClick()}
                />
                <p> &nbsp;{comment.downVotesBy.length}</p>
              </div>
            )}
            <div className="font-semibold">{postedAt(comment.createdAt)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
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
  }).isRequired,
  onUpVotesComment: PropTypes.func.isRequired,
  onDownVotesComment: PropTypes.func.isRequired,
  onNeutralVotesComment: PropTypes.func.isRequired,
};

export default CommentItem;
