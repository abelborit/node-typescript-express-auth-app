# Node TypeScript Express - Auth App

---

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
