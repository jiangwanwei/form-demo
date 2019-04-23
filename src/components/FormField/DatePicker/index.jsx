import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

import Picker from 'react-datepicker'
import moment from 'moment'
import FormValidation from 'utils/formValidation'
import 'assets/scss/datepicker.scss'

import CSSModules from 'react-css-modules'
import styles from './index.scss'

@CSSModules(styles, { allowMultiple: true })
export default class Datepicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: '',
      userSelected: false,
      focus: false,
      validated: true,
      msg: '',
    }

    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.mounted = false
  }

  componentWillUnmount() {
    this.mounted = false
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillReceiveProps(nextProps) {
    // const value = nextProps.value ? moment(nextProps.value).format('YYYY/MM/DD') : ''
    // if (value && value !== this.state.startDate) {
    //   setTimeout(() => this.setValue(value), 0)
    // }
  }

  validate() {
    const picker = findDOMNode(this.refs.picker)
    const input = picker.getElementsByTagName('input')[0]
    const date = input.value

    const validation = FormValidation.check(date, this.props.rules)
    this.setState({
      validated: validation.validated,
      msg: validation.msg,
    })
    return validation.validated
  }

  getValue() {
    const { value } = this.props
    let date = value && moment(value)
    const val = this.state.userSelected ? this.state.startDate : date
    return val || ''
  }

  setValue(val) {
    if (val) {
      val = moment(val)
    }
    this.mounted && this.setState({
      startDate: val,
    })
  }

  render() {
    const { type, name, placeholder, value, styleClass, unit, disable, isView } = this.props
    const { focus, validated, msg } = this.state

    let inputClass = focus ? 'input-container-focus ' : 'input-container '
    inputClass += styleClass ? styleClass : ''
    inputClass += validated ? '' : ' input-error'
    inputClass += disable ? ' disabled' : ''
    inputClass += isView ? ' view' : ''

    let date = value ? moment(value) : ''

    // let date = value || ''
    let d = this.state.userSelected ? this.state.startDate : date


    return (
      <div
        styleName={inputClass}
      >
        {(disable || isView) &&
        <div styleName="mask"></div>
        }

        {isView && d &&
        <Picker
          ref="picker"
          dateFormat="YYYY/MM/DD"
          disabledKeyboardNavigation
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          selected={d}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        }

        {!isView &&
        <Picker
          ref="picker"
          dateFormat="YYYY/MM/DD"
          disabledKeyboardNavigation
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          selected={d}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        }


        {false && d && d.toString()}


        {!validated &&
        <div styleName="error-info">
          <div>{msg}</div>
        </div>
        }

      </div>
    )
  }

  handleFocus(e) {
    this.setState({ focus: true })

    setTimeout(() => {
      this.props.onFocus && this.props.onFocus(this.getValue(), e)
    }, 0)
  }

  handleBlur(e) {
    setTimeout(() => this.validate(), 0)
    this.setState({
      focus: false,
    })

    setTimeout(() => {
      this.props.onBlur && this.props.onBlur(this.getValue(), e)
    }, 0)
  }

  handleChange(date) {
    setTimeout(() => this.validate(), 0)

    this.setState({
      startDate: date,
      userSelected: true,
    })

    setTimeout(() => {
      this.props.onChange && this.props.onChange(date)
    }, 0)
  }
}