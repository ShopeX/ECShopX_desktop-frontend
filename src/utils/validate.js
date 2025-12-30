/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

const phone_rule = /^1[3456789]\d{9}$/
const pass_rule = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
const num_rule = /^[0-9]*$/
const letter_rule = /^[A-Za-z]+$/

const email_rule = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/

const validate = {
  isRequired: function(val) {
    return !!(val === '' || val.length === 0)
  },
  validatePhone: function(val) {
    return phone_rule.test(val)
  },
  validatePass: function(val) {
    let message = null
    if (!val) {
      message = '请输入密码'
    } else if (val.length < 8) {
      message = '8-20位密码，必须为数字和字母混合'
    } else if (val.length > 20) {
      message = '8-20位密码，必须为数字和字母混合'
    } else if (num_rule.test(val) || letter_rule.test(val)) {
      message = '8-20位密码，必须为数字和字母混合'
    } else if (!pass_rule.test(val)) {
      message = '密码不能包括特殊字符'
    }
    return message
  },
  validatePass2: function(val, val1) {
    let message = null
    if (val != val1) {
      message = '输入的密码不一致'
    }
    return message
  },
  validateEmail: function(val) {
    let message = null
    if (!email_rule.test(val)) {
      message = '邮箱格式不正确'
    }
    return message
  },
  // 企业税号
  checkTax(val) {
    return /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(val)
  }
}

export default validate
