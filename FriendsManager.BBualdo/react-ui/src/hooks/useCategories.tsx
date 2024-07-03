"use client";

import CategoriesService from "@/services/CategoriesService";
import CategoriesState from "@/state/CategoriesState";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const useCategories = () => {
  const [categories, setCategories] = useRecoilState(
    CategoriesState.categoriesState
  );
  const [error, setError] = useRecoilState(CategoriesState.errorState);
  const [isLoading, setIsLoading] = useRecoilState(
    CategoriesState.isLoadingState
  );

  useEffect(() => {
    const fetchCategories = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const categories = await CategoriesService.GetCategories();
        setCategories(categories);
      } catch (error) {
        setIsLoading(false);
        setError("Fetching categories failed!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, error, isLoading };
};

export default useCategories;
