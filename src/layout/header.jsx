import React from 'react'

import CSSModules from 'react-css-modules'
import styles from './header.scss'

@CSSModules(styles, {allowMultiple: true})
export default class Header extends React.Component {
  render() {
    return (
      <div styleName="header">
        Form Validation
      </div>
    )
  }
}