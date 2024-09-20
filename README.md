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

  - La creación de entidades en una aplicación depende de la complejidad del modelo de datos. En este caso, la clase UserEntity se crea como una entidad porque representa la estructura de un usuario con propiedades específicas donde la función fromObject realiza la conversión de un objeto MongoDB a una instancia de la entidad UserEntity para usar en nuestro código.

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
