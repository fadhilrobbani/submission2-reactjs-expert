import React from 'react';
import PropTypes from 'prop-types';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai';
import parse from 'html-react-parser';
import swal from 'sweetalert';
import postedAt from '../utils';
import CommentInput from './CommentInput';
import CommentsList from './CommentsList';

function DetailThread({
  threadId,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  comments,
  authUserId,
  onUpVotes,
  onDownVotes,
  onNeutralVotes,
  onAddComment,
  onUpVotesComment,
  onDownVotesComment,
  onNeutralVotesComment,
}) {
  const isThreadUpVotes = upVotesBy.includes(authUserId);
  const isThreadDownVotes = downVotesBy.includes(authUserId);

  const onUpVotesClick = () => {
    if (!authUserId) {
      swal('You must login to like/dislike this post');
      return;
    }
    onUpVotes(threadId);
  };

  const onDownVotesClick = () => {
    if (!authUserId) {
      swal('You must login to like/dislike this post');
      return;
    }
    onDownVotes(threadId);
  };

  const onNeutralVotesClick = ({ voteTypeBefore }) => {
    if (!authUserId) {
      swal('You must login to like/dislike this post');
      return;
    }
    onNeutralVotes({ threadId, voteTypeBefore });
  };

  return (
    <div className="bg-slate-600 w-full md:w-3/4 p-5 h-full rounded-lg relative">
      <div className="ring-1 absolute top-3 right-3 rounded-lg px-2 ring-slate-100 w-fit">
        <p>#{category}</p>
      </div>
      <div className="flex flex-row items-center gap-2 ">
        <img
          src={owner.avatar}
          alt="avatar"
          className="mask mask-squircle w-12 h-12"
        />
        <h1 className="text-lg font-bold ">{owner.name}</h1>
      </div>
      <div className="text-2xl font-bold mt-4 mb-1">{title}</div>
      <div className="mb-5">{parse(body)}</div>
      <div className="flex flex-col sm:flex-row sm:gap-4  items-center p-2 w-full sm:w-fit rounded-lg bg-slate-500">
        <div className="flex flex-row gap-4">
          {isThreadUpVotes ? (
            <div className="flex flex-row">
              <AiFillLike
                className="hover:cursor-pointer hover:text-teal-400"
                size={25}
                onClick={() =>
                  onNeutralVotesClick({ threadId, voteTypeBefore: 1 })
                }
              />
              <p> &nbsp;{upVotesBy.length}</p>
            </div>
          ) : (
            <div className="flex flex-row">
              <AiOutlineLike
                className="hover:cursor-pointer hover:text-teal-400"
                size={25}
                onClick={() => onUpVotesClick(threadId)}
              />
              <p> &nbsp;{upVotesBy.length}</p>
            </div>
          )}

          {isThreadDownVotes ? (
            <div className="flex flex-row">
              <AiFillDislike
                className="hover:cursor-pointer hover:text-pink-500"
                size={25}
                onClick={() =>
                  onNeutralVotesClick({ threadId, voteTypeBefore: -1 })
                }
              />
              <p> &nbsp;{downVotesBy.length}</p>
            </div>
          ) : (
            <div className="flex flex-row">
              <AiOutlineDislike
                className="hover:cursor-pointer hover:text-pink-500"
                size={25}
                onClick={() => onDownVotesClick(threadId)}
              />
              <p> &nbsp;{downVotesBy.length}</p>
            </div>
          )}
        </div>
        <div className="font-semibold">{postedAt(createdAt)}</div>
      </div>

      <CommentInput authUserId={authUserId} onAddComment={onAddComment} />
      <CommentsList
        comments={comments}
        onUpVotesComment={onUpVotesComment}
        onDownVotesComment={onDownVotesComment}
        onNeutralVotesComment={onNeutralVotesComment}
      />
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string.isRequired,
};

DetailThread.propTypes = {
  threadId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.shape(ownerShape).isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  authUserId: PropTypes.string.isRequired,
  onUpVotes: PropTypes.func.isRequired,
  onDownVotes: PropTypes.func.isRequired,
  onNeutralVotes: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired,
  onUpVotesComment: PropTypes.func.isRequired,
  onDownVotesComment: PropTypes.func.isRequired,
  onNeutralVotesComment: PropTypes.func.isRequired,
};

export default DetailThread;
