import React, { Component } from 'react'
import { render } from 'react-dom'

import InputMonth from '../../src/InputMonth'

export default class Demo extends Component {
  state = {
    monthInitial: '2020-06',
  }

  render() {
    return <div>
      <h1>react-input-month Demo</h1>

      <form>
        <label><b>Month</b></label>
        <InputMonth
          value={this.state.month}
          onChange={(month) => this.setState({ month })}
        />
        <p>Value: {this.state.month}</p>
      </form>

      <form>
        <label><b>Month (initial)</b></label>
        <InputMonth
          value={this.state.monthInitial}
          onChange={(monthInitial) => this.setState({ monthInitial })}
        />
        <p>Value: {this.state.monthInitial}</p>
      </form>

      <form>
        <label><b>Month (required)</b></label>
        <InputMonth
          required
          value={this.state.monthRequired}
          onChange={(monthRequired) => this.setState({ monthRequired })}
        />
        <p>Value: {this.state.monthRequired}</p>
      </form>

      <form>
        <label><b>Month (injected)</b></label>
        <InputMonth
          required
          value={this.state.monthInjected}
          onChange={(monthInjected) => this.setState({ monthInjected })}
        />
        <button type="button" onClick={() => this.setState({ monthInjected: '2020-06' })}>Inject</button>
        <p>Value: {this.state.monthInjected}</p>
      </form>

      <form>
        <label><b>Month (pt-BR)</b></label>
        <InputMonth
          lang="pt-BR"
          value={this.state.monthBR}
          onChange={(monthBR) => this.setState({ monthBR })}
        />
        <p>Value: {this.state.monthBR}</p>
      </form>
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
