import React, {Component} from 'react'
import {render} from 'react-dom'

import MeasureRender from '../../src/lib/measure-render'

class Demo extends Component {
  render() {
    return <MeasureRender>
      <h1>kms-web-components Demo</h1>
    </MeasureRender>
  }
}

render(<Demo/>, document.querySelector('#demo'))
