import { NextFunction, Request, Response } from "express";

export class FileUploadMiddleware {
  static containFiles(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    if (!request.files || Object.keys(request.files).length === 0) {
      return response.status(400).json({ error: "No files were selected" });
    }

    /* recordar que si se envía un solo archivo entonces se recibe un objeto y si son varios archivos se recibe un arreglo pero es un poco incómodo trabajarlo así y se tendrían que implementar más código o validaciones entonces se está haciendo esta validación para que si se envía un solo archivo o varios archivos siempre sea un arreglo lo que venga del -- request.files.file -- */
    /* IMPORTANTE: ese nombre "file" es porque esa es su key entonces se tendría que enviar de esa forma o con ese nombre, pero se puede colocar otro nombre como "archivo" o "fileToUpload", etc siempre y cuando en el frontend también se envíe de la misma forma */
    if (!Array.isArray(request.files.file)) {
      /* aquí sería que viene un solo archivo entonces por eso se le coloca como dentro de un arreglo */
      request.body.files = [request.files.file];
    } else {
      /* aquí ya viene como un arreglo entonces por eso se deja tal cual llega */
      request.body.files = request.files.file;
    }

    next();
  }
}
