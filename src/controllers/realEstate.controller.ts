import { Request, Response } from "express";
import createRealEstateService from "../services/realEstate/createRealEstate.Service";
import listAllRealEstateService from "../services/realEstate/listAllRealEstate.Service";

const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const RealEstate = req.body;
  const newRealEstate = await createRealEstateService(RealEstate);
  return res.status(201).json(newRealEstate);
};

const listAllRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const listRealEstate = await listAllRealEstateService();
  return res.json(listRealEstate);
};

export { createRealEstateController, listAllRealEstateController };
