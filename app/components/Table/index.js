import React from 'react';
import PropTypes from 'prop-types'

import ReactTable from "react-table";
import { ReactTableDefaults } from 'react-table'
import 'react-table/react-table.css'

/*
Table component for application.
It is used as `TabPanel` inside `HomePage`
container.
*/
class Table extends React.Component {

  render(){
    const { columns, data, loading } = this.props

    return <ReactTable
      data={data}
      columns={columns}
      loading={loading}
    />
  }
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  loading: PropTypes.bool
}
export default Table;
