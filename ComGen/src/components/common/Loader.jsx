import PropTypes from 'prop-types';
import './Loader.css';

const Loader = ({ 
  size = 'medium', 
  fullScreen = false,
  text = 'Loading...',
  showText = true 
}) => {
  if (fullScreen) {
    return (
      <div className="loader-fullscreen">
        <div className={`loader loader-${size}`} role="status" aria-label="Loading">
          <span className="sr-only">{text}</span>
        </div>
        {showText && <p className="loader-text">{text}</p>}
      </div>
    );
  }

  return (
    <div className="loader-container">
      <div className={`loader loader-${size}`} role="status" aria-label="Loading">
        <span className="sr-only">{text}</span>
      </div>
      {showText && <p className="loader-text">{text}</p>}
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullScreen: PropTypes.bool,
  text: PropTypes.string,
  showText: PropTypes.bool
};

export default Loader;
