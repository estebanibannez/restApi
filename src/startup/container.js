//configuración contenedor de inyeccion de dependencias

const { createContainer, asClass, asValue, asFunction } = require("awilix");

//Configuraciones
const config = require("../config");
const app = require(".");

//Servicios
const {
  HomeService,
  UserService,
  IdeaService,
  CommentService,
  AuthService
} = require("../services");

//Controllers
const { HomeController } = require("../controllers");

//Routes
const { HomeRoutes } = require("../routes/index.routes");
const Routes = require("../routes");

// models
const { User, Idea, Comment } = require("../models");

//Repositorios
const {
  UserRepository,
  IdeaRepository,
  CommentRepository
} = require("../repository");


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
    UserService: asClass(UserService).singleton(),
    CommentService: asClass(CommentService).singleton(),
    IdeaService: asClass(IdeaService).singleton(),
  })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
  })
  .register({ HomeRoutes: asFunction(HomeRoutes).singleton() })
  .register({
    User: asValue(User),
    Idea: asValue(Idea),
    Comment: asValue(Comment)
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    IdeaRepository: asClass(IdeaRepository).singleton(),
    CommentRepository: asClass(CommentRepository).singleton(),
  });

module.exports = container;
