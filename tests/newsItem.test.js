import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import NewsItem from '../assets/js/Components/NewsItem';

describe('News Item', () => {
  const initialProps = {
    obj: {
      url: '',
      title: '',
      descendants: 0,
      id: 0,
      time: 10000000,
    },
    index: 0
  }

  it('should render correctly in "debug" mode', () => {
    const component = shallow(<NewsItem {...initialProps} />);
  
    expect(component).toMatchSnapshot();
  });
});