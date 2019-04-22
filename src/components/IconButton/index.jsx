import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './index.scss'

const IconButton = ({ className, onClick, title, disable }) => (
  <a
    styleName="icon-button"
    onClick={disable ? (() => {
    } ) : onClick}
  >
      <span className={className}>
        {title &&
        <span styleName="tip">{title}</span>
        }
      </span>
  </a>
)


IconButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
  styleClass: PropTypes.string,
  disable: PropTypes.bool,
}

export default CSSModules(IconButton, styles)