import ajax from './ajax';
import ajaxActionTypes from '../constants/ajax';

describe('ajax actions', () => {
  it('dispatches that a request has been submitted', (done) => {
    const http = jasmine.createSpy('http').and.returnValue(Promise.resolve({}));
    const fn = ajax('foo');
    const dispatch = jasmine.createSpy('dispatch');
    fn(http, dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith(
        jasmine.objectContaining({type: ajaxActionTypes.REQUEST})
      );
      done();
    });
  });

  it('dispatches success if the request succeeded', (done) => {
    const http = jasmine.createSpy('http').and.returnValue(Promise.resolve({}));
    const fn = ajax('foo');
    const dispatch = jasmine.createSpy('dispatch');
    const promise = fn(http, dispatch);
    promise.then(() => {
      expect(dispatch.calls.argsFor(1)[0]).toEqual(
        jasmine.objectContaining({type: ajaxActionTypes.RECEIVE_SUCCESS})
      );
      done();
    })
    .catch((error) => done.fail('Error when success expected: ' + error));
  });

  it('dispatches the data on success', (done) => {
    const http = jasmine.createSpy('http')
      .and.returnValue(Promise.resolve({data: 'foobar'}));
    const fn = ajax('foo');
    const dispatch = jasmine.createSpy('dispatch');
    const promise = fn(http, dispatch);
    promise.then(() => {
      expect(dispatch.calls.argsFor(1)[0]).toEqual(
        jasmine.objectContaining({data: 'foobar'})
      );
      done();
    })
    .catch((error) => done.fail('Error when success expected: ' + error));
  });

  it('dispatches error if the request failed', (done) => {
    const http = jasmine.createSpy('http')
      .and.returnValue(Promise.reject('flagrant error'));
    const fn = ajax('foo');
    const dispatch = jasmine.createSpy('dispatch');
    const promise = fn(http, dispatch);
    // errors land in the success area because a rejection at this level
    // will cause problems in the redux cycle.
    // we don't need to 'handle' the rejection further up the stack
    // because it is essentially handled here by setting our state
    // to reflect the error state
    promise.then(() => {
      expect(dispatch.calls.argsFor(1)[0]).toEqual(
        jasmine.objectContaining({type: ajaxActionTypes.RECEIVE_FAILURE})
      );
      done();
    })
    .catch((error) => done.fail('Error when success expected: ' + error));
  });

  it('dispatches the error message when the request fails', (done) => {
    const http = jasmine.createSpy('http')
      .and.returnValue(Promise.reject('flagrant error'));
    const fn = ajax('foo');
    const dispatch = jasmine.createSpy('dispatch');
    const promise = fn(http, dispatch);
    // errors land in the success area because a rejection at this level
    // will cause problems in the redux cycle.
    // we don't need to 'handle' the rejection further up the stack
    // because it is essentially handled here by setting our state
    // to reflect the error state
    promise.then(() => {
      expect(dispatch.calls.argsFor(1)[0]).toEqual(
        jasmine.objectContaining({error: 'flagrant error'})
      );
      done();
    })
    .catch((error) => done.fail('Error when success expected: ' + error));
  });

  it('uses a generic error message when a network error occurs', (done) => {
    const http = jasmine.createSpy('http')
      .and.returnValue(Promise.reject('flagrant error'));
    const fn = ajax('foo');
    const dispatch = jasmine.createSpy('dispatch');
    const promise = fn(http, dispatch);
    // errors land in the success area because a rejection at this level
    // will cause problems in the redux cycle.
    // we don't need to 'handle' the rejection further up the stack
    // because it is essentially handled here by setting our state
    // to reflect the error state
    promise.then(() => {
      expect(dispatch.calls.argsFor(1)[0]).toEqual(
        jasmine.objectContaining({type: ajaxActionTypes.RECEIVE_FAILURE})
      );
      done();
    })
    .catch((error) => done.fail('Error when success expected: ' + error));
  });

  it('sends the id as part of the request dispatch', (done) => {
    const http = jasmine.createSpy('http').and.returnValue(Promise.resolve({}));
    const fn = ajax('foo');
    const dispatch = jasmine.createSpy('dispatch');
    fn(http, dispatch).then(() => {
      expect(dispatch.calls.argsFor(0)[0]).toEqual(
        jasmine.objectContaining({id: 'foo'})
      );
      done();
    })
    .catch((error) => done.fail('Error when success expected: ' + error));
  });

  it('sends the id as part of the success dispatch', (done) => {
    const http = jasmine.createSpy('http').and.returnValue(Promise.resolve({}));
    const fn = ajax('foo');
    const dispatch = jasmine.createSpy('dispatch');
    fn(http, dispatch).then(() => {
      expect(dispatch.calls.argsFor(1)[0]).toEqual(
        jasmine.objectContaining({id: 'foo'})
      );
      done();
    })
    .catch((error) => done.fail('Error when success expected: ' + error));
  });

  it('sends the id as part of the failure dispatch', (done) => {
    const http = jasmine.createSpy('http')
      .and.returnValue(Promise.reject('flagrant error'));
    const fn = ajax('foo');
    const dispatch = jasmine.createSpy('dispatch');
    fn(http, dispatch).then(() => {
      expect(dispatch.calls.argsFor(1)[0]).toEqual(
        jasmine.objectContaining({id: 'foo'})
      );
      done();
    })
    .catch((error) => done.fail('Error when success expected: ' + error));
  });

  it('passes its data along to the http call', (done) => {
    const http = jasmine.createSpy('http')
      .and.returnValue(Promise.resolve({}));
    const fn = ajax('foo');
    const dispatch = jasmine.createSpy('dispatch');
    fn(http, dispatch, 'bar').then(() => {
      expect(http).toHaveBeenCalledWith('bar');
      done();
    })
    .catch((error) => done.fail('Error when success expected: ' + error));
  });
});
