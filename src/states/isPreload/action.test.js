/* eslint-disable no-underscore-dangle */
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';
import { setAuthUserActionCreator } from '../authUser/action';

/**
 * test scenario
 *
 * - asyncPreloadSuccess Thunk
 *  - should dispatch action correctly when loading authUser success
 *  - should dispatch action  correctly when loading authUser failed
 */

const fakeUser = {
  id: 'test',
  name: 'test',
  email: 'test@example.com',
  avatar: 'https://generated-image-url.jpg',
};

describe('asyncPreloadProcess Thunk', () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;
    delete api._getOwnProfile;
  });

  it('should dispatch action correctly when loading authUser success', async () => {
    api.getOwnProfile = () => Promise.resolve(fakeUser);
    const dispatch = jest.fn();
    await asyncPreloadProcess()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action  correctly when loading authUser failed', async () => {
    api.getOwnProfile = () => Promise.reject(new Error('failed getOwnProfile'));
    const dispatch = jest.fn();
    await asyncPreloadProcess()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
