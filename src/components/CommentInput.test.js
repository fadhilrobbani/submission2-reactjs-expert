import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CommentInput from './CommentInput';

/**
 * test scenario
 *
 * - CommentInput Component
 *  - should show text "Please login to comment" when user not login
 *  - should show textarea input and create button when user is already logged in
 *  - textarea should typing correctly
 *  - should call onAddComment function when create button clicked when user is already logged in
 *  -
 */

describe('CommentInput Component', () => {
  it('should show text "Please login to comment" when user not login ', () => {
    render(
      <Router>
        <CommentInput authUserId="" onAddComment={() => {}} />
      </Router>
    );

    const message = screen.getByText('Please login to comment');
    expect(message).toBeVisible();
    expect(message.textContent).toBe('Please login to comment');
  });

  it('should show textarea input and create button when user is already logged in ', () => {
    render(
      <Router>
        <CommentInput authUserId="users-1" onAddComment={() => {}} />
      </Router>
    );

    const commentInputArea = screen.getByPlaceholderText('Write Something ...');
    expect(commentInputArea).toBeVisible();
    const createButton = screen.getByRole('button', { name: 'Create' });
    expect(createButton).toBeVisible();
    expect(createButton).toBeEnabled();
  });

  it('textarea comment should typing correctly', () => {
    render(
      <Router>
        <CommentInput authUserId="users-1" onAddComment={() => {}} />
      </Router>
    );

    const commentInputArea = screen.getByPlaceholderText('Write Something ...');
    userEvent.type(
      commentInputArea,
      'hello, this is example for how to make fried egg'
    );
    expect(commentInputArea).toHaveValue(
      'hello, this is example for how to make fried egg'
    );
  });

  it('should call onAddComment function when create button clicked when user is already logged in  ', () => {
    const mockAddComment = jest.fn();
    render(
      <Router>
        <CommentInput authUserId="users-1" onAddComment={mockAddComment} />
      </Router>
    );

    const commentInputArea = screen.getByPlaceholderText('Write Something ...');
    const createButton = screen.getByRole('button', { name: 'Create' });
    userEvent.type(commentInputArea, 'hello world');
    userEvent.click(createButton);

    expect(mockAddComment).toBeCalledWith('hello world');
  });
});
