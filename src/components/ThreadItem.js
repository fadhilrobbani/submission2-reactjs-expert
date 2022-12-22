import React from 'react';
import PropTypes from 'prop-types';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { BiCommentDetail } from 'react-icons/bi';
import parse from 'html-react-parser';
import swal from 'sweetalert';
import postedAt from '../utils';

function ThreadItem({
  threadId,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  owner,
  authUserId,
  onUpVotes,
  onDownVotes,
  onNeutralVotes,
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
    <div className="bg-slate-600 w-full md:w-3/4 p-5 h-full rounded-lg ">
      <div className="ring-1 rounded-lg px-2 ring-slate-100 w-fit">
        <p>#{category}</p>
      </div>
      <Link to={`/threads/${threadId}`}>
        <h1 className="text-xl underline font-bold mb-5 mt-2 hover:text-teal-400">
          {title}
        </h1>
      </Link>
      <div className="line-clamp-5 mb-5">{parse(body)}</div>
      <div className="flex flex-col sm:flex-row sm:gap-4  items-center p-2 w-full rounded-lg bg-slate-500">
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
          <div className="flex flex-row">
            <HashLink
              scroll={(el) => el.scrollIntoView({ behavior: 'smooth' })}
              to={`/threads/${threadId}#comment`}
            >
              <BiCommentDetail
                size={25}
                className="hover:cursor-pointer hover:text-yellow-500"
              />
            </HashLink>
            <p> &nbsp;{totalComments}</p>
          </div>
        </div>
        <div className="font-semibold">Created By {owner.name || 'null'}</div>
        <div className="font-semibold">{postedAt(createdAt)}</div>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  threadId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  authUserId: PropTypes.string.isRequired,
  onUpVotes: PropTypes.func.isRequired,
  onDownVotes: PropTypes.func.isRequired,
  onNeutralVotes: PropTypes.func.isRequired,
};

export default ThreadItem;
