const Mail = require('../Model/model.js');
var nodemailer = require('nodemailer');


exports.create = (req, res) => {

    if (!req.body.nom) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    var id;
    Mail.find()
        .then(test => {
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

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "naynah344@gmail.com",
                    pass: "43"
                }
            });


            const mailOptions = {
                from: 'naynah344@gmail.com', // e-mails qui envoie les messages
                subject: req.body.subject,
                to: req.body.email, // listes de e-mails qui reçoivent les messages
                html: '<h1>Connexion OK</h1>'
            };


            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.log(err)
                else
                    console.log(info);
            });

            eleve.save()
                .then(data => {
                    res.send(data);
                    console.log(data);

                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Mail."
                    });
                });
        })
};

