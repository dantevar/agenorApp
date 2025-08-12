const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

function authenticateToken(req, res, next) {
console.log("authMiddleware called");    
  const token = req.cookies.token;
  console.log("Token:", token);
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log("Authenticated user:", user);
    next();
  });
}


module.exports = authenticateToken;
