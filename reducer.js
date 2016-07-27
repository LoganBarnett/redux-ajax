import actionTypes from './constants';
import R from 'ramda';

const initialState = (id, defaultResponseData) => {
  return (
    { requesting: false
    , receivedSuccess: false
    , receivedError: false
    , id
    , responseData: defaultResponseData
  });
};

const ajax = (id, defaultResponseData) => {
  return (state = initialState(id, defaultResponseData), action) => {
    if(action.id != state.id) {
      return state;
    }
    switch(action.type) {
      case actionTypes.REQUEST:
        return R.merge(state,
          { requesting: true
          , receivedError: false
          , receivedSuccess: false
        });
      case actionTypes.RECEIVE_SUCCESS:
        return R.merge(state,
          { receivedSuccess: true
          , responseData: action.data
          , requesting: false
        });
      case actionTypes.RECEIVE_FAILURE:
        return R.merge(state,
          { receivedError: true
          , responseData: action.error.data
          , requesting: false
        });
      default:
        return state;
    }
  };
}

export default ajax;
