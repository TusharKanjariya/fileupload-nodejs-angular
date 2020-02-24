const express = require("express");
const multer = require("multer");
const cors = require("cors");

var app = express();
app.use(cors());
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/uploads");
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    cb(null, file.fieldname + Date.now() + ext);
  }
});

var upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      return cb(new Error("Supported Files are JPG, PNG and JPEG Formats."));
    }
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/images/uploads");
});
var postImage = upload.single("image");

app.post("/image", (req, res) => {
  postImage(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      res.send(err);
    } else if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send("done");
    }
  });
});

var port = 3000 || process.env.PORT;

app.listen(port, () => console.log("Server Started at " + port));
