import React from 'react'
import PropTypes from 'prop-types'

import { Tab } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class TabView extends React.Component{

  render(){
    const {tabtext} = this.props

    return (
      <Tab>{tabtext}</Tab>
    )
  }
}

TabView.propTypes = {
  tabtext: PropTypes.string.isRequired
}
export default TabView
