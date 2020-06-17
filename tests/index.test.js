import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import InputMonth from 'src/'

describe('Component', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('displays a welcome message', () => {
    render(<InputMonth />, node, () => {
      expect(node.childNodes[0].value).toContain('')
    })
  })
})
