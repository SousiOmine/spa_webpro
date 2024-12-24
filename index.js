"use strict";
const express = require("express");
const app = express();

app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => console.log("Example app listening on port 8080!"));