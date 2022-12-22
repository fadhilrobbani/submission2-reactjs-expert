import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.FILTER_THREADS:
      return threads.filter(
        (thread) => thread.category === action.payload.category
      );
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.UP_VOTES_THREADS:
      return threads.map((thread) => {
        if (thread.id !== action.payload.threadId) return thread;
        return {
          ...thread,
          upVotesBy: [...thread.upVotesBy, action.payload.authUserId],
          downVotesBy: thread.downVotesBy.filter(
            (id) => id !== action.payload.authUserId
          ),
        };
      });
    case ActionType.DOWN_VOTES_THREADS:
      return threads.map((thread) => {
        if (thread.id !== action.payload.threadId) return thread;
        return {
          ...thread,
          downVotesBy: [...thread.downVotesBy, action.payload.authUserId],
          upVotesBy: thread.upVotesBy.filter(
            (id) => id !== action.payload.authUserId
          ),
        };
      });
    case ActionType.NEUTRAL_VOTES_THREADS:
      return threads.map((thread) => {
        if (thread.id !== action.payload.threadId) return thread;
        return {
          ...thread,
          upVotesBy: thread.upVotesBy.filter(
            (id) => id !== action.payload.authUserId
          ),
          downVotesBy: thread.downVotesBy.filter(
            (id) => id !== action.payload.authUserId
          ),
        };
      });
    default:
      return threads;
  }
}

export default threadsReducer;
