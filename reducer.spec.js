// import axios from 'axios';
import ajax from './ajax';
import actionTypes from '../constants/ajax';

describe('ajax', () => {
  it('defaults responseData to whatever is provided', () => {
    const action = {type: 'nothing', id: 'foo'};
    const newState = ajax('foo', ['bar'])(undefined, action);
    expect(newState.responseData).toEqual(['bar']);
  });

  it('defaults requesting as false', () => {
    const action = {type: 'nothing', id: 'foo'};
    const newState = ajax('foo')(undefined, action);
    expect(newState.requesting).toBe(false);
  });

  it('defaults receivedSuccess as false', () => {
    const action = {type: 'nothing', id: 'foo'};
    const newState = ajax('foo')(undefined, action);
    expect(newState.receivedSuccess).toBe(false);
  });

  it('defaults receivedError as false', () => {
    const action = {type: 'nothing', id: 'foo'};
    const newState = ajax('foo')(undefined, action);
    expect(newState.receivedError).toBe(false);
  });

  it('is flagged as requesting when the request is started', () => {
    const state = {requesting: false, id: 'foo'};
    const action = {type: actionTypes.REQUEST, id: 'foo'};
    const newState = ajax('foo')(state, action);
    expect(newState.requesting).toBe(true);
  });

  it('can receive a successful response', () => {
    const state = {requesting: true, receivedSuccess: false, id: 'foo'};
    const action = {type: actionTypes.RECEIVE_SUCCESS, id: 'foo'};
    const newState = ajax('foo')(state, action);
    expect(newState.receivedSuccess).toBe(true);
  });

  it('can receive a successful response with data', () => {
    const state = {requesting: true, receivedSuccess: false, id: 'foo'};
    const action = {type: actionTypes.RECEIVE_SUCCESS, id: 'foo', data: 'bar'};
    const newState = ajax('foo')(state, action);
    expect(newState.responseData).toEqual('bar');
  });

  it('can receive an error response', () => {
    const state = {requesting: true, receivedError: false, id: 'foo'};
    const action =
      { type: actionTypes.RECEIVE_FAILURE
      , id: 'foo'
      , error: {data: 'bar'}
    };
    const newState = ajax('foo')(state, action);
    expect(newState.receivedError).toBe(true);
  });

  it('can receive error response data', () => {
    const state = {responseData: {}, receivedError: false, id: 'foo'};
    const action =
      { type: actionTypes.RECEIVE_FAILURE
      , id: 'foo'
      , error: {data: 'bar'}
    };
    const newState = ajax('foo')(state, action);
    expect(newState.responseData).toEqual('bar');
  });

  it('is no longer requesting when receiving a successful response', () => {
    const state = {requesting: true, receivedSuccess: false, id: 'foo'};
    const action = {type: actionTypes.RECEIVE_SUCCESS, id: 'foo', data: 'bar'};
    const newState = ajax('foo')(state, action);
    expect(newState.requesting).toBe(false);
  });

  it('is no longer requesting when receiving an error response', () => {
    const state = {requesting: true, receivedError: false, id: 'foo'};
    const action =
      { type: actionTypes.RECEIVE_FAILURE
      , id: 'foo'
      , error: {data: 'bar'}
    };
    const newState = ajax('foo')(state, action);
    expect(newState.requesting).toBe(false);
  });

  it('is not in an error state when submitting the request', () => {
    const state = {requesting: false, receivedError: true, id: 'foo'};
    const action = {type: actionTypes.REQUEST, id: 'foo', data: 'bar'};
    const newState = ajax('foo')(state, action);
    expect(newState.receivedError).toBe(false);
  });

  it('is not in a success state when submitting the request', () => {
    const state = {requesting: false, receivedSuccess: true, id: 'foo'};
    const action = {type: actionTypes.REQUEST, id: 'foo'};
    const newState = ajax('foo')(state, action);
    expect(newState.receivedSuccess).toBe(false);
  });

  it('ignores actions with mismatched IDs', () => {
    const state = {requesting: false, id: 'foo'};
    const action = {type: actionTypes.REQUEST, id: 'bar'};
    const newState = ajax('foo')(state, action);
    expect(newState.requesting).toBe(false);
  });
});
