import { Request, Response } from "express";
import createCategoryService from "../services/categories/createCategory.Service";
import listAllCategoryService from "../services/categories/listAllCategory.Service";
import listCategoryByRealEstateService from "../services/categories/listCategoryByRealEstate.Service";

const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData = req.body;
  const newCategory = await createCategoryService(categoryData);
  return res.status(201).json(newCategory);
};

const listCategoryByRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idCategory = +req.params.id;
  const listCategoryByRealEstate = await listCategoryByRealEstateService(
    idCategory
  );
  return res.json(listCategoryByRealEstate);
};

const listAllCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const listAllCategory = await listAllCategoryService();
  return res.json(listAllCategory);
};

export {
  createCategoryController,
  listCategoryByRealEstateController,
  listAllCategoryController,
};
