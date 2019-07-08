module.exports = (app) => {
    const notes = require('../Controlleur/controller');
    app.post('/eleve', notes.create);
}