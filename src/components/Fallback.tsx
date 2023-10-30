import { Component, ReactNode } from 'react';
import './Fallback.css';

interface Props {
  children: ReactNode;
}

class Fallback extends Component<Props> {
  render() {
    return (
      <div className="fallback">
        <div className="container">{this.props.children}</div>
      </div>
    );
  }
}

export default Fallback;
