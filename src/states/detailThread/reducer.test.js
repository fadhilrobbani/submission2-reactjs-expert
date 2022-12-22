import { ActionType } from './action';
import detailThreadReducer from './reducer';

describe('detailThreadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    const nextState = detailThreadReducer(initialState, action);
    expect(nextState).toBe(initialState);
  });

  it('should return null when given by detailThread/clear action', () => {
    const initialState = null;
    const action = { type: ActionType.CLEAR_DETAIL_THREAD };
    const nextState = detailThreadReducer(initialState, action);
    expect(nextState).toBe(null);
  });

  it('should return detailThread object with new comments property when given by detailThread/addComment action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.ADD_COMMENT_DETAIL_THREAD,
      payload: {
        comment: {
          id: 'comment-1',
          content: 'Ini adalah komentar keuda',
          createdAt: '2022-06-21T07:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
          },
        },
      },
    };
    const nextState = detailThreadReducer(initialState, action);
    expect(nextState).toStrictEqual({
      ...initialState,
      comments: [action.payload.comment, ...initialState.comments],
    });
  });

  it('should return the detailThread with new upVotesBy if upVotesBy and downVotesBy are empty when given by detailThread/upVotes action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.UP_VOTES_DETAIL_THREADS,
      payload: {
        threadId: 'thread-1',
        authUserId: 'users-1',
      },
    };

    const nextState = detailThreadReducer(initialState, action);
    expect(nextState).toStrictEqual({
      ...initialState,
      upVotesBy: [action.payload.authUserId],
      downVotesBy: [],
    });
  });

  it('should return the detailThread with new upVotesBy and empty downVotesBy if user already downVotesBy when given by detailThread/upVotes action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: ['users-1'],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.UP_VOTES_DETAIL_THREADS,
      payload: {
        threadId: 'thread-1',
        authUserId: 'users-1',
      },
    };

    const nextState = detailThreadReducer(initialState, action);
    expect(nextState).toStrictEqual({
      ...initialState,
      upVotesBy: [action.payload.authUserId],
      downVotesBy: [],
    });
  });

  it('should return the detailThread with new downVotesBy if upVotesBy and downVotesBy are empty when given by detailThread/downVotes action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.DOWN_VOTES_DETAIL_THREADS,
      payload: {
        threadId: 'thread-1',
        authUserId: 'users-1',
      },
    };

    const nextState = detailThreadReducer(initialState, action);
    expect(nextState).toStrictEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [action.payload.authUserId],
    });
  });
});
