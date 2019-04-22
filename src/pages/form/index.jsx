import React from 'react'
import FormItem from 'com/FormItem/index'
import data from '../../data/index.json'
import Input from 'com/Input'
import Datepicker from 'com/DatePicker/index'

export default class Form extends React.Component {
  convertRules = (specification) => {
    const rules = []
    const rulesMap = {
      required: {
        str: 'required'
      },
      number: {
        str: 'number',
      },
      min_length: {
        str: 'minLength:',
        mixValue: true,
      },
      max_length: {
        str: 'maxLength:',
        mixValue: true,
      },
      min: {
        str: 'minValue:',
        mixValue: true,
      },
      max: {
        str: 'maxValue:',
        mixValue: true,
      },
    }
    Object.keys(specification).map(key => {
      let rule = rulesMap[key].str
      rule += rulesMap[key].mixValue ? specification[key] : ''
      rules.push(rule)
    })
    return rules
  }

  generateFiled = (item) => {
    if (item.type === 'text') {
      return this.generateText(item)
    }
    if (item.type === 'number') {
      item.specification = Object.assign({ number: 'number' }, item.specification)
      return this.generateText(item)
    }
    if (item.type === 'date') {
      return this.generateDate(item)
    }
  }

  generateText = (item) => {
    const rules = this.convertRules(item.specification)
    return (
      <Input rules={rules} />
    )
  }

  generateDate = (item) => {
    const rules = this.convertRules(item.specification)
    return (
      <Datepicker rules={rules} />
    )
  }

  render() {
    return (
      <div className="box">
        <div className="clearfix">
          {data.map((item) => (
            <div key={item.id}>
              {Object.keys(item.attributes).map((key, idx) => (
                <FormItem
                  key={key}
                  title={key}
                  required={item.attributes[key].specification.required}
                >
                  {this.generateFiled(item.attributes[key])}
                </FormItem>
              ))}
            </div>
          ))}
        </div>

      </div>
    )
  }
}