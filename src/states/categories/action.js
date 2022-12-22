const ActionType = {
  RECEIVE_CATEGORIES: 'categories/receive',
  SET_CATEGORIES: 'categories/set',
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
