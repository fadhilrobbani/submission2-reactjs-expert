import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ThreadItem from '../components/ThreadItem';
import store from '../states/index';

const stories = {
  title: 'ThreadItem',
  component: ThreadItem,
};

export default stories;

const TemplateStory = (args) => (
  <Provider store={store}>
    <Router>
      <ThreadItem {...args} />
    </Router>
  </Provider>
);

const testItem = TemplateStory.bind({});

testItem.args = {
  threadId: 'thread-1',
  title: 'contoh saja ya',
  body: 'lorem ipsum sit dolor amet amet kan',
  category: 'random',
  createdAt: new Date().toISOString(),
  upVotesBy: ['users-1'],
  downVotesBy: [],
  totalComments: 0,
  owner: {
    id: 'users-2',
    name: 'Siapa',
    email: 'siapa@email.com',
    avatar: '',
  },
  authUserId: 'users-1',
};

export { testItem };
