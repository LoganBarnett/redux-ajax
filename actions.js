import ajaxActionTypes from '../constants/ajax';

const ajax = (id) => {
  return (http, dispatch, data) => {
    dispatch({type: ajaxActionTypes.REQUEST, id: id});
    return http(data).then((result) => {
      return dispatch(
        { type: ajaxActionTypes.RECEIVE_SUCCESS
        , id: id
        , data: result.data
      });
    })
    .catch((e) => {
      dispatch({type: ajaxActionTypes.RECEIVE_FAILURE, error: e, id: id});
    });
  };
};

export default ajax;
