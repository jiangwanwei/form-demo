/**
 * 本师例
 * field组件的公共方法和使用formValidation校验
 */

import React from 'react'
import FormValidation from 'utils/formValidation'

export default class FieldComponent extends React.Component {
  /**
   * 取值方法
   */
  getValue() {
    // return field's value
  }

  /**
   * 校验方法
   * @return {boolean}
   */
  validate() {
    const value = this.getValue()
    const validated = FormValidation.check(value, this.props.rules) // return {validated, msg}
    return validated.validated
  }
}
