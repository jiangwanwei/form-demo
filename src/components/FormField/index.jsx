import React from 'react'
import { fieldMap, rulesConvertor } from './fieldMap'

/**
 * 根据数据返回对应的field组件
 * @param data
 * @return {XML}
 * @constructor
 */
const FormFiled = ({ data }) => {
  const Component = fieldMap(data.type)
  const rules = rulesConvertor(data.specification)
  return <Component rules={rules} />
}

export default FormFiled
