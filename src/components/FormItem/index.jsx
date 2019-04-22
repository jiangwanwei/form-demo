import React from 'react'
import cx from 'classnames'

const FormItem = ({children, title, required=false, classNames={}, isView = false, narrow = false}) => {
  let labelClass = isView ? 'view-label' : 'label';
  let fieldClass = isView ? 'view-field view-edit' : 'field';
  labelClass += narrow ? ' narrow' : ''
  fieldClass += narrow ? ' narrow' : ''
  return (
    <ul className={cx({
      "ul-no-style": true,
      "field-item": !isView,
      "clearfix": true,
      "view-item": isView,
    }, classNames)}>
      <li className={labelClass}>
        <span>
          {required && <b className='red'>*</b>}
          {title} :
        </span>
      </li>
      <li className={fieldClass}>
        {children}
      </li>
    </ul>
  )
}

export default FormItem