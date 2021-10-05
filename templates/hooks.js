import useRedux from './useRedux';
import { templateActions } from '../actions';

const useTemplate = () => useRedux('templateReducer', templateActions);

export default useTemplate;
