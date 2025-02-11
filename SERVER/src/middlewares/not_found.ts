import { ErrorRequestHandler } from "express";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Not_Found: ErrorRequestHandler = ( error, req, res, next ) => {
    console.error(`PATH: ${req.path}`, error);
    res.status(404).send('Ruta no encontrada')
}
export default Not_Found