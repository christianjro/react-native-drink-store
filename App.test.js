import React from 'react';
import {create, act} from 'react-test-renderer';

import App from './App';

describe('<App />', () => {
  it('has 1 child', () => {
    let tree 
    act(() => {
        tree = create(<App />)
    })
    if (tree.toJSON() !== null) {
        expect(tree.toJSON().children.length).toBe(1);
    } else {
        fail('Component did not render any children.');
    }      
  });
});
