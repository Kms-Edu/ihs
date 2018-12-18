import * as React from 'react'
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'

const LaTeX = 'We give illustrations for the three processes $e^+e^-$, gluon-gluon and $\\gamma\\gamma \\to W t\\bar b$.'
class Example extends React.Component {
  render () {
    return (
      <Latex>{LaTeX}</Latex>
    )
  }
}

export default Example