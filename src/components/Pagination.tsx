import { Component } from 'react';
import leftIcon from '../assets/left.svg';
import rightIcon from '../assets/right.svg';
import './Pagination.css';

interface Props {
  count: number;
  current: number;
  pages: number;
  onChange: (page: number) => void;
}

interface State {
  inputValue: string;
  start: number;
  end: number;
  pagesArray: number[];
}

export class Pagination extends Component<Props, State> {
  state = {
    start: this.props.current < 6 ? 1 : this.props.current - 5,
    end: this.props.current < 6 ? 10 : this.props.current + 4,
    pagesArray: [],
    inputValue: '',
  };

  generatePagesArray = () => {
    const { start, end } = this.state;
    const { pages } = this.props;

    const pagesArray = [];
    for (let i = start; i <= end; i++) {
      if (i > pages) break;
      pagesArray.push(i);
    }

    this.setState({ pagesArray });
  };

  componentDidMount(): void {
    this.generatePagesArray();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.current !== this.props.current || prevProps.count !== this.props.count) {
      this.setState(
        {
          start: this.props.current < 6 ? 1 : this.props.current - 5,
          end: this.props.current < 6 ? 10 : this.props.current + 4,
        },
        () => this.generatePagesArray()
      );
    }
  }

  render() {
    const { current, pages, onChange } = this.props;
    const { pagesArray } = this.state;

    return (
      <div className="pagination-container">
        <ul className="pagination">
          {current > 1 && (
            <li className="pagination__item" onClick={() => onChange(current - 1)}>
              <img src={leftIcon} alt="prev" />
            </li>
          )}
          {pagesArray.map((page) => (
            <li
              key={page}
              className={`pagination__item ${page === current ? 'active' : ''}`}
              onClick={() => onChange(page)}
            >
              {page}
            </li>
          ))}
          {current < pages && (
            <li className="pagination__item">
              <img src={rightIcon} alt="next" />
            </li>
          )}
        </ul>

        <p>
          Showing {current} of {pages} pages
        </p>

        <input
          type="number"
          placeholder="Go to page"
          min={1}
          max={pages}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value && value > 0 && value <= pages) {
              this.setState({ inputValue: e.target.value });
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onChange(parseInt(this.state.inputValue));
            }
          }}
        />
      </div>
    );
  }
}

export default Pagination;
