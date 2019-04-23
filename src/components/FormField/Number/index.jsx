import React, { Component } from 'react';
import Input from '../Input'

export default class Number extends Input {
  render() {
    const rules = this.props.rules || []
    rules.push('number')
    return (
      <Input
        {...this.props}
        rules={rules}
      />
    )
  }
}