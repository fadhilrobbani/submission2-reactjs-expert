import { showLoading, hideLoading } from 'react-redux-loading-bar';
import swal from 'sweetalert';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  ADD_COMMENT_DETAIL_THREAD: 'ADD_COMMENT_DETAIL_THREAD',
  CLEAR_DETAIL_THREAD: 'CLEAR_DETAIL_THREAD',
  UP_VOTES_DETAIL_THREADS: 'UP_VOTES_DETAIL_THREADS',
  DOWN_VOTES_DETAIL_THREADS: 'DOWN_VOTES_DETAIL_THREADS',
  NEUTRAL_VOTES_DETAIL_THREADS: 'NEUTRAL_VOTES_DETAIL_THREADS',
  UP_VOTES_COMMENT: 'UP_VOTES_COMMENT',
  DOWN_VOTES_COMMENT: 'DOWN_VOTES_COMMENT',
  NEUTRAL_VOTES_COMMENT: 'NEUTRAL_VOTES_COMMENT',
};

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function clearDetailThreadActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
}

function addCommentDetailThreadActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT_DETAIL_THREAD,
    payload: {
      comment,
    },
  };
}

function upVotesDetailThreadActionCreator({ threadId, authUserId }) {
  return {
    type: ActionType.UP_VOTES_DETAIL_THREADS,
    payload: {
      threadId,
      authUserId,
    },
  };
}

function downVotesDetailThreadActionCreator({ threadId, authUserId }) {
  return {
    type: ActionType.DOWN_VOTES_DETAIL_THREADS,
    payload: {
      threadId,
      authUserId,
    },
  };
}

function neutralVotesDetailThreadActionCreator({ threadId, authUserId }) {
  return {
    type: ActionType.NEUTRAL_VOTES_DETAIL_THREADS,
    payload: {
      threadId,
      authUserId,
    },
  };
}

function upVotesCommentActionCreator({ threadId, commentId, authUserId }) {
  return {
    type: ActionType.UP_VOTES_COMMENT,
    payload: {
      threadId,
      commentId,
      authUserId,
    },
  };
}

function downVotesCommentActionCreator({ threadId, commentId, authUserId }) {
  return {
    type: ActionType.DOWN_VOTES_COMMENT,
    payload: {
      threadId,
      commentId,
      authUserId,
    },
  };
}

function neutralVotesCommentActionCreator({ threadId, commentId, authUserId }) {
  return {
    type: ActionType.NEUTRAL_VOTES_COMMENT,
    payload: {
      threadId,
      commentId,
      authUserId,
    },
  };
}

function asyncReceiveDetailThread(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearDetailThreadActionCreator());
    try {
      const detailThread = await api.getDetailThread(id);
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {
      swal(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddCommentDetailThread({ id, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ id, content });
      dispatch(addCommentDetailThreadActionCreator(comment));
    } catch (error) {
      swal(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVotesDetailThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    dispatch(showLoading());
    dispatch(
      upVotesDetailThreadActionCreator({ threadId, authUserId: authUser.id })
    );
    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      swal(error.message);
      if (detailThread.downVotesBy.includes(authUser.id)) {
        dispatch(
          downVotesDetailThreadActionCreator({
            threadId,
            authUserId: authUser.id,
          })
        );
      } else {
        dispatch(
          neutralVotesDetailThreadActionCreator({
            threadId,
            authUserId: authUser.id,
          })
        );
      }
    }
    dispatch(hideLoading());
  };
}

function asyncDownVotesDetailThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    dispatch(showLoading());
    dispatch(
      downVotesDetailThreadActionCreator({ threadId, authUserId: authUser.id })
    );
    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      swal(error.message);
      if (detailThread.upVotesBy.includes(authUser.id)) {
        dispatch(
          upVotesDetailThreadActionCreator({
            threadId,
            authUserId: authUser.id,
          })
        );
      } else {
        dispatch(
          neutralVotesDetailThreadActionCreator({
            threadId,
            authUserId: authUser.id,
          })
        );
      }
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralVotesDetailThread({ threadId, voteTypeBefore }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(showLoading());
    dispatch(
      neutralVotesDetailThreadActionCreator({
        threadId,
        authUserId: authUser.id,
      })
    );
    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      swal(error.message);
      if (voteTypeBefore === 1) {
        dispatch(
          upVotesDetailThreadActionCreator({
            threadId,
            authUserId: authUser.id,
          })
        );
      }

      if (voteTypeBefore === -1) {
        dispatch(
          downVotesDetailThreadActionCreator({
            threadId,
            authUserId: authUser.id,
          })
        );
      }
    }
    dispatch(hideLoading());
  };
}

function asyncUpVotesComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    dispatch(showLoading());
    dispatch(
      upVotesCommentActionCreator({
        threadId,
        commentId,
        authUserId: authUser.id,
      })
    );
    try {
      await api.upVoteComment({ threadId, commentId });
    } catch (error) {
      swal(error.message);
      const { downVotesBy } = detailThread.comments.filter(
        (comment) => comment.id === commentId
      )[0];
      if (downVotesBy.includes(authUser.id)) {
        dispatch(
          downVotesCommentActionCreator({
            threadId,
            commentId,
            authUserId: authUser.id,
          })
        );
      } else {
        dispatch(
          neutralVotesCommentActionCreator({
            threadId,
            commentId,
            authUserId: authUser.id,
          })
        );
      }
    }
    dispatch(hideLoading());
  };
}

function asyncDownVotesComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    dispatch(showLoading());
    dispatch(
      downVotesCommentActionCreator({
        threadId,
        commentId,
        authUserId: authUser.id,
      })
    );
    try {
      await api.downVoteComment({ threadId, commentId });
    } catch (error) {
      swal(error.message);
      const { upVotesBy } = detailThread.comments.filter(
        (comment) => comment.id === commentId
      )[0];
      if (upVotesBy.includes(authUser.id)) {
        dispatch(
          upVotesCommentActionCreator({
            threadId,
            commentId,
            authUserId: authUser.id,
          })
        );
      } else {
        dispatch(
          neutralVotesCommentActionCreator({
            threadId,
            commentId,
            authUserId: authUser.id,
          })
        );
      }
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralVotesComment({ threadId, commentId, voteTypeBefore }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(showLoading());
    dispatch(
      neutralVotesCommentActionCreator({
        threadId,
        commentId,
        authUserId: authUser.id,
      })
    );
    try {
      await api.neutralVoteComment({ threadId, commentId });
    } catch (error) {
      swal(error.message);
      if (voteTypeBefore === 1) {
        dispatch(
          upVotesCommentActionCreator({
            threadId,
            commentId,
            authUserId: authUser.id,
          })
        );
      }

      if (voteTypeBefore === -1) {
        dispatch(
          downVotesCommentActionCreator({
            threadId,
            commentId,
            authUserId: authUser.id,
          })
        );
      }
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  asyncReceiveDetailThread,
  receiveDetailThreadActionCreator,
  addCommentDetailThreadActionCreator,
  asyncAddCommentDetailThread,
  clearDetailThreadActionCreator,
  asyncUpVotesDetailThread,
  asyncDownVotesDetailThread,
  asyncNeutralVotesDetailThread,
  upVotesDetailThreadActionCreator,
  downVotesDetailThreadActionCreator,
  neutralVotesDetailThreadActionCreator,
  downVotesCommentActionCreator,
  neutralVotesCommentActionCreator,
  upVotesCommentActionCreator,
  asyncUpVotesComment,
  asyncDownVotesComment,
  asyncNeutralVotesComment,
};
