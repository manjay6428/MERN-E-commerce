const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AQhgMwLqYii2o3s3_1PlnNbdgW2WhYjCOGx4gV9SnV1BXIWtwrLWH-g4ZmAslBO4HGzMC_K77xGOL_Uh",
  client_secret:
    "EP2-4--LjdBUMOjgg7TttoZQzX_vAJ-0Wa55zfAK4HkRD24sakmnzV8EU2QasQ0bQYoyPq4RPPsvMIWs",
});

module.exports = paypal;
