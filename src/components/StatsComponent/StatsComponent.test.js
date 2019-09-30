import React from 'react';
import ReactDOM from 'react-dom';
import StatsComponent from '../StatsComponent';

it('renders without crashing', () => {  
  const div = document.createElement('div');
  ReactDOM.render(<StatsComponent />, div);  
});
