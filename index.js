const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config()
app.use(express.json());
const cors = require('cors');
app.use(cors())
const nodemailer = require('nodemailer');
exports.NODE_TLS_REJECT_UNAUTHORIZED = '0'

app.post("/email", (req, res) => {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "Your email",
                pass: "email-pass or created-app-pass"
            }
        })
        const mailOptions = {
            from: "Your email",
            to: "Send to email",
            subject: "Subject",
            html: "<h1>Stylish email Massages</h1>",
        }
        transport.sendMail(mailOptions, (err, info) => {
            if (err) {
                res.send("Error:" + err)
                // If Error is 
                // self signed certificate in certificate chain
                // so Ok so it was because of the Anti-Virus software. i swear things like this make me feel like quitting.
                // Same was with me. My antivirus is AVG. Instead of turning the antivirus off in AVG you can go to Settings>Components>Email Shield>Customize>SSL Scanning and uncheck "Scan SSL connections".
                // In Avast Go Settings/Protection/Core Shields/Configure shield settings/Mail Shield and uncheck "Scan outbound emails (SMTP)"
                // https://stackoverflow.com/questions/45494639/nodemailer-error-self-signed-certificate-in-certificate-chain
        
            } else {
                res.send(info.response)
            }
        })


    } catch (error) {
        res.send(error.message)
    }
})





app.listen(5000, () => {
    console.log("Server listening on port " + 5000);
})