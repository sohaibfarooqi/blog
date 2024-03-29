/*
Utility method to transform data into table columns
*/
export function transformColumns(attrs){
  if(attrs.length > 0){
    let all_keys = Object.keys(attrs[0].attributes)
    return all_keys.map((key, i) => ({Header: key, accessor: key}))
  }
  return []
}

/*
Utility method to transform data into react table data format
*/
export function transformData(attrs){
  if(attrs.length > 0){
    var result = attrs.map((obj) => obj.attributes)
    return result
  }
  return []
}
