import React from 'react'
import PropTypes from 'prop-types'

import Nav from './nav'
import Header from './header'
import CSSModules from 'react-css-modules'
import styles from './index.scss'

@CSSModules(styles, {allowMultiple: true} )
export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  state = {
    menuNarrow: false
  }

  toggleMenu = (menuNarrow) => this.setState({ menuNarrow })

  render() {
    return (
      <div styleName="container">
        <div styleName={`left ${this.state.menuNarrow ? 'narrow' : ''}`}>
          <Nav
            menuNarrow={this.state.menuNarrow}
            toggleMenu={this.toggleMenu}
          />
        </div>
        <div styleName={`right ${this.state.menuNarrow ? 'narrow' : ''}`}>
          <Header />
          {this.props.children}
        </div>
      </div>
    )
  }
}