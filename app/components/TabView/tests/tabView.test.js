import React from 'react'
import { mount } from 'enzyme'
import TabView from '..'

describe('<TabView />', () => {
  it('should render a <Tab> tag', () => {
    const content = 'Hello world'
    const renderedComponent = mount(<TabView tabtext={content} />)
    expect(renderedComponent.contains(content)).toBe(true)
  });

});
