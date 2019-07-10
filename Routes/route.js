module.exports = (app) => {
    const notes = require('../Controlleur/controller');
    app.post('/', notes.create);
    app.get('/contacts',notes.contact);
}