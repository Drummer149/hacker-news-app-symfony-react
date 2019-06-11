import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import Api from '../assets/js/Common/Api';
import Comment from '../assets/js/Components/Comment';
import { mockComment } from './mockobjs';

describe('Comment', () => {

  beforeAll(() => {
    const mockGetItem = () => {
      return new Promise(resolve => {
        resolve(mockComment);
      });
    };

    jest.mock('../assets/js/Common/Api', () => {
        return {
          getItem: mockGetItem,
        }
    });
  });

  const initialProps = {
    id: 1
  }

  it('should render', () => {
    const component = shallow(<Comment {...initialProps} />);
    expect(component.exists()).toBe(true);
  });

  it('should render correctly', () => {
    const component = shallow(<Comment {...initialProps} />);
    expect(component).toMatchSnapshot();
  });

  it('should populate the state with the comment coming from the API', () => {
    jest.useFakeTimers();
    const component = shallow(<Comment {...initialProps} />);

    setTimeout(() => {
      expect(component.state().comment).toBe(mockComment);
    }, 1000);
  });

  it('should have method hide and change the state', () => {
    const component = shallow(<Comment {...initialProps} />);
    component.instance().hideComment();
    expect(component.state().hide).toBe(true);
    component.instance().hideComment();
    expect(component.state().hide).toBe(false);
    component.instance().hideComment();
    expect(component.state().hide).toBe(true);
  });
});