import React from 'react';
import PropTypes from 'prop-types';
import '../styles/BackgroundVideo.css';
import Background from '../assets/Background.mp4';

const BackgroundVideo = ({ fallbackText = 'Your browser does not support the video tag.' }) => {
  return (
    <video className="background-video" autoPlay loop muted playsInline>
      <source src={Background} type="video/mp4" />
      {fallbackText}
    </video>
  );
};

BackgroundVideo.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  fallbackText: PropTypes.string,
};

export default BackgroundVideo;
