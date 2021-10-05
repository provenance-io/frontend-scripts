import { handleActions } from 'redux-actions';
import {
  SAMPLE_API_ACTION,
  SAMPLE_STORE_ACTION,
} from '../actions/templateActions';
import { SUCCESS, REQUEST, FAILURE } from '../actions/xhrActions';

export const initialState = {
  sampleValue: '',
  sampleApiLoading: false,
  sampleApiFailed: false,
  sampleApiValue: '',
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
    /* -----------------
    SAMPLE_API_ACTION
    -------------------*/
    [`${SAMPLE_API_ACTION}_${REQUEST}`](state) {
      return {
        ...state,
        sampleApiLoading: true,
        sampleApiFailed: false,
        sampleApiValue: '',
      };
    },
    [`${SAMPLE_API_ACTION}_${SUCCESS}`](state, { payload }) {
      return {
        ...state,
        sampleApiValue: payload,
        sampleApiLoading: false,
      };
    },
    [`${SAMPLE_API_ACTION}_${FAILURE}`](state) {
      return {
        ...state,
        sampleApiLoading: false,
        sampleApiFailed: true,
      };
    },
  },
  initialState
);

export default reducer;
