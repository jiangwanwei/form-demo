import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'

import './assets/font-awesome/css/font-awesome.scss';
import './assets/scss/global.scss';

import Layout from './layout'
import Form from './pages/form'

function appRender() {
  render((
    <Layout>
      <Form />
    </Layout>
  ), document.getElementById('app'))
}

appRender()

