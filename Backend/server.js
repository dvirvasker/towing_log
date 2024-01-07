/* eslint-disable spaced-comment */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const ejs = require("ejs");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

// ! --------------- nodemailer --------------------

// const nodemailer = require("nodemailer");
// const hbs = require("nodemailer-express-handlebars");

// const viewPath = path.resolve(__dirname, "./templates/views/");
// const partialsPath = path.resolve(__dirname, "./templates/partials");

// ! -----------------------------------
require("dotenv").config();

//app config
const app = express();
const port = process.env.PORT || 5000;
app.set("view engine", "ejs");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
// !
app.use(morgan("dev"));
app.use(cookieParser());
// !
app.use("/uploads", express.static("uploads")); // to acsses the uploades folder in the server
// Configure Mongo
// const dbUrl = "mongodb://localhost/HozlaDB";
const dbUrl = process.env.DB_URL;

// Connect to Mongo with Mongoose
// Connect to Mongo with Mongoose
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() =>
    console.log("MongoDB database connection established successfully")
  )
  .catch((err) => console.log(err));

//user routes
const authRoutes = require("./routes/authentication/auth");
const userRoutes = require("./routes/authentication/users");
app.use("/TowingLogApi", authRoutes);
app.use("/TowingLogApi", userRoutes);

//Template Example Requests routes for Client
// const HolyaReports = require("./routes/reports/report");
// app.use("/TowingLogApi/HolyaReports", HolyaReports);

const MashkTeh = require("./routes/mashkTeh/mashkTeh");
app.use("/TowingLogApi/mashkTeh", MashkTeh);

const MashkTehArchive = require("./routes/mashkTeh/mashkTehArchive");
app.use("/TowingLogApi/mashkTehArchive", MashkTehArchive);

const Holiyot = require("./routes/holiyot/holiyot");
app.use("/TowingLogApi/Holiyot", Holiyot);

const HoliyotArchive = require("./routes/holiyot/holiyotArchive");
app.use("/TowingLogApi/HoliyotArchive", HoliyotArchive);

const Militaryindustry = require("./routes/militaryindustry/militaryindustry");
app.use("/TowingLogApi/Militaryindustry", Militaryindustry);

const MilitaryindustryArchive = require("./routes/militaryindustry/militaryindustryArchive");
app.use("/TowingLogApi/MilitaryindustryArchive", MilitaryindustryArchive);

const Civilindustry = require("./routes/civilindustry/civilindustry");
app.use("/TowingLogApi/Civilindustry", Civilindustry);

const CivilindustryArchive = require("./routes/civilindustry/civilindustryArchive");
app.use("/TowingLogApi/CivilindustryArchive", CivilindustryArchive);

const Halfim = require("./routes/halfim/halfim");
app.use("/TowingLogApi/Halfim", Halfim);

const HalfimArchive = require("./routes/halfim/halfimArchive");
app.use("/TowingLogApi/HalfimArchive", HalfimArchive);

//* file uploader Routes
// upload files
const fileuploaderRoutes = require("./routes/fileuploader/fileuploader");
app.use("/TowingLogApi", fileuploaderRoutes);

const damagedtools = require("./routes/damagedtools/damagedtools");
app.use("/TowingLogApi/damagedtools", damagedtools);

const archiveddamagedtools = require("./routes/damagedtools/archiveddamagedtools");
app.use("/TowingLogApi/archiveddamagedtools", archiveddamagedtools);

const nesoashchika = require("./routes/nesoashchika/nesoashchika");
app.use("/TowingLogApi/nesoashchika", nesoashchika);

const archivenesoashchika = require("./routes/nesoashchika/archivenesoashchika");
app.use("/TowingLogApi/archivenesoashchika", archivenesoashchika);

const Personnel = require("./routes/personnel/personnel");
app.use("/TowingLogApi/personnel", Personnel);

const PersonnelArchive = require("./routes/personnel/personnelArchive");
app.use("/TowingLogApi/personnelArchive", PersonnelArchive);

const SdacPower = require("./routes/sdacPower/sdacPower");
app.use("/TowingLogApi/sdacPower", SdacPower);

const SdacPowerArchive = require("./routes/sdacPower/sdacPowerArchive");
app.use("/TowingLogApi/sdacPowerArchive", SdacPowerArchive);

const Kshirot = require("./routes/kshirot/Kshirot");
app.use("/TowingLogApi/kshirot", Kshirot);

