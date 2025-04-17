import { Link } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';

import './category-preview.styles.scss';

function CategoryPreview({ title, products }) {
  return (
    <div className="category-preview-container">
      <div className="category-preview-header">
        <h2>
          {/* this is where the string for the dynamic url param ':category' comes from */}
          {/* example: const { category } = useParams();  */}
          {/* if the user selects 'hats', category will return hats */}
          <Link to={`${title}`}>
            <span className="title">{title.toUpperCase()}</span>
          </Link>
        </h2>
        <div className="see-more-container">
          {/* this is where the string for the dynamic url param ':category' comes from */}
          {/* example: const { category } = useParams();  */}
          {/* if the user selects 'hats', category will return hats */}
          <Link to={`${title}`}>
            <span className="see-more">see more</span>
            <span className="see-more-arrows">&#10095;&#10095;</span>
          </Link>
        </div>
      </div>
      <div className="preview">
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
      </div>
    </div>
  );
}

export default CategoryPreview;
