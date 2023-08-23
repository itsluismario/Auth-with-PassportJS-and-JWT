<p align="center">
  <a href="https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/badge-backend-nodejs-autenticacion-passportjs-jwt-3425c859-2f69-49a5-849a-792049d24.png" target="_blank">
    <img alt="Curso de Backend con Node.js: Autenticación con Passport.js y JWT" src="https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/badge-backend-nodejs-autenticacion-passportjs-jwt-3425c859-2f69-49a5-849a-792049d24.png" width="60" />
  </a>
</p>
<h1 align="center">
Curso de Backend con Node.js: Autenticación con Passport.js y JWT
</h1>
<p align="center">
  <a href="https://auth-with-passportjs-and-jwt-97e5dc66b7c9.herokuapp.com/" target="_blank">
    https://auth-with-passportjs-and-jwt-97e5dc66b7c9.herokuapp.com/
  </a>
</p>

[Curso de Backend con Node.js: Autenticación con Passport.js y JWT](https://platzi.com/cursos/passport/) hecho por [@nicobytes](https://twitter.com/nicobytes) 

* [Guía rápida](#-gu%C3%ADa-rápida)
* [Logros](#-logros)

### 🤖 Guía Rápida

1.  **Empieza a desarrollar.**

  Crea tu proyect    

  ```
  npm init -y
  ```

## Buenas practicas

  .editorconfig → es para que todos los devs tengan la misma config.

  Instalar Editorconfig

  El siguiente código se obtiene del curso

### Para .editorconfig

  ```
  # Editor configuration, see https://editorconfig.org
  root = true

  [*]
  charset = utf-8
  indent_style = space
  indent_size = 2
  insert_final_newline = true
  trim_trailing_whitespace = true

  [*.js]
  quote_type = single

  [*.md]
  max_line_length = off
  trim_trailing_whitespace = false
  ```

### Para .eslintrc.json

  ```
  {
      "parserOptions": {
        "ecmaVersion": 2018
      },
      "extends": [
        "eslint:recommended",
        "prettier"
      ],
      "env": {
        "es6": true,
        "node": true,
        "jest": true
      },
      "rules": {
        "no-console": "warn"
      }
    }
  ```

### Agregar los scripts e installar la dep de desarrollo

  ```
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js",
    "lint": "eslint",
    "migrations:generate": "sequelize-cli migration:generate --name",
    "migrations:run": "sequelize-cli db:migrate",
    "migrations:revert": "sequelize-cli db:migrate:undo",
    "migrations:delete": "sequelize-cli db:migrate:undo:all"
  }
  ```

  La -D es porque es para dependencia de desarrollo

  ```
  npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier pritter -
  ```

  Con `npm run dev` va a correr nodemon y va a escuchar todos los archivos de JS y hacer un reload

    Correlo

    ```
    npm run dev
    ```

    El sitio estará disponible en https://auth-with-passportjs-and-jwt-97e5dc66b7c9.herokuapp.com/

  ```
  npm i express 
  ```

  Recuerda que es muy diferente las dependencies a las devDependencies

  ```
  "dependencies": {
      "@faker-js/faker": "^8.0.2",
      "@hapi/boom": "^10.0.1",
      "bcrypt": "^5.1.0",
      "cors": "^2.8.5",
      "dotenv": "^16.3.1",
      "express": "^4.18.2",
      "joi": "^17.9.2",
      "jsonwebtoken": "^9.0.1",
      "mysql2": "^3.5.1",
      "nodemailer": "^6.9.4",
      "passport": "^0.6.0",
      "passport-jwt": "^4.0.1",
      "passport-local": "^1.0.0",
      "pg": "^8.11.1",
      "pg-hstore": "^2.3.4",
      "sequelize": "^6.32.1",
      "sequelize-cli": "^6.6.1"
    },
  ```

  En index.js configura el servidor

  ```
  const express = require('express');
  const app = express();
  const port = 3000;

  // app has always two params
  app.get('/', (req, res) => {
    res.send('Hi, my server in express');
  });

  // You must neve user console.log in production, only for dev
  app.listen(port, () => {
    console.log('My port' + port);
  });

  ```

  Corre `npm run dev` probarlo

### 🚀 Logros

1. Envía emails con tokens para recuperar contraseñas
2. Implementa protección de rutas y control de roles a tu API
3. Integra Passport.js y JSON Web Tokens a Express.js
4. Autentica y autoriza usuarios en Node.js


### Para probarlo
  Se usaron los métodos GET, POST, PUT/PATCH y DELETE para cada ruta por lo que es posible hacer CRUD en cada una. 

  Para acceder a cada ruta es de la siguiente manera:

  - Categories: https://auth-with-passportjs-and-jwt-97e5dc66b7c9.herokuapp.com/api/v1/categories/ 

  - Products: https://auth-with-passportjs-and-jwt-97e5dc66b7c9.herokuapp.com/api/v1/products/
  
  - Users: https://auth-with-passportjs-and-jwt-97e5dc66b7c9.herokuapp.com/api/v1/users/

  - Customers: https://auth-with-passportjs-and-jwt-97e5dc66b7c9.herokuapp.com/api/v1/customers/

  - Orders: https://auth-with-passportjs-and-jwt-97e5dc66b7c9.herokuapp.com/api/v1/orders/
   
Happy hacking!
