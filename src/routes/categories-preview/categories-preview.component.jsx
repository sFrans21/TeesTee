import { Fragment } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

import CategoryPreview from "../../compoments/category-preview/category-preview.component";
import Spinner from "../../compoments/spinner/spinner.component";

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/category.selector";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  if (isLoading) {
    return <Spinner />;
  }

  if (!categoriesMap || typeof categoriesMap !== "object") {
    return <div>No data available.</div>; // Fallback jika data tidak ada
  }

  // return (
  //   <Fragment>
  //     {isLoading ? (
  //       <Spinner />
  //     ) : (
  //       categoriesMap &&
  //       Object.keys(categoriesMap).map((title) => {
  //         const products = categoriesMap[title];
  //         return (
  //           <CategoryPreview key={title} title={title} products={products} />
  //         );
  //       })
  //     )}
  //   </Fragment>
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
