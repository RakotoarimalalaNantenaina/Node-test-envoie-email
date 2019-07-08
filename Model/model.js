const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    _id: Number,
    nom: String,
    email: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('mail', NoteSchema);