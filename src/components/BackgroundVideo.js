import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/BackgroundVideo.css';
import Background from '../assets/Background.mp4';

const BackgroundVideo = ({ fallbackText = 'Your browser does not support the video tag.' }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const videoElement = document.querySelector('.background-video');
    if (videoElement) {
      videoElement.addEventListener('canplay', () => setVideoLoaded(true));
      videoElement.addEventListener('error', () => setVideoLoaded(false));
    }
  }, []);

  return videoLoaded ? (
    <video className="background-video" autoPlay loop muted playsInline>
      <source src={Background} type="video/mp4" />
      {fallbackText}
    </video>
  ) : (
    <div className="fallback-message">Loading background...</div>
  );
};

BackgroundVideo.propTypes = {
  fallbackText: PropTypes.string,
};

export default BackgroundVideo;
