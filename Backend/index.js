const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//Connecting to database for the credentials to make it more secure
mongoose
  .connect("your db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("DB connection failed ...");
  });

const credential = mongoose.model("credential", {}, "bulkmail");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/sendemail", (req, res) => {
  var msg = req.body.msg;
  var emaillist = req.body.emaillist;

  credential
    .find()
    .then((response) => {
      console.log(response[0].toJSON());

      const nodemailer = require("nodemailer");

      // Create a test account or replace with real credentials.
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: response[0].toJSON().user,
          pass: response[0].toJSON().pass,
        },
      });

      new Promise(async (resolve, reject) => {
        try {
          for (var i = 0; i < emaillist.length; i++) {
            await transporter.sendMail({
              from: "type your mail",
              to: emaillist[i],
              subject: "Messege from bulkamil app",
              text: msg,
            });
            console.log("Email sent to:" + emaillist[i]);
          }
          resolve("Sucess");
        } catch (error) {
          reject("failed");
        }
      })
        .then(() => {
          res.send(true);
        })
        .catch(() => {
          res.send(false);
        });
    })
    .catch((error) => {
      console.log("Did not fetch value");
    });
});

app.listen(5000, () => {
  console.log("Server started ...");
});
