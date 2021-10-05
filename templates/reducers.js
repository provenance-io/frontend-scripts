import { handleActions } from 'redux-actions';
import {
  SAMPLE_STORE_ACTION,
} from '../actions/templateActions';

export const initialState = {
  sampleValue: '',
};

const reducer = handleActions(
  {
    /* -----------------
    SAMPLE_STORE_ACTION
    -------------------*/
    [SAMPLE_STORE_ACTION](state, { payload }) {
      return {
        ...state,
        sampleValue: payload,
      };
    },
  },
  initialState
);

export default reducer;
