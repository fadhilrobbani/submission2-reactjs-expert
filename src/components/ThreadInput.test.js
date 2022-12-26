import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ThreadInput from './ThreadInput';

describe('ThreadInput Component', () => {
  it('should handle title typing correctly', () => {
    render(
      <Router>
        <ThreadInput onAddThread={() => {}} />
      </Router>
    );
    const titleInput = screen.getByPlaceholderText('Title');
    userEvent.type(titleInput, 'Halo, saya adalah manusia');
    expect(titleInput).toHaveValue('Halo, saya adalah manusia');
  });
  it('should handle category typing correctly', () => {
    render(
      <Router>
        <ThreadInput onAddThread={() => {}} />
      </Router>
    );
    const categoryInput = screen.getByPlaceholderText('Category');
    userEvent.type(categoryInput, 'random');
    expect(categoryInput).toHaveValue('random');
  });

  it('should call onAddThread when Create button clicked', () => {
    const mockAddThread = jest.fn();
    render(
      <Router>
        <ThreadInput onAddThread={mockAddThread} />
      </Router>
    );
    const titleInput = screen.getByPlaceholderText('Title');
    userEvent.type(titleInput, 'Halo, saya adalah manusia');

    const textInput = screen.getByTestId('textArea');
    userEvent.type(textInput, 'hidup cuma sekali');

    const categoryInput = screen.getByPlaceholderText('Category');
    userEvent.type(categoryInput, 'random');
    const createButton = screen.getByRole('button', { name: 'Create' });
    userEvent.click(createButton);

    expect(mockAddThread).toBeCalledWith({
      title: 'Halo, saya adalah manusia',
      body: 'hidup cuma sekali',
      category: 'random',
    });
  });
});
