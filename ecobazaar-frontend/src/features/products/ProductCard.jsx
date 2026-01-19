import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import CarbonBadge from '../../components/CarbonBadge';
import EcoRatingBadge from '../../components/EcoRatingBadge';
import { formatPrice, truncateText, getProductImageUrl } from '../../utils/helpers';

const ProductCard = ({ product, showActions = false, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit && onEdit(product);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete && onDelete(product);
  };

  const imageUrl = imageError 
    ? getProductImageUrl(null, product.category) 
    : getProductImageUrl(product.imageUrl, product.category);

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full"
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={handleImageError}
        />
        
        {/* Eco-Certified Badge */}
        {product.ecoCertified && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md">
            <span className="bg-white text-green-500 rounded-full w-4.5 h-4.5 flex items-center justify-center text-[0.7rem] font-black">✓</span>
            Eco-Certified
          </div>
        )}
        
        {/* Approval Status (for seller view) */}
        {showActions && (
          <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-lg text-xs font-bold shadow-md ${
            product.approved ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
          }`}>
            {product.approved ? '✓ Approved' : '⏳ Pending'}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Category */}
        <span className="text-xs text-gray-500 uppercase font-semibold tracking-wide">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 leading-tight min-h-[2.8rem]">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed flex-1">
          {truncateText(product.description, 80)}
        </p>

        {/* Eco Rating */}
        <div className="my-2">
          <EcoRatingBadge ecoRating={product.ecoRating} />
        </div>

        {/* Carbon Badge */}
        <div className="flex justify-start">
          <CarbonBadge
            carbonImpact={product.carbonImpact}
            ecoRating={product.ecoRating}
            size="small"
          />
        </div>

        {/* Price & Stock */}
        <div className="flex justify-between items-end pt-3 border-t border-gray-200 mt-auto">
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-extrabold text-green-500">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-gray-500">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          {/* Action Buttons for Seller */}
          {showActions && (
            <div className="flex gap-2">
              <button
                className="p-2 rounded-md text-xl transition-all hover:scale-110 hover:bg-blue-50"
                onClick={handleEdit}
                title="Edit Product"
              >
                ✏️
              </button>
              <button
                className="p-2 rounded-md text-xl transition-all hover:scale-110 hover:bg-red-50"
                onClick={handleDelete}
                title="Delete Product"
              >
                🗑️
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number,
    carbonImpact: PropTypes.number.isRequired,
    ecoRating: PropTypes.string.isRequired,
    ecoCertified: PropTypes.bool,
    approved: PropTypes.bool,
    imageUrl: PropTypes.string,
  }).isRequired,
  showActions: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ProductCard;
