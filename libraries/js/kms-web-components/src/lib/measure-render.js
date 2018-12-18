import React from 'react'

class MeasureRender extends React.Component {
  constructor() {
    super();
    this.mounted = false;
    this.isServer = typeof(window) === 'undefined'
  }

  render() {
    if (!this.isServer) {
      const { name } = this.props;
      if (this.mounted) {
        window.performance.mark(`${name}UpdateStart`);
      } else {
        window.performance.mark(`${name}MountStart`);
      }
    }    
    return this.props.children;
  }

  componentDidMount() {
    if (!this.isServer) {
      const { name } = this.props;
      this.mounted = true;
      window.performance.mark(`${name}MountEnd`);
      window.performance.measure(`${name}Mount`, `${name}MountStart`, `${name}MountEnd`);
    }
  }

  componentDidUpdate() {
    if (!this.isServer) {
      const { name } = this.props;
      window.performance.mark(`${name}UpdateEnd`);
      window.performance.measure(`${name}Update`, `${name}UpdateStart`, `${name}UpdateEnd`);
    }
  }
}

export default MeasureRender
