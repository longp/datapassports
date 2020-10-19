import React from 'react'
import App from '../App'
import { shallow,mount } from 'enzyme';
import { screen, fireEvent } from "@testing-library/react";

describe('App', () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });
  
})

