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

const Gdod = require("./models/units/gdod");
const Hativa = require("./models/units/hativa");
const Ogda = require("./models/units/ogda");
const Pikod = require("./models/units/pikod");

const Magad = require("./models/magads/magad");
const Magadal = require("./models/magads/magadal");
const Makat = require("./models/magads/makat");
const Mkabaz = require("./models/magads/mkabaz");

const { getMagadTree } = require("./on_run_req/getMagadal");
const { getUnitTree } = require("./on_run_req/getUnitTree");

let Magadal_bank = {};
let Unit_bank = {};
const getMagadal_bank = async () => {
  // const res = await getMagadTree();
  // // console.log(res);
  // return res;
};

const getUnit_bank = async () => {
  const res = await getUnitTree();
  // console.log(res);
  return res;
};

async function getBanks() {
  [Magadal_bank, Unit_bank] = await Promise.all([
    getMagadal_bank(),
    getUnit_bank(),
  ]);
}
getBanks().then(() => {
  // console.log(Magadal_bank);
  // console.log(Unit_bank);
});


app.get("/TowingLogApi/get_banks", async (req, res) => {
  res.json({data: {Unit_bank, Magadal_bank} });
});

const TowingOrder = require("./routes/towingorder/towingorder");
app.use("/TowingLogApi/TowingOrder", TowingOrder);

const CarTypes = require("./routes/cartypes/cartypes");
app.use("/TowingLogApi/CarTypes", CarTypes);

const Garages = require("./routes/garages/garages");
app.use("/TowingLogApi/Garages", Garages);

const CarDatas = require("./routes/cardatas/cardatas");
app.use("/TowingLogApi/CarDatas", CarDatas);

//* file uploader Routes
// upload files
const fileuploaderRoutes = require("./routes/fileuploader/fileuploader");
app.use("/TowingLogApi", fileuploaderRoutes);

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
