import React, { Component } from 'react'

import CSSModules from 'react-css-modules'
import styles from './index.scss'

@CSSModules(styles, { allowMultiple: true })
export default class Button extends Component {
  constructor(props) {
    super(props)

    this.state = {
      disable: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillUnmount() {
    //重写组件的setState方法，直接返回空
    this.setState = (state, callback) => {
      return
    }
  }

  render() {
    const { onClick, children, styleClass, disable, className, square } = this.props
    return (
      <div
        className={className ? className : ''}
        styleName={
          (styleClass ? styleClass : 'button') +
          (this.state.disable || disable ? ' btn-disable' : '') +
          (square ? ' btn-square' : '')
        }
        onClick={!disable && !this.state.disable ? this.handleClick : () => {
        }}
      >
        {children}
        {square}
      </div>
    )
  }

  // 按钮点击事件
  handleClick() {
    let timer // 定时器: 点击操作后 按钮立刻变灰
    this.props.onClick && this.props.onClick()
    this.setState({
      disable: true,
    })
    timer = setTimeout(() => {
      clearTimeout(timer)
      this.setState({
        disable: false,
      })
    }, 300)
  }
}
