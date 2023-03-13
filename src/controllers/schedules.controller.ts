import { Request, Response } from "express";
import createScheduleService from "../services/schedules/createSchedule.Service";
import listSchedulesByRealEstateService from "../services/schedules/listSchedulesByRealEstate.Service";

const createScheduleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idUser = req.user.id;
  const schedulesData = req.body;
  await createScheduleService(idUser, schedulesData);
  return res.status(201).json({ message: "Schedule created" });
};

const listSchedulesByRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idSChedules = +req.params.id;
  const listSchedulesByRealEstate = await listSchedulesByRealEstateService(
    idSChedules
  );
  return res.json(listSchedulesByRealEstate);
};

export { createScheduleController, listSchedulesByRealEstateController };
