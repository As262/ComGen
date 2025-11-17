import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ 
  children, 
  hover = false,
  clickable = false,
  className = '',
  onClick,
  ...props 
}) => {
  const cardClasses = `
    card
    ${hover ? 'card-hover' : ''}
    ${clickable ? 'card-clickable' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  const handleKeyPress = (e) => {
    if (clickable && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={cardClasses}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  hover: PropTypes.bool,
  clickable: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Card;
