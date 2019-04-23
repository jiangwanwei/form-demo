import React, { Component } from 'react';

import FormValidation from 'utils/formValidation';

import CSSModules from 'react-css-modules';
import styles from './index.scss';

@CSSModules(styles, { allowMultiple: true })
export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      validated: true,
      msg: '',
      valueChanged: false,
      rules: null,
    };

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    if (this.props.defaultValue && this.props.defaultValue != 'undefined') {
      this.setValue(this.props.defaultValue);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultValue != 'undefined' && nextProps.defaultValue !== this.props.defaultValue) {
      this.setValue(nextProps.defaultValue);
    }
  }

  validate() {
    this.setState({ validated: true });

    const rules = this.state.rules || this.props.rules;
    const validation = FormValidation.check(this.getValue(), rules);
    this.setState({
      validated: validation.validated,
      msg: validation.msg,
    });
    return validation.validated;
  }

  getValue() {
    return this.input.value.trim();
  }

  setValue(value) {
    this.input.value = value
  }

  focus() {
    this.refs.input && this.refs.input.focus();
  }

  render() {
    const {
      type, inputType,
      name,
      placeholder, defaultValue, styleClass,
      unit, unitLeft, noUnitPadding,
      height, maxLength,
      loading, correct, incorrect,
      disable, isView,
      hidden,
    } = this.props;

    const { focus, validated, msg } = this.state;
    const inputName = name || 'input_' + Math.random();

    let inputClass = focus ? 'input-container-focus ' : 'input-container ';
    inputClass += styleClass ? styleClass : '';
    inputClass += validated ? '' : ' input-error';
    inputClass += +disable ? ' disabled' : '';
    inputClass += +isView ? ' view' : '';
    inputClass += hidden ? ' input-hidden' : '';

    const styleHeight = height ? parseInt(height) : 'auto';

    return (
      <div
        styleName={inputClass}
        onClick={e => this.input.focus()}
        style={{ height: styleHeight }}
      >
        {unit &&
        <span styleName={'unit' + (unitLeft ? ' unit-left' : '')}> {unit} </span>
        }

        {loading &&
        <div styleName="loading"></div>
        }

        {correct &&
        <div styleName="correct">
          <i className="fa fa-check-circle"></i>
        </div>
        }

        {incorrect &&
        <div styleName="incorrect">
          <i className="fa fa-times-circle"></i>
        </div>
        }

        {inputType !== 'textarea' && type !== 'textarea' && !hidden &&
        <input
          ref={e => this.input = e}
          className='input'
          styleName={unitLeft ? 'input-with-left' : ( unit && !noUnitPadding ? 'input-with-right' : '')}
          name={inputName}
          id={inputName}
          type={type || 'text'}
          placeholder={placeholder || ''}
          defaultValue={defaultValue || ''}
          maxLength={maxLength ? maxLength : 200}
          disabled={(disable || isView ) ? 'disabled' : ''}
          onKeyUp={this.handleKeyUp}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          autoComplete="off"
        />
        }

        {(inputType === 'textarea' || type === 'textarea') && !hidden &&
        <textarea
          style={{ resize: 'none' }}
          ref={e => this.input = e }
          className='input'
          name={inputName}
          id={inputName}
          type={type || 'text'}
          disabled={(disable || isView ) ? 'disabled' : ''}
          maxLength={maxLength ? maxLength : 100000}
          placeholder={placeholder || ''}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          defaultValue={defaultValue}
        />
        }

        {hidden &&
        <input ref="input" type="hidden" defaultValue={defaultValue} />
        }

        {!validated &&
        <div styleName="error-info">
          <div>{msg}</div>
        </div>
        }
      </div>
    );
  }

  handleKeyUp(e) {
    this.numberInputFilter();
  }

  handleFocus(e) {
    this.setState({ focus: true });

    this.props.onFocus && this.props.onFocus(this.getValue(), e);
  }

  handleBlur(e) {
    this.numberInputFilter();
    this.validate();
    this.setState({
      focus: false,
    });

    this.props.onBlur && this.props.onBlur(this.getValue(), e);
  }

  handleChange(e) {
    this.numberInputFilter();
    this.numberArrayFilter();
    this.validate();

    this.props.onChange && this.props.onChange(this.getValue(), e);
  }

  numberInputFilter() {
    const rules = this.state.rules || this.props.rules;

    if (!rules) return;
    if (rules && (rules.indexOf('number') === -1 && rules.indexOf('int') === -1)) return;

    const value = this.getValue();
    let newValue;
    if (rules.indexOf('number') !== -1) {
      newValue = FormValidation.filterNotNumber(value);
    } else {
      newValue = FormValidation.filterNotInt(value);
    }

    if (newValue != value) {
      this.setValue(newValue);
    }
  }

  numberArrayFilter() {
    const rules = this.state.rules || this.props.rules;

    if (!rules) return;
    if (rules && rules.indexOf('number_array') === -1) return;

    let value = this.getValue();
    let newValue = value;
    while (newValue.indexOf('，') !== -1) {
      newValue = newValue.replace('，', ',');
    }
    newValue = newValue.replace(/[^0-9\,]/ig, '');

    if (newValue !== value) {
      this.setValue(newValue);
    }
  }
}
