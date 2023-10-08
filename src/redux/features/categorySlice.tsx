import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CategoryProps } from "../../types";

type CategoryState = {
  categories: CategoryProps[];
};

const initialState = {
  categories: [],
} as CategoryState;

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    createCategory: (state, action: PayloadAction<{ id: number | null; value: string }>) => {
      const createCategory = (parentId: number | null, value: string) => {
        const newCategory: CategoryProps = {
          id: Date.now(),
          value,
          isEdit: false,
          children: [],
        };

        if (parentId === null) {
          state.categories.push(newCategory);
        } else {
          const parentCategory = findCategory(state.categories, parentId);
          if (parentCategory) {
            parentCategory.children.push(newCategory);
          }
        }
      };

      const findCategory = (categories: CategoryProps[], id: number): CategoryProps | null => {
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].id === id) {
            return categories[i];
          } else if (categories[i].children && categories[i].children.length > 0) {
            const result = findCategory(categories[i].children, id);
            if (result) {
              return result;
            }
          }
        }
        return null;
      };

      if (action.payload.id === null) {
        createCategory(null, action.payload.value);
      } else {
        const parentCategory = findCategory(state.categories, action.payload.id);
        if (parentCategory!) {
          createCategory(action.payload.id, action.payload.value);
        }
      }
    },

    updateCategory: (state, action: PayloadAction<{ id: number; value: string }>) => {
      const updateRecursive = (categories: CategoryProps[]): CategoryProps[] => {
        return categories.map((category) => {
          if (category.id === action.payload.id) {
            return { ...category, value: action.payload.value, isEdit: false };
          }
          if (category.children && category.children.length > 0) {
            return {
              ...category,
              children: updateRecursive(category.children),
            };
          }
          return category;
        });
      };

      const updatedCategories = updateRecursive(state.categories);
      state.categories = updatedCategories;
    },

    editForm: (state, action: PayloadAction<number>) => {
      const editFormRecursiveFunction = (categories: CategoryProps[]): CategoryProps[] => {
        return categories.map((category) => {
          if (category.id === action.payload) {
            return { ...category, isEdit: !category.isEdit };
          } else if (category.children && category.children.length > 0) {
            return {
              ...category,
              children: editFormRecursiveFunction(category.children),
            };
          }
          return category;
        });
      };

      state.categories = editFormRecursiveFunction(state.categories);
    },

    deleteCategory: (state, action: PayloadAction<number>) => {
      const deleteRecursiveFunction = (id: number, data: CategoryProps[]) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === id) {
            data.splice(i, 1);
            return true;
          } else if (data[i].children && data[i].children.length > 0) {
            if (deleteRecursiveFunction(id, data[i].children)) {
              return true;
            }
          }
        }
        return false;
      };

      const updatedCategories = [...state.categories];
      if (deleteRecursiveFunction(action.payload, updatedCategories)) {
        state.categories = updatedCategories;
      }
    },
  },
});

export const { createCategory, updateCategory, editForm, deleteCategory } = categorySlice.actions

export default categorySlice.reducer;