//configuración contenedor de inyeccion de dependencias

const { createContainer, asClass, asValue, asFunction } = require("awilix");


//Configuraciones
const config = require("../config");
const app = require(".");

//Servicios
const { HomeService } = require("../services");

//Controllers
const { HomeController } = require("../controllers");

//Routes
const { HomeRoutes } = require("../routes/index.routes");
const Routes = require("../routes");

//crear contenedor
const container = createContainer();

//crear una nueva clase de inyección
container
  .register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config),
  })
  .register({
    HomeService: asClass(HomeService).singleton(), //inyecta la clase HomeService como singleton
  })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
  })
  .register({ HomeRoutes: asFunction(HomeRoutes).singleton() });

module.exports = container;
