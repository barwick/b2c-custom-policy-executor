import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Test echo endpoint
app.get("/hello", (req, res) => {
  res.status(200).send("World!");
});

// Validation code for access codes - used by B2C custom policy
app.post("/validate-accesscode", (req, res) => {
  let accessCode = "88888";
  if (accessCode == req.body.accessCode) {
    res.status(200).send();
  } else {
    let errorResponse = {
      version: "1.0",
      status: 409,
      code: "errorCode",
      requestId: "requestId",
      userMessage:
        "The access code you entered is incorrect. Please try again.",
      developerMessage: `The The provided code ${req.body.accessCode} does not match the expected code for user.`,
      moreInfo:
        "https://docs.microsoft.com/en-us/azure/active-directory-b2c/string-transformations",
    };
    res.status(409).send(errorResponse);
  }
});

app.listen(8080, () => {
  console.log(`Access code service listening on port !` + 8080);
});
