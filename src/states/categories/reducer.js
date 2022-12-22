import { ActionType } from './action';

function categoriesReducer(categories = '', action = {}) {
  switch (action.type) {
    case ActionType.SET_CATEGORIES:
      return action.payload.category;
    default:
      return categories;
  }
}

export default categoriesReducer;
