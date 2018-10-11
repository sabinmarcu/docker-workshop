const model = require('./model');
const { middleware } = require('./auth');

const ReE = (res, error, code) => {
  const statusCode = code || 501;
  res.statusCode = statusCode;
  res.json({
    statusCode,
    message: error.message,
  })
}
const ReS = (res, data) => res.json(data);

module.exports = server => {
  server.get('/todos', ...middleware, async (req, res) => {
    try {
      ReS(res, await model.find({}));
    } catch (e) {
      ReE(res, e);
    }
  });
  server.post('/todos', ...middleware, async (req, res) => {
    try {
      let todo = await model.findOne({ id: req.body.id });
      if (!todo) {
        const todo = new model(req.body);
      }
      Object.keys(req.body).forEach(key => { todo[key] = req.body[key] });
      await todo.save();
      ReS(res, todo);
    } catch (e) {
      ReE(res, e);
    }
  });
  server.get('/todos/:id', ...middleware, async (req, res) => {
    try {
      const todo = await model.findOne({ id: req.params.id });
      if (!todo) {
        ReE(res, new Error('Todo not found'), 404);
      } else {
        ReS(res, todo);
      }
    } catch (e) {
      ReE(res, e);
    }
  });
  server.delete('/todos/:id', ...middleware, async (req, res) => {
    try {
      const todo = await model.findOne({ id: req.params.id });
      if (!todo) {
        ReE(res, new Error('Todo not found'), 404);
      } else {
        try {
          await model.deleteOne({ id: req.params.id });
          ReS(res, todo);
        } catch (e) {
          ReE(res, e);
        }
      }
    } catch (e) {
      ReE(res, e);
    }
  });
  return server;
}
