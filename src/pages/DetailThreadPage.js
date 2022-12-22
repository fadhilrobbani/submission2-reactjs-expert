import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DetailThread from '../components/DetailThread';
import {
  asyncAddCommentDetailThread,
  asyncReceiveDetailThread,
  asyncUpVotesDetailThread,
  asyncDownVotesDetailThread,
  asyncNeutralVotesDetailThread,
  asyncUpVotesComment,
  asyncDownVotesComment,
  asyncNeutralVotesComment,
} from '../states/detailThread/action';

function DetailThreadPage() {
  const { detailThread = null, authUser = null } = useSelector(
    (states) => states
  );
  const { id } = useParams();
  const dispatch = useDispatch();

  const onUpVotesHandler = (threadId) => {
    dispatch(asyncUpVotesDetailThread(threadId));
  };
  const onDownVotesHandler = (threadId) => {
    dispatch(asyncDownVotesDetailThread(threadId));
  };
  const onNeutralVotesHandler = ({ threadId, voteTypeBefore }) => {
    dispatch(asyncNeutralVotesDetailThread({ threadId, voteTypeBefore }));
  };

  const onAddCommentHandler = (comment) => {
    dispatch(asyncAddCommentDetailThread({ id, content: comment }));
  };

  const onUpVotesCommentHandler = (commentId) => {
    dispatch(asyncUpVotesComment({ threadId: detailThread?.id, commentId }));
  };
  const onDownVotesCommentHandler = (commentId) => {
    dispatch(asyncDownVotesComment({ threadId: detailThread?.id, commentId }));
  };
  const onNeutralVotesCommentHandler = ({ commentId, voteTypeBefore }) => {
    dispatch(
      asyncNeutralVotesComment({
        threadId: detailThread?.id,
        commentId,
        voteTypeBefore,
      })
    );
  };

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(id));
  }, [dispatch]);

  if (!detailThread) return null;
  return (
    <div className=" text-slate-200  justify-center items-center p-10 pb-20 flex flex-col gap-7">
      <DetailThread
        authUserId={authUser?.id || ''}
        threadId={detailThread.id}
        title={detailThread.title}
        body={detailThread.body}
        category={detailThread.category}
        createdAt={detailThread.createdAt}
        owner={detailThread.owner}
        upVotesBy={detailThread.upVotesBy}
        downVotesBy={detailThread.downVotesBy}
        comments={detailThread.comments}
        onUpVotes={onUpVotesHandler}
        onDownVotes={onDownVotesHandler}
        onNeutralVotes={onNeutralVotesHandler}
        onAddComment={onAddCommentHandler}
        onUpVotesComment={onUpVotesCommentHandler}
        onDownVotesComment={onDownVotesCommentHandler}
        onNeutralVotesComment={onNeutralVotesCommentHandler}
      />
    </div>
  );
}

export default DetailThreadPage;
