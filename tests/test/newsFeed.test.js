import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import Api from '../../assets/js/Common/Api';
import NewsFeed from '../../assets/js/Components/NewsFeed';



describe('News Feed', () => {
  beforeAll(() => {
    const mockFunc = jest.fn();

    jest.mock('../../assets/js/Common/Api', () => {
        return {
          getStoryIds: mockFunc,
          getItem: mockFunc,
        }
    });
  });

  const initialProps = {
    type: 'topstories'
  }

  it('should render correctly in "debug" mode', () => {
    const component = shallow(<NewsFeed {...initialProps} />);
  
    expect(component).toMatchSnapshot();
  });
});