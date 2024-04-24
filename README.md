<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo API

1. Clonar proyecto
2. Instalar dependencias
```bash
yarn install
```
3. Clonar el archivo ```.env.template``` y renombrar a ```.env```
4. Cambiar las variables de entorno
5. Levantar la base de datos
```bash
docker-compose up -d
```
6. Ejecutar SEED
```
http://{url}/api/seed
```
7. Levantar desarrollo
```bash
yarn start:dev
```