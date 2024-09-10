export * from "./register-user.dto";
export * from "./login-user.dto";

/* ---- INFORMACIÓN ADICIONAL PARA ENTENDER UN DTO vs ENTITY ---- */
/* Un objeto de transferencia de datos (DTO) es un objeto que transporta datos entre procesos. Puede utilizar esta técnica para facilitar la comunicación entre dos sistemas (como una API y su servidor) sin exponer potencialmente información confidencial */
/* por ejemplo: es posible que necesite el nombre y la foto de un empleado para ingresar a su empresa. Debe proporcionar esos datos para que se realice una comparación, pero no necesita proporcionar otra información sobre el empleado que tenga en su base de datos. Una DTO puede transferir solo la información requerida */
/* Un DTO solo debe contener datos, no lógica empresarial. Es algo simple y pequeño que debe realizar una sola tarea. Una buena DTO :

  - Minimiza el texto repetitivo -> Escribirás cada uno de ellos desde cero.
  - Debe ser fácil de crear -> Los DTO no deben ser tan complicados que te cueste escribirlos (un código como este es fácil de descifrar).
  - Sea legible -> Cualquiera debería poder analizar su código.
*/

/* La diferencia entre un DTO y una entidad es que el DTO es un objeto que se utiliza para encapsular datos y enviarlos de un sistema a otro, por ejemplo, un LoginUserDto se encargaría de validar los datos de inicio de sesión antes de que se utilicen. Por otro lado, una entidad, como UserEntity, es un objeto que no solo contiene datos, sino también comportamiento, en este caso, UserEntity representa a un usuario en nuestro sistema. En pocas palabras, un DTO es qué información va a fluir entre un sistema y otro y un Entity es cómo va a lucir una entidad como, por ejemplo, un usuario en nuestro sistema */

/* Un DTO es un objeto que se utiliza para transferir datos entre diferentes capas de una aplicación, como entre el frontend y el backend. El propósito de un DTO es asegurar que los datos transferidos estén en el formato correcto y cumplan con ciertas reglas de validación. Esto puede ayudar a prevenir errores y garantizar que los datos sean consistentes en toda la aplicación. Por otro lado, una entidad es un objeto que representa un concepto u objeto específico en el dominio de la aplicación. Las entidades suelen tener sus propias reglas y restricciones de validación, que pueden ser diferentes de las de un DTO. Por ejemplo, una entidad puede tener restricciones o reglas de validación adicionales que sean específicas de la lógica de negocios de la aplicación */

/* ---- EJEMPLO USANDO Zod ---- */
/* también se puede utilizar Zod, en vez de crear un DTO podemos crear un schema donde poner todas las validaciones minimas para crear un TODO por ejemplo: https://dev.to/osalumense/validating-request-data-in-expressjs-using-zod-a-comprehensive-guide-3a0j */

/* una opcion de middleware validando con zod lo pueden utlizar llamando al metodo donde definen la ruta, utiliza zod como validacion:

router.post(
  `${this.mainRoute}/create`,
  [validate(createUserSchema)],
  userController.create
);



import { ApiResponse } from "@src/domain/wrappers/response";
import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(
          ApiResponse.badRequest({
            message: "Ha ocurrido un error al validar los datos",
            errors: error.issues.map((issue) => {
              return issue.message;
            }),
          })
        );
      }
    }
  };



import * as z from "zod";

export const createUserSchema = z.object({
  body: z.object({
    googleId: z.string({
      required_error: "El usuario de google es requerido",
    }),
    firstName: z.string({
      required_error: "El nombre es requerido",
    }),
    lastName: z.string({
      required_error: "El apellido es requerido",
    }),
    email: z
      .string({
        required_error: "El email es requerido",
      })
      .email("Email no valido"),
    imageUrl: z.string({
      required_error: "La imagen es requerida",
    }),
    rolId: z.string({
      required_error: "El rol es requerido",
    }),
    generalStatusId: z.number({
      required_error: "El estado general es requerido",
    }),
    password: z.string({
      required_error: "La contraseña es requerida",
    }),
    confirmPassword: z.string({
      required_error: "La confirmación de la contraseña es requerida",
    }),
  }),
});
*/
