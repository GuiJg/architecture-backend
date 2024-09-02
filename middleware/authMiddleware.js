const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Nenhum token, autorização negada" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ msg: "Token expirado" });
    }

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ msg: "Token inválido" });
    }

    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ msg: "Token inválido" });
  }
};
