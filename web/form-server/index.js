var express = require("express");
var app = express();
var cors = require("cors");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var connection = mysql.createConnection({ multipleStatements: true });
app.use(bodyParser.json({ type: "application/json" }));

app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

var server = app.listen(4000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Server start");
});

connection.connect(function(error) {
  if (!!error) console.log("error");
  else console.log("Connected");
});

app.use(cors());

// app.post("/patient/add", function(req, res) {
//   connection.query(
//     "INSERT INTO patient(patient_name, type_id, type_id_number, patient_address) VALUES (?,?,?,?)",
//     [
//       req.body.patient_name,
//       req.body.type_id,
//       req.body.type_id_number,
//       req.body.patient_address
//     ],
//     function(error, rows, fields) {
//       if (error) {
//         console.log(error);
//         res.status(500).send({ success: false, message: "Something Wrong" });
//       } else {
//         console.log(rows);
//         res.status(200).send({ success: true, message: "Successful Add " });
//       }
//     }
//   );
// });

app.post("/patient/add", function(req, res) {
  var patient_name = req.body.patient_name;
  var type_id = req.body.type_id;
  var type_id_number = req.body.type_id_number;
  var patient_address = req.body.patient_address;

  var birth_date = req.body.birth_date;
  var gender = req.body.gender;
  var martial_status = req.body.martial_status;
  var religion = req.body.religion;
  var race = req.body.race;
  var patient_address_2 = req.body.patient_address_2;
  var patient_address_state = req.body.patient_address_state;
  var patient_address_city = req.body.patient_address_city;
  var patient_address_postal_code = req.body.patient_address_postal_code;
  var patient_nationality = req.body.patient_nationality;
  var patient_home_phone = req.body.patient_home_phone;
  var patient_mobile_phone = req.body.patient_mobile_phone;
  var patient_mail = req.body.patient_mail;

  var query =
    "insert into patient(patient_name,type_id,type_id_number,patient_address,birth_date,gender,martial_status,religion,race,patient_address_2,patient_address_state,patient_address_city,patient_address_postal_code,patient_nationality,patient_home_phone,patient_mobile_phone,patient_mail)values('" +
    patient_name +
    "','" +
    type_id +
    "','" +
    type_id_number +
    "','" +
    patient_address +
    "','" +
    birth_date +
    "','" +
    gender +
    "','" +
    martial_status +
    "','" +
    religion +
    "','" +
    race +
    "','" +
    patient_address_2 +
    "','" +
    patient_address_state +
    "','" +
    patient_address_city +
    "','" +
    patient_address_postal_code +
    "','" +
    patient_nationality +
    "','" +
    patient_home_phone +
    "','" +
    patient_mobile_phone +
    "','" +
    patient_mail +
    "');";

  connection.query(query, function(error, row, field) {
    if (error) {
      res.status(500).send({ success: false, message: "something wrong" });
    } else {
      res.status(200).send({
        success: true,
        message: "Patient Registered"
      });
    }
  });
});

app.get("/data", function(req, res) {
  connection.query("SELECT * FROM patient_biodata", function(
    error,
    rows,
    fields
  ) {
    if (error) console.log(error);
    else console.log(rows);
    res.send(rows);
  });
});
