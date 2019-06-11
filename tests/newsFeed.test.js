import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import Api from '../assets/js/Common/Api';
import NewsFeed from '../assets/js/Components/NewsFeed';
import { mockStory, mockStoryIds } from './mockobjs';

describe('News Feed', () => {
  beforeAll(() => {
    const mockGetItem = () => {
      return new Promise(resolve => {
        resolve(mockStory);
      });
    };

    const mockGetStoryIds = () => {
      return new Promise(resolve => {
        resolve(mockStoryIds);
      });
    };

    jest.mock('../assets/js/Common/Api', () => {
        return {
          getStoryIds: mockGetStoryIds,
          getItem: mockGetItem,
        }
    });
  });

  const initialProps = {
    type: 'topstories'
  }

  it('should render', () => {
    const component = shallow(<NewsFeed {...initialProps} />);
    expect(component.exists()).toBe(true);
  });

  it('should render correctly', () => {
    const component = shallow(<NewsFeed {...initialProps} />);
    expect(component).toMatchSnapshot();
  });

  it('should populate the state with the StoryIds coming from the API', () => {
    jest.useFakeTimers();
    const component = shallow(<NewsFeed {...initialProps} />);

    setTimeout(() => {
      expect(component.state().storyIds).toBe(mockStoryIds);
    }, 1000);
  });
});