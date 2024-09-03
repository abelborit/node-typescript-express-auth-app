# Pasos para usar Node con TypeScript con Nodemon

Más información - [Docs Oficiales](https://nodejs.org/en/learn/getting-started/nodejs-with-typescript)

1. Instalar TypeScript y tipos de Node, como dependencia de desarrollo
```
npm i -D typescript @types/node
```
2. Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto)
```
npx tsc --init --outDir dist/ --rootDir src
```

3. **Opcional** - Para traspilar el código, se puede usar este comando donde tsc significa TypeScript Compiler
```
npx tsc
npx tsc --watch
```

4. Configurar Nodemon y Node-TS
```
npm install -D ts-node nodemon
```
5. Crear archivo de configuración de Nodemon - **nodemon.json** el cual es muy útil porque este archivo nos permite configurar cómo nodemon va a actuar cuando esté corriendo nuestra aplicación y evitar estar colocando varios comandos en al terminal. Por ejemplo, en este caso, le estamos diciendo a nodemon que observe los cambios en la carpeta src y que cada vez que haya un cambio en un archivo con extensión .ts o .js, ejecute el comando que le especificamos
```
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "npx ts-node ./src/app.ts"
  "exec": "ts-node ./src/app.ts" // también podría ser sin el npx porque ya se está instalando ts-node en el proyecto
}
```
6. Crear script para correr en desarrollo en el **package.json**
```
  "dev": "nodemon"
  "dev": "npx nodemon" // En caso de no querer instalar nodemon
```

7. Instalar rimraf (Herramienta que funciona similar al rm -f) eliminar directorio
```
npm install -D rimraf
```

8. Crear scripts en el package.json para construir e iniciar en producción
```
   "build": "rimraf ./dist && tsc",
   "start": "npm run build && node dist/app.js"
```


