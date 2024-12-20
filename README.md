# Node TypeScript Express - Auth App

---

## Parte I:

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

En este proyecto trabajaremos de otra forma con puramente inyección de dependencias, lo cual puede ser un poco más facil que implementar el patrón repositorio, pero igual sí aplicaremos la división de responsabilidades. En esta sección nos vamos a enfocar en la creación de usuarios para nuestra aplicación, por lo cual tenemos que:

- Preparar la base de datos
- Encriptar mediante un hash de unas sola vía las contraseñas
- Generar los tokens de acceso (JWT)
  - Para que de manera pasiva podamos tomar ese token y saber qué usuario es
- Preparar todo el backend

La idea del proyecto es poder crear un usuario mediante un registro, usaremos los conceptos de los DTOs para recibir la información y luego transformarla a lo que necesitamos, mostrar errores y tener errores personalizados con diferentes tipos de constructores (podría verse como un factory constructor porque con solo llamar a ese método estático nos va a regresar nuestra instancia de nuestro error personalizado lo cual hará también que el código sea más facil de leer)

Ya para la siguiente sección, una vez teniendo el usuario ingresado y su contraseña encriptada, vamos a empezar a realizar el proceso de mandar un correo electrónico de confirmación para que ese usuario haga click en ese enlace y este vaya a nuestro backend y en el backend podamos tomar el token que viene, verificarlo, abrirlo y finalmente autorizar a ese usuario.

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- Paquete `bcryptjs` usando `npm i bcryptjs` desde `https://www.npmjs.com/package/bcryptjs`
  - Para los tipos `npm i --save-dev @types/bcryptjs`
- Paquete `jsonwebtoken` usando `npm i jsonwebtoken` desde `https://www.npmjs.com/package/jsonwebtoken`
  - Para los tipos `npm i --save-dev @types/jsonwebtoken`
- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`

### \* NOTAS:

- Podemos usar https://jwt.io/ para validar el token que estamos generando y ver si la información que estamos enviando nos genera correctamente.
  - Aquí también hay un ejemplo de usar el JWT para el lado cliente https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
- ejemplo
- ejemplo

---

## Parte II:

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

En esta sección realizaremos una verificación de correo electrónico y crearemos un túnel para poder conectarnos desde internet a nuestro localhost.

- Puntualmente veremos:

  - Envío de correo
  - Creación de links de retorno
  - ngrok para tunneling
  - Variables de entorno para facilitar sus cambios
  - Pruebas de conexión y validación desde el celular
  - Pruebas hacia el localhost desde internet

- El objetivo será el siguiente:

  1. Registrar un usuario nuevo
  2. Se enviará al usuario nuevo un correo con un link
  3. Hacer click en el enlace que recibe el usuario nuevo
  4. Al hacer click al enlace se reenviará automáticamente a nuestro servidor para poder realizar las validaciones del correo electrónico
     1. El correo enviado irá con un token que tendrá la fecha de expiración (podrían ser unos 15 minutos o más dependiendo del proyecto)
     2. El token caerá en nuestro endpoint y el endpoint lo leerá y verificará que el token no haya sido manipulado por algo externo y hará el proceso respectivo para validar el correo electrónico
     3. **NOTA:** el procedimiento funcionará correctamente desde nuetro local, es decir, desde nuestra laptop pero si queremos hacer lo mismo desde el celular, no funcionará porque el procedimiento está apuntando al localhost. Pero si se coloca la dirección ip de la computadora y el celular está en la misma red de la computadora, entonces puede ser que pueda funcionar pero no es muy práctico realizar eso porque es tedioso y puede ser que algo no funcione correctamente, entonces para eso sería conveniente desplegarlo para ver su funcionalidad, pero, cabe recordar que estamos aún en ambiente de desarrollo y pueden haber cosas que aún queremos probar y cambiar, entonces para eso usaremos _ngrok_ lo cual es un servicio que nos ayuda a poder hacer un tunel entre nuestro localhost (literalmente vamos a exponer nuestro puerto 3000 de la computadora o donde estemos corriendo nuestro servidor) y también está conectado a nuestra base de datos posgress o mongo localmente, y con eso vamos a tener una url expuesta en internet la cual usaremos para el enlace y para poder realizar las pruebas en la computadora, en el celular, tablet, etc.
     4. **NOTA:** ahora en vez de usar _ngrok_, Visual Studio Code trae una funcionalidad para poder exponer un puerto de manera propia y aquí podemos ver las diferencias https://www.youtube.com/watch?v=wkAPJzKAot4

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- Paquete `nodemailer` usando `npm i nodemailer` desde `https://www.npmjs.com/package/nodemailer` y su página oficial `https://nodemailer.com/about/` para mandar un correo autenticado desde nuestra cuenta de gmail

  - Para el archivo de definición de TypeScript `npm i --save-dev @types/nodemailer`

    - Por si hay algún error referente al enviar mail por falta de host, entonces se puede agregar:

      ```javascript
        private transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          service: envs.MAILER_SERVICE,
          auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
          },
        });
      ```

    - Para enviar archivos adjuntos o attachments `https://nodemailer.com/message/attachments/`

    - Ejemplo de envío de emails en Node JS usando Nodemailer y Outlook: `https://www.youtube.com/watch?v=OuYHrVMcuCU`

- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`

- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`

### \* NOTAS:

- Para este ejercicio se podría usar nuestra cuenta de gmail y evitar hacer algún pago y aquí nosotros queremos mandar un correo autenticado desde nuestra cuenta de gmail pero desde esta aplicación de node y así podemos crear un nuevo correo de gmail y usarlo para el envío de estos correos electrónicos automatizados. Para hacer eso hay que hacer unas configuraciones que es para las contraseñas y unas políticas de seguridad de nuestra cuenta de gmail, no es complicado pero hay que hacerlas en orden para poder usar `nodemailer` y también estamos usando las variables de entorno para poder hacer un poco más segura nuestra aplicación y datos sensibles.

  - Para la verificación en dos pasos: https://myaccount.google.com/security

  - Para establecer un nivel de acceso a nuestra aplicación: https://myaccount.google.com/u/0/apppasswords la cual se colocará en las variables de entorno en _MAILER_SECRET_KEY_

- ejemplo

- ejemplo

---

## Parte III:

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

En esta sección veremos temas middlewares para protección de rutas (rutas enteras, segmentos de rutas o rutas en particular) basado en un token (ya que en la sección anterior solo estamos usando el token para validar nuestro email), dtos para crear los query parameters, usar los query parameters para aplicar una paginación, relaciones en nuestros modelos (por ejemplo los usuarios empiezan a crear blogs, productos, categorías, etc, entonces debemos de tener bien idenfiticado que, por ejemplo, el usuario A creó el registro Registro_A y veremos cómo hacer esa relación de modelos)

