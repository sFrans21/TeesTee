import { Link } from "react-router-dom";

import ProductCard from "../product-card/product-card.component";

import {
  CategoryPreviewContainer,
  CategoryPreviewTitle,
  Preview,
} from "./category-preview.styles";

// const CategoryPreview = ({ title, products }) => {
//   return (
//     <CategoryPreviewContainer>
//       <h2>
//         <Link to={title}>
//           <CategoryPreviewTitle>{title.toUpperCase()}</CategoryPreviewTitle>
//         </Link>
//       </h2>
//       <Preview>
//         {products
//           .filter((_, idx) => idx < 4)
//           .map((product) => {
//             return <ProductCard key={product.key} product={product} />;
//           })}
//       </Preview>
//     </CategoryPreviewContainer>
//   );
// };

const CategoryPreview = ({ categoriesMap }) => {
  if (!categoriesMap || typeof categoriesMap !== "object") {
    return <div>No categories available.</div>; // Render fallback jika data tidak tersedia
  }
  return (
    <>
      {Object.keys(categoriesMap).map((title) => (
        <CategoryPreviewContainer key={title}>
          <h2>
            <Link to={title}>
              <CategoryPreviewTitle>{title.toUpperCase()}</CategoryPreviewTitle>
            </Link>
          </h2>
          <Preview>
            {categoriesMap[title]
              .filter((_, idx) => idx < 4)
              .map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
          </Preview>
        </CategoryPreviewContainer>
      ))}
    </>
  );
};
export default CategoryPreview;
