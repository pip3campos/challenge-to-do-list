import { Request, Response } from "express";

const Not_Found = (req: Request, res: Response) => {
    console.error(`404 Not Found: ${req.path}`);
    res.status(404).json({ error: 'Route not found' });
};

export default Not_Found;