- Puntualmente veremos:

  - Middlewares
  - Rutas
  - Modelos
  - Validación de token
  - Query parameters (argumentos opcionales que vienen en la ruta)
    - Los query parameters son opcionales porque si fueran obligatorios entonces serían segmentos de ruta
  - Estrategias de paginación
  - Manejo de errores
  - Consideración sobre uso de servicios y inyección de dependencias.

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`
- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`
- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`

### \* NOTAS:

- ¿Por qué category y product no usan entities?

  - La creación de entidades en una aplicación depende de la complejidad del modelo de datos. En este caso, la clase UserEntity se crea como una entidad porque representa la estructura de un usuario con propiedades específicas donde la función fromObject realiza la conversión de un objeto MongoDB a una instancia de la entidad UserEntity para usar en nuestro código. En este caso no se utilizó un entity para las categorías porque el modelo de categoría es bastante sencillo y no requería de operaciones o lógicas de negocio adicionales que justificaran la creación de un entity separado pero, sin embargo, también se podría implementar un entity para las categorías con su método fromObject siguiendo el mismo procedimiento que se hizo con los usuarios, de esta manera también se podrían validar sus propiedades. Con la entidad es también para colocar nuestras reglas que rijan bajo la entidad misma y no bajo las reglas de la base de datos.

  - La decisión de crear entidades puede basarse en factores como la complejidad del modelo, en escenarios más complejos, donde se realizan operaciones complejas con ciertos datos, la creación de entidades puede ser beneficiosa, pero en casos más simples, como los productos y categorías, puede no ser necesario.

  - Por ejemplo, un proyecto con usuarios y responsabilidades/tareas, si las responsabilidades tienen una estructura específica y se realizan operaciones con ellos, crear una entidad para representar esa estructura y manejar las operaciones puede ser beneficioso, todo depende del contexto y la complejidad de los datos con los que se van a manejar.

- En el proyecto le estamos proporcionando el token directamente a postman para hacer uso de ello, pero en una aplicacion con frontend y backend, ¿Dónde proporcionamos el token a nuestros headers?

  - Cuando se hace una petición desde el frontend utilizando el Fetch API o Axios, se tienen algunas opciones y entre ellas se encuentran los headers. Primero nos debe asegurar de obtener el token y luego se puede incluir en las siguientes peticiones:

  ```js
  fetch("https://api.tuapp.com/algun-recurso", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  ```

  ```js
  axios.get("https://api.tuapp.com/algun-recurso", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  ```

- ejemplo

---

---

## Parte IV:

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

En esta sección vamos a trabajar con relaciones con las bases de datos en nuestras colecciones de Mongo, es decir, que los usuarios puedan crear categorías y también productos y que estos estén relacionados a los usuarios, también cómo podemos generar una semilla para poblar la base de datos rápidamente, entre otras cosas.

- Puntualmente veremos:

  - Una nueva forma de DTO completa
  - Validar MongoIDs
  - Crear categorías, productos y usuarios desde una semilla
  - Remover información en la serialización JSON

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`
- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`
- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`

### \* NOTAS:

- PREGUNTA: ¿Por qué en los services y dtos se utilizan funciones normales y no arrow functions?

  - RESPUESTA:

    - La elección entre una u otra depende del contexto y de las necesidades específicas del código. Las funciones normales y las arrow functions tienen diferencias en cómo manejan el contexto "this" en JavaScript. Las arrow functions no crean su propio ámbito de "this", lo que puede ser beneficioso en ciertos casos, como en la definición de métodos en objetos, donde se necesita acceder al "this" del objeto que las contiene. Por otro lado, las funciones normales tienen su propio ámbito de "this", lo que puede ser útil en situaciones donde se requiere un control más preciso sobre el contexto.

- PREGUNTA: ¿Alguna forma para seleccionar que solo los administradores tenga permisos para borrar la base de datos?

  - RESPUESTA:

    - Se podría crear una función o middleware como el validateJWT pero que se encargue de comprobar esos permisos. Este middleware se colocaría justo después de utilizar el AuthMiddleware y debería de comprobar si es administrador o no antes de darle permiso de hacer la acción del endpoint que se llamó, que en este caso sería borrar una base de datos o parte de la base de datos. Podría ser algo similar a:

      ```js
      const isAdminRole = (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.user) {
          return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token primero",
          });
        }

        const { role, name } = req.body.user;

        if (role !== "ADMIN_ROLE") {
          return res.status(401).json({
            msg: `${name} no es administrador - No puede hacer esto`,
          });
        }

        next();
      };
      ```

    - Otra forma también podría ser crear un endpoint DELETE. Dicho endpoint podria validar en la query que sea un string /:collectionName que coincida con esa collection, luego que el mismo te valide el ROL y si esta autenticado el usuario, luego si pasa esa validacion, llamas al final a tu modelo por ejemplo UserModel.collection.drop(); o el nombre que puso el usuario en collectionName y ahi eliminarias toda la coleccion indicada.

- ejemplo

---

## Parte V:

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

En esta sección trabajaremos con la carga y lectura de archivos a nuestro servidor (cualquier archivo que queramos recibir). La idea es que podamos trabajar con la carga de archivos y colocarlos donde sea necesario, creando un código que nos permita su expansión y modificación después.

NOTA: Cuango hagamos carga de archivos NO debemos almacenar esos archivos en el mismo servidor, en este ejercicio lo haremos subiéndolo al mismo servidor pero solo para fines educativos y ver cómo se podría manejar la subida de archivos en un directorio físico para que se almacene ahí. Pero en general, la recomendación sería colocarlo en un servidor externo, bucket de AWS, algún drive de Google, en cloudinary o cualquier servicio externo que no sea el propio servidor porque por ejemplo, en el servidor tenemos las variables de entorno, llaves o keys privadas, información sensible de cómo funciona la aplicación, y aunque los archivos también son importantes como fotografías de los productos, PDF y/o documentos, etc, puede ser que se suba algún archivo malicioso con la intención de analizar nuestro código o ejecutar algo para minar información de nuestra base de datos que está siendo usada en ese servidor y por eso se recomienda usarlo en otro servidor aparte.

- Puntualmente veremos:

  - Carga Simple
  - Carga Multiple
  - Obtener archivos + Body de la petición http de forma simultánea
  - Validaciones de archivo y extensiones
  - Middlewares personalizados
  - Almacenamiento en File System
  - Obtención del archivo de la petición http

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- Paquete `uuid` usando `npm i uuid` desde `https://www.npmjs.com/package/uuid`

  - Para los tipos `npm i --save-dev @types/uuid`

- Paquete `express-fileupload` usando `npm i express-fileupload` desde `https://www.npmjs.com/package/express-fileupload`

  - Para los tipos `npm i --save-dev @types/express-fileupload`

- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`

### \* NOTAS:

- PREGUNTA: ¿Cómo se puede utilizar la API FileUpload Simple y Carga Multiple desde el lado cliente (frontend)? ¿Cómo se le pasa el archivo?

  - RESPUESTA

    - Se tendría que hacer uso del [FormData](https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects) y aquí hay un [ejemplo usando React](https://es.stackoverflow.com/questions/341503/enviar-m%C3%BAltiples-archivos-en-react-hacia-el-backend)

- PREGUNTA: ¿Hay alguna forma de enviar imágenes (fotos de perfil) y los datos de un usuario al mismo tiempo?. En un foro leído dice que se realiza con multipart, pero la duda es ¿Se realiza eso en el frontend o en el backend?

  - RESPUESTA

    - Es posible enviar imágenes y datos de un usuario al mismo tiempo utilizando el método POST. La forma de hacerlo es utilizando el tipo de contenido **multipart/form-data** en el cuerpo de la solicitud (body).

    - En el frontend, cuando se envía un formulario con archivos y campos de texto, se utiliza el atributo **enctype="multipart/form-data"** en el formulario HTML. De esta manera, el navegador se encarga de codificar los archivos y los campos de texto en un formato que puede ser leído por el servidor.

    - En el backend, se puede utilizar un middleware como **multer** para manejar las solicitudes con archivos. Este middleware multer se encarga de parsear el cuerpo de la solicitud y extraer los archivos y campos de texto.

    - Un ejemplo puede ser: https://medium.com/@diego.coder/subida-de-archivos-con-node-js-express-y-multer-55e99219d754

- PREGUNTA: ¿Cómo realizar un proceso de construcción (build) de una aplicación en Node.js? Es decir, hacer un deployment del ApiRest en Producción

  - RESPUESTA

    - Cuando se hace un build de la aplicación Node, lo que pasa es que se crea una versión optimizada de la aplicación, pero no incluye las dependencias del node_modules, esas dependencias se manejan por separado y se instalan en el servidor de producción una vez se haga el deploy, ahora, sobre el archivo .env en producción no se debería usar directamente, en vez de este archivo las variables de entorno se deben establecer directamente en el servidor de producción, esto es más seguro y es la forma en la que se deberían trabajar las variables de entorno en producción.

---
