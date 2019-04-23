import React, { Component } from 'react';
import Input from '../Input'

export default class Textarea extends Input {
  render() {
    return (
      <Input
        {...this.props}
        type="textarea"
      />
    )
  }
}