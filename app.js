require('dotenv').config()

const restify = require('restify')
const models = require('./models/')
const users = require('./controllers/user')
const todos = require('./controllers/todo')
const auth = require('./controllers/auth')
const jwtMiddleware = require('./middleware/jwt')

const PORT = process.env.PORT
models.sequelize.sync().then(function () {

  const server = restify.createServer()

  restify.CORS.ALLOW_HEADERS.push('authorization');
  server.use(restify.CORS());
  server.use(restify.bodyParser());
  server.use(restify.queryParser());

  server.use(jwtMiddleware);

  server.post('/signup', users.create)
  server.post('/login', auth.login);
  server.get('/users', users.list);
  server.get('/users/:id', users.find);
  server.post('/users', users.create);
  server.put('/users/:id', users.update);
  server.del('/users/:id', users.delete);
  server.get('/todos', todos.list);
  server.get('/todos/:id', todos.find);
  server.post('/todos', todos.create);
  server.put('/todos/:id', todos.update);
  server.del('/todos/:id', todos.delete);

  // server.get(/app/, restify.serveStatic({
  //   directory: '.public/app',
  //   default: 'index.html'
  // }));

  server.listen(PORT, function () {
    console.log('%s listening at %s', server.name, server.url);
  })
})
