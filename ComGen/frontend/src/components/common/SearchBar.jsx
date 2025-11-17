import { useState } from 'prop-types';
import PropTypes from 'prop-types';
import { Search, X } from 'lucide-react';
import useDebounce from '../../hooks/useDebounce';
import './SearchBar.css';

const SearchBar = ({ 
  onSearch, 
  placeholder = 'Search products...', 
  debounceDelay = 300,
  className = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, debounceDelay);

  // Call onSearch when debounced value changes
  useState(() => {
    if (onSearch) {
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch, onSearch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <form 
      className={`search-bar ${className}`} 
      onSubmit={handleSubmit}
      role="search"
    >
      <div className="search-bar-wrapper">
        <Search className="search-bar-icon" size={20} aria-hidden="true" />
        
        <input
          type="search"
          className="search-bar-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
          aria-label="Search products"
        />
        
        {searchTerm && (
          <button
            type="button"
            className="search-bar-clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  debounceDelay: PropTypes.number,
  className: PropTypes.string
};

export default SearchBar;
