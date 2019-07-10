const Mail = require('../Model/model.js');
var nodemailer = require('nodemailer');
const config = require('./../zoho.config');
const zoho = require('@trifoia/zcrmsdk');



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

            // var transporter = nodemailer.createTransport({
            //     service: 'gmail',
            //     auth: {
            //         user: "naynah344@gmail.com",
            //         pass: "*******"
            //     }
            // });


            // const mailOptions = {
            //     from: 'naynah344@gmail.com', // e-mails qui envoie les messages
            //     subject: req.body.subject,
            //     to: req.body.email, // listes de e-mails qui reçoivent les messages
            //     html: '<h1>Connexion OK</h1>'
            // };


            // transporter.sendMail(mailOptions, function (err, info) {
            //     if (err)
            //         console.log(err)
            //     else
            //         console.log(info);
            // });

            zoho.initialize(config).then((client) => {
                client.API.MODULES.post({
                    module: 'Contacts',
                    body: {
                        data: [
                          {
                            First_Name: req.body.nom,
                            Last_Name: req.body.nom,
                            Email: req.body.email,
                            Mobile: req.body.mobile,
                          }
                        ],
                    },
                }).then((response) => {
                   res.json(JSON.parse(response.body));
                   res.send(response.body)
                });
            });


            eleve.save()
                .then(donnee => {
                    res.send(donnee);
                    console.log(donnee);

                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Mail."
                    });
                });
        })
};
exports.contact = (req, res, next) => {
    zoho.initialize(config).then((client) => {
        client.API.MODULES.get({
            module: 'Contacts',
            params: {
                page: 1,
                per_page: 200,
            },
        }).then((response) => {
            res.json(JSON.parse(response.body));
            console.log("body", response.body);
            res.send(response.body)
            
            
        }).catch(next);
    }).catch(next);
}
