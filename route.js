
const PostContactDB = require('./model/post');
const nodemailer = require('nodemailer');
module.exports = (app)=>{
    app.get('/',(req, res)=>{
        res.render('pages/index');
    });
    app.get('/service',(req, res)=>{
        res.render('pages/service');
    });
    app.get('/team',(req, res)=>{
        res.render('pages/team');
    });
    app.get('/work',(req, res)=>{
        res.render('pages/work');
    });
    app.get('/price',(req, res)=>{
        res.render('pages/price');
    });
    app.get('/about',(req, res)=>{
        res.render('pages/about');
    });
    app.get('/contact',(req, res)=>{
        res.render('pages/contact');
    });
    // using node mailer

    // post routes
    app.post('/contact',(req, res)=>{
        const name = req.body.firstName;
        const email = req.body.email;
        const message = req.body.message;
        const emailMessage = `Hi ${name}, \n\nThank you for contacting us.
        \n\nYour email is: ${email}.\n\nYour enquiry is: \n ${message}\n.`
        console.log(emailMessage);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'we.love.dev.work@gmail.com',
                pass: 'hello.123'
            }
        });
        const emailOptions = {
            from: 'We Love Dev Work <we.love.dev.work@gmail.com>',
            to: email,
            subject: 'We Love Dev Work;',
            text: emailMessage,
        }
        transporter.sendMail(emailOptions, (error, info)=>{
            if(error) {
                console.log(error);
            } else {
                console.log('Message Sent: '+info.response);
                console.log('Email Message: '+emailMessage);
            }
        });
        const PostContactData = new PostContactDB(req.body);
        PostContactData.save()
          .then(data => res.render('pages/contact-success',{data: req.body}))
          .catch(error =>{
               res.status(422);
               res.render('pages/contact-error');
           });
    });
};
