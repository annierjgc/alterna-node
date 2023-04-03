import { Router } from "express";
import { getAll, getByName, create, remove, update } from "./controller";

export const villainRoute = Router();

villainRoute.get('/', getAll);

villainRoute.get('/:alte', getByName);

villainRoute.post('/', create);

villainRoute.delete('/:alte', remove);

villainRoute.put('/:id', update);