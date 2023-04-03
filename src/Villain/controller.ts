import { Request, Response } from "express";
import { Villain } from "./interfaces";


const villains: Villain[] = [];
let _id = 0;

export const getAll = (req: Request, res: Response) => {
    return res.json(villains);
}

export const getByName = (req: Request, res: Response) => {
    const alte = req.params.alte;

    const villain = villains.find((villain: Villain) => villain.alte.toLowerCase() === alte.toLowerCase())

    if (!villain) {
        return res.status(404).json(
            {
                message: 'Super Villain Not Found'
            }
        );
    }

    res.json(villain);
}

export const create = (req: Request, res: Response) => {

    const { alte, nombre } = req.body;
    const villain = villains.find((villain) => villain.alte === alte);

    if (villain) {
        return res.status(400).json(
            {
                message: `The villain ${alte} already exist`
            }
        )
    }

    _id += 1;
    const newVillain = {
        id: _id,
        nombre,
        alte
    };

    villains.push(newVillain);
    res.status(201).json(newVillain);
}

export const remove = (req: Request, res: Response) => {
    const { alte } = req.params;
    const index = villains.findIndex(
        (villain) =>
            villain.alte.toLowerCase() === alte.toLowerCase());

    if (index < 0) {
        return res.status(404).json(`The villain ${alte} not found`)
    }

    const villain = villains.splice(index, 1);

    res.json(villain);
}

export const update = (req: Request, res: Response) => {
    const { alte, nombre } = req.body;
    const { id } = req.params;

    const villain = villains.find((villain) => villain.id === Number.parseInt(id))

    if (!villain) {
        return res.status(401).json({
            message: `The villain ${alte} not found`
        })
    }

    villain.alte = alte !== undefined ? alte : villain.alte;
    villain.nombre = nombre !== undefined ? nombre : villain.alte;

    res.json(villain);
}