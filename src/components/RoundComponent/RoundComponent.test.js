import React from 'react';
import ReactDOM from 'react-dom';
import RoundComponent from '../RoundComponent';

it('renders without crashing', () => {  
  const div = document.createElement('div');
  ReactDOM.render(<RoundComponent />, div);  
});
