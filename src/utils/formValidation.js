class Validation {
  check(value, rules) {
    const success = { validated: true, msg: '' }
    if (!rules || !(rules instanceof Array)) {
      return success
    }

    if (typeof value === 'string') {
      value = value.trim()
    }

    for (let i = 0, j = rules.length; i < j; i++) {
      const item = rules[i]
      if (item === 'required') {
        if (!value) {
          return { validated: false, msg: '必填' }
        }
      }
      if (value && item === 'number') {
        if (!this.isNumber(value)) {
          return { validated: false, msg: '必须为数字' }
        }
      }
      if (value && item === 'mobile') {
        if (!this.isMobile(value)) {
          return { validated: false, msg: '电话输入格式不正确' }
        }
      }

      if (value && item === 'positive_number') {
        if (!this.positiveNumber(value)) {
          return { validated: false, msg: '必须为正数' }
        }
      }

      if (value && item === 'price') {
        if (!this.price(value)) {
          return { validated: false, msg: '不符合货币格式' }
        }
      }

      if (value && item === 'not_negative') {
        if (!this.notNegative(value)) {
          return { validated: false, msg: '不能为负数' }
        }
      }

      if (value && item.indexOf('min:') !== -1) {
        const splits = item.split(':')
        const minValue = +splits[1]
        if (!this.minValue(value, minValue)) {
          return {
            validated: false,
            msg: '不能小于: ' + minValue
          }
        }
      }

      if (value && item.indexOf('max:') !== -1) {
        const splits = item.split(':')
        const maxValue = +splits[1]
        if (!this.maxValue(value, maxValue)) {
          return {
            validated: false,
            msg: '不能大于: ' + maxValue
          }
        }
      }

      if (item.indexOf('max_not_equate') !== -1 && value) {
        const splits = item.split(':')
        const maxValue = +splits[1]
        if (!this.maxValueNotEquate(value, maxValue)) {
          return {
            validated: false,
            msg: '必须小于: ' + maxValue
          }
        }
      }

      if (item === 'int' && value) {
        if (!this.isInt(value)) {
          return { validated: false, msg: '必须为整数' }
        }
      }
      if (item === 'email_suffix' && value) {
        if (!this.isMatchEmailSuffix(value)) {
          return { validated: false, msg: 'email后缀不符合' }
        }
      }
      if (item === 'email' && value) {
        if (!this.isMatchEmail(value)) {
          return { validated: false, msg: 'email输入不正确' }
        }
      }
      if (item === 'password' && value) {
        if (!this.isPassword(value)) {
          return { validated: false, msg: '请输入密码' }
        }
      }
      if (item === 'id_card' && value ) {
        if (!this.isIdCard(value)) {
          return { validated: false, msg: '身份证不符合' }
        }
      }
      if (item === 'username' && value) {
        if (!this.isUsername(value)) {
          return { validated: false, msg: '请输入用户名' }
        }
      }
      if (item.indexOf('min_length:') !== -1 && value) {
        const length = item.split(':')
        if (!this.minLength(value, length[1])) {
          return { validated: false, msg: '长度不小于: ' + length[1] }
        }
      }
      if (item.indexOf('max_length:') !== -1 && value) {
        const length = item.split(':')
        if (!this.maxLength(value, length[1])) {
          return { validated: false, msg: '长度不大于: ' + length[1] }
        }
      }
      if (item.indexOf('length:') !== -1 && item.indexOf('min_length:') === -1 && item.indexOf('max_length:') === -1  && value) {
        const length = item.split(':')
        if (value.length !== parseInt(length[1])) {
          return { validated: false, msg: '长度必须为: ' + length[1] }
        }
      }
      if (item === 'currency' && value) {
        if (!this.isCurrency(value)) {
          return {
            validated: false, msg: '必须为货币格式'
          }
        }
      }
    }
    return success
  }

  positiveNumber(value) {
    if (value.indexOf('-') !== -1 || value.indexOf('+') !== -1 || value <= 0) {
      return false
    }
    return true
  }

  notNegative(value) {
    if (value.indexOf('-') !== -1 || value.indexOf('+') !== -1 || value < 0) {
      return false
    }
    return true
  }

  isNumber(value) {
    const numberValue = parseFloat(value)
    return numberValue == value
  }

  isNumberArray(value) {
    const reg = /[^0-9\,]/
    return !reg.test(value)
  }

  isMobile(value) {
    return /^1\d{10}/.test(value);
  }

  isInt(value) {
    return !/[\D]/.test(value)
  }

  isCurrency(value) {
    return /^(\d+(\.\d\d?)?)?$/.test(value)
  }

  isPassword(str = '') {
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{10,32}$/
    return reg.test(str)
  }

  isMatchEmail(str) {
    const reg = /[a-z0-9!#$%&\'\*\+\"\=\?\^\_\`\{\|\}\~\-]+(?:.[a-z0-9!#$%&\'\*\+\"\=\?\^\_\`\{\|\}\~\-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const reg1 = /(.+)@10minutemail\.com|(.+)@dreggn\.com/
    return reg.test(str) && !reg1.test(str)
  }

  isMatchEmailSuffix(str) {
    const reg = /^@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const reg1 = /@10minutemail\.com|@dreggn\.com/
    const result = reg.test(str)
    return result && !reg1.test(str)
  }

  isIdCard(str = '') {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    return reg.test(str)
  }

  isUsername(str = '') {
    const reg = /^([a-zA-Z0-9_-]{5,20})$/
    return reg.test(str)
  }

  minLength(value, length) {
    if (value === '') return true

    length = parseInt(length)
    return value.length >= length
  }

  maxLength(value, length) {
    if (value === '') return true

    length = parseInt(length)
    return value.length <= length
  }

  maxValue(value, maxValue) {
    if (value === '') return true
    return (+value) <= maxValue
  }

  maxValueNotEquate(value, maxValue) {
    if (value === '') return true

    return (+value) < maxValue
  }

  minValue(value, minValue) {
    if (value === '') return true

    return (+value) > minValue
  }

  price(value) {
    let result = true
    value = value.toString()
    if (value.length > 0 && value.indexOf('.')!== -1) {
      const v = value.split('.')
      if(v[1].length > 2) {
        result = false
      }
    }
    return result
  }

  filterNotNumber(str) {
    str = str.replace(/([^\d\.])/ig, '')
    str = parseFloat(str)
    str = isNaN(str) ? '' : str
    return str
  }

  filterNotInt(str) {
    str = str.replace(/([\D])/ig, '')
    return str
  }
}

const FormValidationInstant = (() => {
  let instant = null
  return () => {
    if (!instant) {
      instant = new Validation()
    }
    return instant
  }
})()()

export default FormValidationInstant