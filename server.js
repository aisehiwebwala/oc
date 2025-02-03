const express = require("express");
const axios = require("axios");
require("dotenv").config();
const app = express();
const port = 3000;

const { BASE_URL, OPT_CFG } = require("./secret");
const COOKIE_UTILS = require("./utils/cookie_utils");

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/oc", async (req, res) => {
  const { type, symbol } = req.query;
  console.log({ type, symbol });

  try {
    const resp = await axios.get(BASE_URL, {
      headers: { "User-Agent": "PostmanRuntime/7.43.0", Accept: "*/*" },
    });
    const COOKIE_HEADER = COOKIE_UTILS.getCookiesFromArray(
      resp.headers["set-cookie"]
    );
    
    const resp_fin = await axios.get(
      BASE_URL + "/api/" + OPT_CFG + type + "?symbol=" + symbol,
      {
        headers: {
          Cookie: COOKIE_HEADER,
          "User-Agent": "PostmanRuntime/7.43.0",
          Accept: "*/*",
        },
      }
    );
    res.send(resp_fin.data);
  } catch (error) {
    console.log(error);
    res.send({ error_msg: error.message });
  }
});

module.exports = app;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
