const Mail = require('../Model/model.js');

exports.create = (req, res) => {

    if (!req.body.nom) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    var id;
    Mail.find()
        .then( test => {
    if (test.length == 0) {
        id = 0;
    } else {
        id = parseInt(test[test.length - 1].id) + 1
    }

    const eleve = new Mail({
        _id: id,
        nom: req.body.nom,
        email: req.body.email,
    });

    eleve.save()
        .then(data => {
            res.send(data);
            console.log(data);
            
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
    })
};

