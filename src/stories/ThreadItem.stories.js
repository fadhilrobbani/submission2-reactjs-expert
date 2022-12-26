import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ThreadItem from '../components/ThreadItem';
// import { configureStore } from '@reduxjs/toolkit';

const stories = {
  title: 'ThreadItem',
  component: ThreadItem,
};

// const mockStore = configureStore({
//   reducer: {
//     authUser
//   }
// })

export default stories;

const TemplateStory = (args) => (
  <Provider>
    <Router>
      <ThreadItem {...args} />
    </Router>
  </Provider>
);

const testItem = TemplateStory.bind({});

testItem.args = {};

export { testItem };
