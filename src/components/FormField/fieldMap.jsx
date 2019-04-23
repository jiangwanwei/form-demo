import React from 'react'
import { asyncComponent } from '../AsyncComponent/index'

const Input = asyncComponent(() => import('./Input'))
const Textarea = asyncComponent(() => import('./Textarea'))
const Number = asyncComponent(() => import('./Number'))
const DatePicker = asyncComponent(() => import('./DatePicker'))

/**
 * 组件映射
 */
const map = {
  'text': Input,
  'textarea': Textarea,
  'number': Number,
  'date': DatePicker,
}

export const fieldMap = (key) => {
  return map[key] || null
}

/**
 * ------------------------------------------------
 * 控件类型
 * [
 *    number,
 *    text,
 *    textarea,
 *    date
 * ]
 *
 * ------------------------------------------------
 * specification - 控件规则（form validation）:
 * [
 *    required: BOOLEAN,
 *    id_card: BOOLEAN,         // 身份证号码
 *    username: BOOLEAN,        // 用户名规则
 *    password: BOOLEAN,        // 密码规则
 *    email: BOOLEAN,           // 邮箱
 *    email_suffix: BOOLEAN,    // 邮箱后缀
 *    positive_number: BOOLEAN, // 正数
 *    int: BOOLEAN,             // 整数
 *    currency: BOOLEAN,        // 货币格式
 *
 *    min: NUMBER,              // 最小值
 *    max: NUMBER,              // 最大值
 *    max_not_equate: NUMBER,   // 最大值并且不等于
 *    min_length: NUMBER,       // 最小长度
 *    max_length: NUMBER,       // 最大长度
 *    length: NUMBER,           // 长度匹配
 *
 * ]
 * ------------------------------------------------
 */

/**
 * 规则转换:
 *    真假值类型存: key
 *    其他类型存: key:value - 连接字符串
 *    如： {require: true, min: 5, min_length: 5} -> ['required', 'min:5', 'min_length:5']
 *
 * @param rulesObject
 * @return {Array}
 */
export const rulesConvertor = (rulesObject) => {
  const rules = []
  for (let key in rulesObject) {
    if (typeof rulesObject[key] === 'boolean') {
      rules.push(key)
    }
    else {
      rules.push(key + ':' + rulesObject[key])
    }
  }
  return rules
}

