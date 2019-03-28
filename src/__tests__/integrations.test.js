import React from 'react';
import { mount } from 'enzyme';
import Root from 'Root';
import App from 'components/App';
import moxios from 'moxios';

beforeEach(() => {
  moxios.install();
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [{name: 'Fetch #1'}, {name: 'Fetched #2'}]
  })
});

afterEach(() => {
  moxios.uninstall();
});

it('can fetch a list of comments and display them', (done) => {
  // attempt ot render the entire applyMiddleware
  const wrapped = mount(
    <Root>
      <App />
    </Root>
  )
  // find the fetch comment button and click it
  wrapped.find('.fetch-comments').simulate('click');
  // expect to find a list of comments
  setTimeout(() => {
    wrapped.update()
    expect(wrapped.find('li').length).toEqual(2);
    done();
  }, 100);
});
