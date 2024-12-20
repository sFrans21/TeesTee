import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// export const selectCategoriesMap = createSelector(
//   [selectCategories],
//   (categories) => {
//     console.log("categories ", categories);
//     return (
//       categories &&
//       categories.reduce((acc, category) => {
//         const { title, items } = category;
//         acc[title.toLowerCase()] = items;
//         return acc;
//       }, {})
//     );
//   }
// );

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    if (!categories || categories.length === 0) return {}; // Pastikan selalu mengembalikan objek
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
