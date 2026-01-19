import PropTypes from 'prop-types';
import { getEcoRatingConfig } from '../utils/helpers';

const CarbonBadge = ({ carbonImpact, ecoRating, size = 'medium', showLabel = true }) => {
  const config = getEcoRatingConfig(ecoRating);
  
  const sizeClasses = {
    small: 'px-2 py-1 text-xs gap-1',
    medium: 'px-3 py-2 text-sm gap-2',
    large: 'px-4 py-3 text-base gap-2',
  };

  const iconSizes = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-xl',
  };

  const valueSizes = {
    small: 'text-xs',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <div 
      className={`inline-flex items-center rounded-lg border-2 font-semibold transition-all hover:transform hover:-translate-y-0.5 hover:shadow-md ${sizeClasses[size]}`}
      style={{ 
        backgroundColor: config.bgColor,
        borderColor: config.color,
      }}
    >
      <span className={`leading-none ${iconSizes[size]}`} style={{ color: config.color }}>
        {config.icon}
      </span>
      
      <div className="flex flex-col gap-0.5">
        <span className={`font-bold leading-none ${valueSizes[size]}`} style={{ color: config.color }}>
          {carbonImpact.toFixed(2)} kg
        </span>
        
        {showLabel && (
          <span className="text-[0.7rem] text-gray-500 uppercase tracking-wider">CO₂e</span>
        )}
      </div>
    </div>
  );
};

CarbonBadge.propTypes = {
  carbonImpact: PropTypes.number.isRequired,
  ecoRating: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  showLabel: PropTypes.bool,
};

export default CarbonBadge;
