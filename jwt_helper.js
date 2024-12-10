import jwt from "jsonwebtoken";
import createError from "http-errors";

function signAccessToken(userId) {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "3h",
      issuer: "localhost:9999",
      audience: userId,
    };

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        // reject(err)
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
}

function signRefreshToken(userId) {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: "1y",
      issuer: "localhost:9999",
      audience: userId,
    };

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
}

function verifyAccessToken(req, res, next) {
  if (!req.headers["authorization"]) return next(createError.Unauthorized());

  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(createError.Unauthorized(message));
    }
    req.payload = payload;
    next();
  });
}

export { signAccessToken, signRefreshToken, verifyAccessToken };
