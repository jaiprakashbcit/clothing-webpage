import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { fetchCategories } from '../../store/categories/categories.slice';

import CategoriesPreview from '../categories-preview/categories-preview.route';
import Category from '../category/category.route';

function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Routes>
        <Route
          index
          element={<CategoriesPreview />}
        />
        <Route
          // gets the category title for path from the 'Link' component in category-preview.component
          path=":category"
          element={<Category />}
        />
      </Routes>
    </div>
  );
}

export default Shop;
