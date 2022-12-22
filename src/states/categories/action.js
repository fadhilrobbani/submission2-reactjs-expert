const ActionType = {
  RECEIVE_CATEGORIES: 'RECEIVE_CATEGORIES',
  SET_CATEGORIES: 'SET_CATEGORY',
};

function setCategoriesActionCreator(category) {
  return {
    type: ActionType.SET_CATEGORIES,
    payload: {
      category,
    },
  };
}

export { ActionType, setCategoriesActionCreator };
