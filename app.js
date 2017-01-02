var restify = require('restify')
var models = require('./models/')
var users = require('./controllers/user')
var todos = require('./controllers/todo')
const PORT = process.env.PORT || 3000
models.sequelize.sync().then(function () {

  var server = restify.createServer()
  server.use(restify.CORS());
  server.use(restify.bodyParser());
  server.use(restify.queryParser());

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
