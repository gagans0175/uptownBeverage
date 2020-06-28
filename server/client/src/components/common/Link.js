import React from 'react';
import PropTypes from 'prop-types';

class Link extends React.Component {
  render() {
    let baseClass = '';
    if (!this.props.defaulttextDecorationUnderLine) {
      baseClass = 'textDecorationNone';
    }
    const className = `${baseClass} ${this.props.className}`.trim();
    const { style, children, roleButton, tabIndexSkip } = this.props;
    return (
      // eslint-disable-next-line
      <a
        style={style}
        className={className}
        role={roleButton ? 'button' : 'link'}
        tabIndex={tabIndexSkip ? '-1' : '0'}
        aria-label={this.props.ariaLabel}
        onKeyDown={(e) => {
          if (e.keyCode === 13 || e.keyCode === 32) {
            e.preventDefault();
            this.props.clickFn();
          }
        }}
        onClick={(e) => {
          e.preventDefault();
          this.props.clickFn();
        }}
        id={this.props.id}
      >{children}</a>
    );
  }
}

Link.defaultProps = {
  style: {},
  className: '',
  children: 'Link',
  clickFn: () => { },
  ariaLabel: '',
  id: null,
  analyticstrack: '',
  defaulttextDecorationUnderLine: true
};

Link.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
  clickFn: PropTypes.func,
  ariaLabel: PropTypes.string,
  id: PropTypes.string,
  analyticstrack: PropTypes.string,
  defaulttextDecorationUnderLine: PropTypes.bool,
  roleButton: PropTypes.bool,
  tabIndexSkip: PropTypes.bool,
};

export default Link;