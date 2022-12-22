import { ActionType } from './action';

function detailThreadReducer(detailThread = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return action.payload.detailThread;
    case ActionType.CLEAR_DETAIL_THREAD:
      return null;
    case ActionType.ADD_COMMENT_DETAIL_THREAD:
      return {
        ...detailThread,
        comments: [action.payload.comment, ...detailThread.comments],
      };
    case ActionType.UP_VOTES_DETAIL_THREADS:
      if (detailThread.id !== action.payload.threadId) return detailThread;
      return {
        ...detailThread,
        upVotesBy: [...detailThread.upVotesBy, action.payload.authUserId],
        downVotesBy: detailThread.downVotesBy.filter(
          (id) => id !== action.payload.authUserId
        ),
      };

    case ActionType.DOWN_VOTES_DETAIL_THREADS:
      if (detailThread.id !== action.payload.threadId) return detailThread;
      return {
        ...detailThread,
        downVotesBy: [...detailThread.downVotesBy, action.payload.authUserId],
        upVotesBy: detailThread.upVotesBy.filter(
          (id) => id !== action.payload.authUserId
        ),
      };

    case ActionType.NEUTRAL_VOTES_DETAIL_THREADS:
      if (detailThread.id !== action.payload.threadId) return detailThread;
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.filter(
          (id) => id !== action.payload.authUserId
        ),
        downVotesBy: detailThread.downVotesBy.filter(
          (id) => id !== action.payload.authUserId
        ),
      };

    case ActionType.UP_VOTES_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id !== action.payload.commentId) return comment;
          return {
            ...comment,
            upVotesBy: [...comment.upVotesBy, action.payload.authUserId],
            downVotesBy: comment.downVotesBy.filter(
              (id) => id !== action.payload.authUserId
            ),
          };
        }),
      };
    case ActionType.DOWN_VOTES_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id !== action.payload.commentId) return comment;
          return {
            ...comment,
            downVotesBy: [...comment.downVotesBy, action.payload.authUserId],
            upVotesBy: comment.upVotesBy.filter(
              (id) => id !== action.payload.authUserId
            ),
          };
        }),
      };

    case ActionType.NEUTRAL_VOTES_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id !== action.payload.commentId) return comment;
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter(
              (id) => id !== action.payload.authUserId
            ),
            downVotesBy: comment.downVotesBy.filter(
              (id) => id !== action.payload.authUserId
            ),
          };
        }),
      };
    default:
      return detailThread;
  }
}

export default detailThreadReducer;
