import threadsReducer from './reducer';
import { ActionType } from './action';

/**
 * test scenario for threadsReducer
 *
 * - threadsReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by threads/receive action
 *  - should return the threads with the new threads when given by threads/add action
 *  - should return the threads with new upVotesBy if upVotesBy and downVotesBy are empty when given by threads/upVotes action
 *  - should return the threads with new upVotesBy and empty downVotesBy if upVotesBy is empty and user already downVotes when given by threads/upVotes action
 *  - should return the threads with new downVotesBy if upVotesBy and downVotesBy are empty when given by threads/downVotes action
 *  - should return the threads with new downVotesBy and empty downVotesBy if upVotesBy already upVotes and downVotesBy os empty when given by threads/downVotes action
 *  - should return the threads with empty upVotesBy and downVotesBy when given by threads/neutralVotes action
 *
 */

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toBe(initialState);
  });

  it('should return the threads when given by threads/receive action', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toStrictEqual(action.payload.threads);
  });

  it('should return the threads with the new threads when given by threads/add action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: {
          id: 'thread-new',
          title: 'Thread Baru',
          body: 'Ini adalah thread yg baru',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-neww',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toStrictEqual([action.payload.thread, ...initialState]);
  });

  it('should return the threads with new upVotesBy if upVotesBy and downVotesBy are empty when given by threads/upVotes action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.UP_VOTES_THREADS,
      payload: {
        threadId: 'thread-1',
        authUserId: 'users-1',
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toStrictEqual([
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [action.payload.authUserId],
        downVotesBy: [],
        totalComments: 0,
      },
    ]);
  });

  it('should return the threads with new upVotesBy and empty downVotesBy if upVotesBy is empty and user already downVotes when given by threads/upVotes action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: ['users-1'],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.UP_VOTES_THREADS,
      payload: {
        threadId: 'thread-1',
        authUserId: 'users-1',
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toStrictEqual([
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [action.payload.authUserId],
        downVotesBy: [],
        totalComments: 0,
      },
    ]);
  });

  it('should return the threads with new downVotesBy if upVotesBy and downVotesBy are empty when given by threads/downVotes action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.DOWN_VOTES_THREADS,
      payload: {
        threadId: 'thread-1',
        authUserId: 'users-1',
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toStrictEqual([
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [action.payload.authUserId],
        totalComments: 0,
      },
    ]);
  });

  it('should return the threads with new downVotesBy and empty downVotesBy if upVotesBy already upVotes and downVotesBy os empty when given by threads/downVotes action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-1'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.DOWN_VOTES_THREADS,
      payload: {
        threadId: 'thread-1',
        authUserId: 'users-1',
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toStrictEqual([
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [action.payload.authUserId],
        totalComments: 0,
      },
    ]);
  });

  it('should return the threads with empty upVotesBy and downVotesBy when given by threads/neutralVotes action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-1'],
        downVotesBy: ['users-1'],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.NEUTRAL_VOTES_THREADS,
      payload: {
        threadId: 'thread-1',
        authUserId: 'users-1',
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toStrictEqual([
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ]);
  });
});
