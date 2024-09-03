import { Request, Response } from "express";

/* el controlador será una clase que nos permita hacer inyección de dependencias y también tendrá todos los handlers */
export class AuthController {
  /* nuestro constructor será para poder hacer la inyección de dependencias */
  constructor() {}

  public loginUser = (request: Request, response: Response) => {
    return response.json("loginUser method");
  };

  public registerUser = (request: Request, response: Response) => {
    return response.json("registerUser method");
  };

  public validateEmailUser = (request: Request, response: Response) => {
    return response.json("validateEmailUser method");
  };
}
