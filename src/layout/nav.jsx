import React from 'react'
import PropTypes from 'prop-types'

import IconButton from 'com/IconButton'
import CSSModules from 'react-css-modules'
import styles from './nav.scss'

@CSSModules(styles, { allowMultiple: true})
export default class Nav extends React.Component {
  static propTypes = {
    menuNarrow: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
  }

  render() {
    const { menuNarrow, toggleMenu } = this.props
    return (
      <div>
        <div styleName="logo-container">
          <div styleName={`logo ${menuNarrow ? 'narrow' : ''}`}>DEMO</div>
          <IconButton
            className="fa fa-bars menu-narrow-icon"
            title={menuNarrow ? '展开' : '折叠'}
            onClick={e => toggleMenu(!menuNarrow)}
          />
        </div>
        <ul styleName={`nav ${menuNarrow ? 'narrow' : ''}`}>
          <li><a href="/" styleName="active">Form Validation</a></li>
          <li><a href="/">Form Validation</a></li>
          <li><a href="/">Form Validation</a></li>
        </ul>
      </div>
    )
  }
}