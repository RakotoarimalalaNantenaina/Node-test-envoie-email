module.exports = (app) => {
    const notes = require('../Controlleur/controller');
    app.post('/email', notes.create);
}