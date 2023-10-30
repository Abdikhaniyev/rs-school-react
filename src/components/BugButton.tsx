import { Component } from 'react';
import warningLogo from '../assets/warning.svg';
import './BugButton.css';

interface Props {}

interface State {
  clicked: boolean;
}

class BugButton extends Component<Props, State> {
  state = {
    clicked: false,
  };

  handleClick = () => {
    this.setState({ clicked: true });
  };

  render() {
    if (this.state.clicked) {
      throw new Error('Oh no you clicked me');
    }
    return (
      <button className="warning-button" onClick={this.handleClick}>
        <img src={warningLogo} alt="warning" />
        Don&apos;t click me
      </button>
    );
  }
}

export default BugButton;