const KshirotrArchive = require("./routes/kshirot/kshirotArchive");
app.use("/TowingLogApi/kshirotArchive", KshirotrArchive);

//! ----------------- nodemailer --------------------
// app.use(express.static(path.join(__dirname, "./public")));
// app.post("/TowingLogApi/sendemail", (req, res) => {
//   console.log(req.body);
//   const { mail } = req.body;
//   const { type } = req.body;
//   const { msd } = req.body;
//   const { reportID } = req.body;
//   const { zadik } = req.body;
//   const { amlah } = req.body;
//   const mailList = mail.map((m) => m.mail);
//   res.status(200).send({
//     status: "200",
//     message: "Mail Sent!",
//   });
//   sendEmail(mailList, type, msd, reportID, zadik, amlah);
// });
// app.post("/TowingLogApi/sendemail/sourceHoli", (req, res) => {
//   console.log("sendemail/sourceHoli");
//   console.log(req.body);
//   // const { sourceHoli } = req.body;
//   const { mail } = req.body;
//   const { msd } = req.body;
//   const { reportID } = req.body;
//   const { zadik } = req.body;
//   const { amlah } = req.body;
//   // const mailList = mail.map((m) => m.mail);
//   res.status(200).send({
//     status: "200",
//     message: "Mail Sent!",
//   });
//   sendEmailSourceHoli(mail, msd, reportID, zadik, amlah);
// });
// //FIXME_ARMY -  - uncomand the  process.env.MAIL and process.env.MAIL_PASS lines (the working mail and pass in the army)
// const transport = nodemailer.createTransport({
//   service: "Outlook",
//   // logger: true,
//   // debug: true,
//   // FIXME_ARMY - uncomand the host and the port, a copy from the given one in the manual
//   // host: "",
//   // port: ,
//   auth: {
//     user: "mail@outlook.com",
//     // user: "mail@outlook.com",
//     // user: process.env.MAIL,
//     pass: "pass",
//     // pass: "process.env.MAIL_PASS",
//   },
// });

// const sendEmail = (mailList, type, msd, reportID, zadik, amlah) => {
//   ejs.renderFile(
//     __dirname + "/templates/welcome.ejs",
//     { type, msd, reportID, zadik, amlah },
//     (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         var mailOptions = {
//           from: "mail@outlook.com",
//           // from: process.env.MAIL,
//           to: mailList,
//           subject: `עדכון לבקשת חוליה ${msd}`,
//           html: data,
//           attachments: [
//             {
//               filename: "Logo.png",
//               path: path.resolve(__dirname, "./image/HoliyotLogo.png"),
//               cid: "logo", //my mistake was putting "cid:logo@cid" here!
//             },
//           ],
//           // text: type,
//           // template: "index",
//           // attachments: [
//           //   { filename: "abc.jpg", path: path.resolve(__dirname, "./image/abc.jpg") },
//           // ],
//         };

//         transport.sendMail(mailOptions, (error, info) => {
//           if (error) {
//             return console.log(error);
//           }
//           console.log("Message sent: %s", info.messageId);
//         });
//       }
//     }
//   );
// };

// const sendEmailSourceHoli = (mailList, msd, reportID, zadik, amlah) => {
//   ejs.renderFile(
//     __dirname + "/templates/sourceHoli.ejs",
//     { msd, reportID, zadik, amlah },
//     (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         var mailOptions = {
//           from: "mail@outlook.com",
//           // from: process.env.MAIL,
//           to: mailList,
//           subject: `נדרש שיוך חוליה לבקשה מספר ${msd}`,
//           html: data,
//           attachments: [
//             {
//               filename: "Logo.png",
//               path: path.resolve(__dirname, "./image/HoliyotLogo.png"),
//               cid: "logo", //my mistake was putting "cid:logo@cid" here!
//             },
//           ],
//           // text: type,
//           // template: "index",
//           // attachments: [
//           //   { filename: "abc.jpg", path: path.resolve(__dirname, "./image/abc.jpg") },
//           // ],
//         };

//         transport.sendMail(mailOptions, (error, info) => {
//           if (error) {
//             return console.log(error);
//           }
//           console.log("Message sent: %s", info.messageId);
//         });
//       }
//     }
//   );
// };
// ! -------------------------------------

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

//to run type: npm run devStart
