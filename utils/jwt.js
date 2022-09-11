const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.jwtsecret;
  return jwt({
    secret,
    algorithms: ["HS256"],
  });
}
module.exports = authJwt;
