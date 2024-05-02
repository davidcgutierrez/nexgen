const express = require('express');
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "smarthomesolutionsatx@gmail.com", 
    pass: "zngy qtuq adbu ftcd",
  },
});

// Endpoint to handle form submissions
app.post("/submit-form", (req, res) => {
  const { fullName, email, message } = req.body;

  // Email content
  const mailOptions = {
    from: `"Contact Form" <smarthomesolutionsatx@gmail.com>`,
    to: "smarthomesolutionsatx@gmail.com",             
    subject: "New Contact Form Submission",
    text: `Full Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Failed to send email");
    } else {
      console.log("Email sent:", info.response);
      res.send("Form submitted and email sent successfully!");
    }
  });
});

app.listen(3000, () => console.log('Server started'));