import jwt from "jsonwebtoken";
import { envs } from "./envs.plugin";

/* la semilla o seed para poder firmar nuestros tokens lo cual es muy importante y si se compromete o se ve afectada, entonces tenemos que cambiarla porque significa que cualquier persona que conozca la semilla o seed, puede generar tokens firmados como si hubiera sido nuestro backend. Esto vamos a usar para poder generar y firmar los tokens y esa misma semilla es la que se usará para verificar si esta misma semilla está presente en el token */
/* sería bueno que no esté definido en el mismo archivo porque generaría una dependencia oculta, entonces si no se quiere generar esa dependencia oculta, se podría colocar para recibirlo en el generateToken(......) o sino usar un constructor pero tendríamos que quitar lo métodos estáticos y crearlo como un método público normal pero en este caso se creará aquí afuera de la clase al menos para indicarle al desarrollador que se está haciendo uso de alguna variable del exterior */
const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {
  /* si no se trabajará con la inyección de dependencias, es decir, usando el constructor para inyectar, entonces se puede trabajar con métodos estáticos */
  /* se coloca payload: any para que el método sea lo suficientemente flexible para que pueda recibir cualquier cosa, como string, objetos, etc o si no también se puede usar un tipo en específico */
  static async generateToken(payload: any, duration: string = "2h") {
    /* la función .sign(......) es una función que regresa un callback pero es un poco incómodo trabajarlo así, porque si por ejemplo queremos suscribirnos o escuchar cuando ya se tiene el valor hacerlo es un poco complicado, y por eso vamos a trabajarlo con promesas y en este caso lo trabajaremos solo con el resolve y no con el reject. Ahora se tiene una función que va a regresar siempre una promesa y dentro de esa promesa se ejecutará el proceso */
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (error, token) => {
        /* aquí se podría mandar el reject de la promesa, pero retornaremos un resolve(null) */
        if (error) return resolve(null);

        /* aquí se retorna el resolve con el token. Se puede colocar el return o no, porque como es la última línea de código, entonces no habría problema, pero igual se está colocando */
        return resolve(token);
      });
    });
  }

  /* se colocará como un genérico para que regrese el tipo según lo que se le está enviando, porque si no entonces regresaría -- Promise<unknown> -- lo que no estaría mal pero sería mejor tenerlo tipado y lo haremos como un genérico. Otra forma también puede ser como lo colocamos en -- const { email } = payloadToken as { email: string };  -- */
  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      /* el decoded vendría a ser lo que sea que nosotros hayamos firmado en el token en su payload */
      jwt.verify(token, JWT_SEED, (error, decoded) => {
        /* aquí se podría mandar el reject de la promesa, pero retornaremos un resolve(null). Es decir, la promesa siempre se va a resolver de manera exitosa pero con un null si hay un error */
        if (error) return resolve(null);

        /* aquí se retorna el resolve con el decoded. Se puede colocar el return o no, porque como es la última línea de código, entonces no habría problema, pero igual se está colocando */
        return resolve(decoded as T); // colocaremos as T para que trate el valor de decoded como el mismo tipo de dato que se le está enviando, porque sino nos dará un warning
      });
    });
  }
}

/* JWT (JSON Web Token) es un estándar abierto para transmitir información entre dos partes de forma segura y compacta, en formato JSON. Este token se utiliza principalmente para autenticar usuarios y asegurar que las comunicaciones entre el cliente y el servidor sean confiables. Es muy popular en aplicaciones web modernas y APIs, y su principal ventaja es que es auto-contenido, lo que significa que lleva consigo toda la información que necesita */

/* Un JWT está compuesto por tres partes separadas por puntos (.):

- Header (Encabezado):
  Contiene el tipo de token (en este caso, JWT) y el algoritmo de firma que se utiliza (por ejemplo, HS256 para HMAC con SHA-256 o RS256 para RSA con SHA-256).

- Payload (Cuerpo de datos):
  Contiene las afirmaciones o "claims", que son la información que quieres transmitir, como el identificador de usuario, roles, permisos, y otra información necesaria. Estos datos no están cifrados, pero sí firmados, lo que significa que no se pueden alterar sin invalidar el token.

  - Algunos claims son estándar:
    - iss: Emisor del token.
    - sub: Asunto del token (generalmente el ID del usuario).
    - exp: Fecha de expiración del token (en formato UNIX timestamp).
    - iat: Fecha de emisión.

- Signature (Firma):
  Es la parte más importante, ya que asegura la integridad del token. Se crea combinando el header codificado en Base64, el payload codificado en Base64, una clave secreta (en el caso de HMAC) o una clave privada (en el caso de RSA), y el algoritmo de firma especificado en el header. La firma garantiza que el token no ha sido alterado desde su creación. Si alguien intenta modificar el payload o el header, la firma ya no coincidirá, y el token será inválido.
*/

/* Funcionamiento de JWT en un flujo de autenticación:

- Autenticación inicial:
  - El usuario envía sus credenciales (por ejemplo, nombre de usuario y contraseña) al servidor.
  - El servidor verifica las credenciales y, si son correctas, genera un JWT y lo envía al cliente como respuesta.

- Uso del JWT:
  - En las solicitudes subsecuentes, el cliente envía el JWT al servidor (generalmente en el header Authorization: Bearer <token>).
  - El servidor verifica la firma del JWT usando la clave secreta o pública.
  - Si la firma es válida, el servidor considera al usuario autenticado y realiza las acciones correspondientes.

- Validación y expiración:
  - El servidor puede verificar si el token ha expirado usando el campo exp.
  - Si el token es válido y no ha expirado, el servidor acepta la solicitud.
*/

/* Consideraciones de seguridad:

- Firma y claves seguras: Es crucial utilizar claves seguras y complejas para la firma de los tokens. En el caso de usar RSA, la clave privada debe estar bien protegida.

- Transmisión segura: Como el payload no está cifrado, cualquier persona que capture el token puede ver su contenido. Por esta razón, es recomendable usar JWT solo sobre HTTPS para evitar la interceptación en redes inseguras.

- Corta expiración: Dado que un JWT no se puede invalidar hasta que expire, es recomendable tener un tiempo de expiración corto (exp) para minimizar el impacto en caso de que el token sea robado.
*/
