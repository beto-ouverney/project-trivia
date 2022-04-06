import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      imgUrl: '',
    };
  }

  componentDidMount() {
    this.getPhoto();
  }

  getPhoto = () => {
    const { email } = this.props;
    const hash = md5(email).toString();
    const imgUrl = `https://www.gravatar.com/avatar/${hash}`;
    this.state({ imgUrl });
  }

  render() {
    const { imgUrl } = this.state;
    return (
      <div>
        Header
        <img src={ imgUrl } alt="" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = ({
  email: PropTypes.string,
}).isRequired;
