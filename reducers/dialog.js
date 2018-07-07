import {OPEN_DIALOG, CLOSE_DIALOG} from '../actions';

// 初始化 state
const dialog = (state = {open: false}, action) => {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        open: true
      };
    case CLOSE_DIALOG:
      return {
        open: false
      };
    default:
      return state;
  }
};

export default dialog;
