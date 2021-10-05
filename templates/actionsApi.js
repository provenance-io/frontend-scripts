import { URL_CONST } from 'consts';
import { createAction } from 'redux-actions';
import { ajaxGet } from './xhrActions';

// Vars
// - API
export const SAMPLE_API_ACTION = 'TEMPLATE::SAMPLE_API_ACTION';
// - Store
export const SAMPLE_STORE_ACTION = 'TEMPLATE::SAMPLE_STORE_ACTION';

// Actions
// - API Calls
export const sampleApiAction = (data) => async (dispatch) =>
ajaxGet(SAMPLE_API_ACTION, dispatch, `${URL_CONST}`, data);
// - Store
export const sampleStoreAction = createAction(SAMPLE_STORE_ACTION);
