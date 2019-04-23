import React from 'react'
import FormItem from 'com/FormItem'
import FormFiled from 'com/FormField'
import Button from 'com/Button'
import data from '../../data/index.json'

import CSSModules from 'react-css-modules'
import styles from './index.scss'

@CSSModules(styles)
export default class Form extends React.Component {
  render() {
    return (
      <div>
        {data.map((item) => (
          <div key={item.id} className="clearfix box">
            <div className="filter-form-title">Form: {item.id}</div>
            {Object.keys(item.attributes).map((key, idx) => (
              <FormItem
                key={key}
                title={key}
                required={item.attributes[key].specification.required}
              >
                <FormFiled
                  data={item.attributes[key]}
                />
              </FormItem>
            ))}
          </div>
        ))}

        <div styleName="button-container">
          <div styleName="button-wrapper">
            <Button
              styleClass="button-full"
            >
              保存
            </Button>
          </div>

          <div styleName="button-wrapper">
            <Button
              styleClass="button-full button-outline"
            >
              取消
            </Button>
          </div>
        </div>
      </div>
    )
  }
}