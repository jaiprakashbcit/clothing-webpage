import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/categories.selector';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import './category.styles.scss';

function Category() {
  const { category } = useParams();

  const isLoading = useSelector(selectCategoriesIsLoading);
  const categoriesMap = useSelector(selectCategoriesMap);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <div className="category-container">
      <div className="category-header-container">
        <div className="back-container">
          <Link to="/shop">
            <span className="back-arrows">&#10094;&#10094;</span>
            <span className="back">back</span>
          </Link>
        </div>
        <h2 className="category-title">{category.toUpperCase()}</h2>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-products-container">
          {products &&
            products.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Category;
