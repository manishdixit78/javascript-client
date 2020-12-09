import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PUBLIC_IMAGE_FOLDER, DEFAULT_BANNER_IMAGE, total } from '../../config/constants';
import Img from './style';
import { getRandomNumber, getNextRoundRobin } from '../../libs/utils/math';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: -1,

    };
  }

  componentDidMount = () => {
    const { random, duration } = this.props;
    let { current } = this.state;
    this.id = setInterval(() => {
      if (random) {
        current = getRandomNumber(total);
      } else {
        current = getNextRoundRobin(current, total);
      }
      this.setState({ current });
    }, duration);
  }

  componentWillUnmount = () => {
    clearInterval(this.id);
  }

  render() {
    const { current } = this.state;
    const {
      altText, height, duration, banner,
    } = this.props;
    const { defaultbanner } = this.props;
    if (current === -1 || banner.length === 0) {
      return (
        <>
          <div align="center">
            <Img src={`${defaultbanner}`} alt={altText} height={height} duration={duration} />
          </div>
        </>
      );
    }
    return (
      <>
        <div align="center">
          <Img src={`${PUBLIC_IMAGE_FOLDER}${banner[current]}`} alt={altText} height={height} duration={duration} />
        </div>
      </>
    );
  }
}
export default Slider;
Slider.propTypes = {
  altText: PropTypes.string,
  banner: PropTypes.arrayOf(PropTypes.string),
  defaultbanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};
Slider.defaultProps = {
  altText: 'default banner',
  banner: [],
  defaultbanner: DEFAULT_BANNER_IMAGE,
  duration: 2000,
  height: 200,
  random: false,
};
