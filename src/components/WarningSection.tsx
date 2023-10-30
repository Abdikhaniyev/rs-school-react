import { Component, ReactNode } from 'react';
import './WarningSection.css';

interface Props {
  children: ReactNode | ReactNode[];
}

class WarningSection extends Component<Props> {
  render() {
    return (
      <div className="warning">
        <div className="container">{this.props.children}</div>
      </div>
    );
  }
}

export default WarningSection;
