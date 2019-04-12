import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { Tabs, TabList, TabPanel } from 'react-tabs'

import TabView from 'components/TabView'
import Table from 'components/Table'

import {TAB_LIST, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE} from './constants'
import {fetchData, selecTab} from './actions'
import {transformColumns, transformData} from './utils'

/*
Home Page container. This is used to render tabs
and their respective panels. It also registers
onSelect listeners for tabs and pagination listeners
for table.
*/
class HomePage extends React.Component{

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this) // Bind the select handler.
  }

  componentDidMount(){
    const { dispatch, selectedTab } = this.props
    dispatch(fetchData(selectedTab))
  }

  /*
  Handle change callback. Only fetch the data if the tab selection
  have been changed.
  */
  handleSelect(index, last){
    if (index !== last) {
      this.props.dispatch(selecTab(TAB_LIST[index]))
      this.props.dispatch(fetchData(TAB_LIST[index]))
    }
  }

  render(){
    const {selectedTab, data, isFetching, error} = this.props

    TabView.tabsRole = 'Tab'; // Required by React-Tabs Library

    return (
      <div>
        <NotificationContainer/>
        {error ? NotificationManager.error('Something Went Wrong!') : ''} // Flash error message if request dont get successful

        <Tabs
          defaultIndex={0}
          onSelect={this.handleSelect}>

          <TabList>
            {TAB_LIST.map((tab, i) => <TabView key={i} tabtext={tab.title}/>)}
          </TabList>

          {TAB_LIST.map((content, i) =>
            <TabPanel key={i}>
              <Table
                page={DEFAULT_PAGE_NUMBER}
                pageSize={DEFAULT_PAGE_SIZE}
                columns={transformColumns(data)}
                loading={isFetching}
                data={transformData(data)}
                onPageChange={(pageIndex) => this.props.dispatch(fetchData(TAB_LIST[index], pageIndex))}
                onPageSizeChange={(pageSize, pageIndex) => this.props.dispatch(fetchData(TAB_LIST[index], pageIndex, pageSize))}/>
            </TabPanel>)}
        </Tabs>

      </div>
    )
  }
}

HomePage.propTypes = {
  selectedTab: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state){
  const {selectedTab, dataByTab} = state
  const {isFetching, items: data, error} = dataByTab[selectedTab] || {isFetching: true, items: [], error: ''}
  return {selectedTab, data, isFetching, error}
}

export default connect(mapStateToProps)(HomePage)
