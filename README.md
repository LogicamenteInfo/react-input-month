# React-Input-Month

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]

This is a React component that enables the use of inputs with month type in
browsers that does not support it nativelly.

For a demo, run `yarn start`.

## Installation

```bash
$ npm i -S @logicamente.info/react-input-month # NPM user
$ yarn add @logicamente.info/react-input-month # NPM user
```

## Usage

```js
import React from 'react';
import InputMonth from '@logicamente.info/react-input-month';

export default class Demo extends React.Component {
  render() {
    return (
      <InputMonth
        required        // Default: false
        lang={"pt-BR"}  // Default: en-US
        value={this.state.month}
        onChange={(e) => this.setState({ month: e.target.value })}>
    );
  }
}
```

[build-badge]: https://img.shields.io/travis/logicamenteinfo/react-input-month/master.png?style=flat-square
[build]: https://travis-ci.org/logicamenteinfo/react-input-month

[npm-badge]: https://img.shields.io/npm/v/@logicamente.info/react-input-month.png?style=flat-square
[npm]: https://www.npmjs.org/@logicamente.info/react-input-month