import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CategoryPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import { fetchCategoriesStart } from "../../store/categories/category.action";
import { selectCategoriesMap } from "../../store/categories/category.selector";

const Shop = () => {
  const dispatch = useDispatch();
  const categoriesMap = useSelector(selectCategoriesMap);

  // useEffect(() => {
  //   const getCategoriesMap = async () => {
  //     dispatch(fetchCategoriesStart());
  //   };
  //   getCategoriesMap();
  // }, []);

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, [dispatch]);

  return (
    <Routes>
      <Route
        index
        element={<CategoryPreview categoriesMap={categoriesMap} />}
      />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
