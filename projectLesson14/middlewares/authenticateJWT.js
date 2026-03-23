import jwt from "jsonwebtoken";


function authenticateJWT(req, res, next){
  const authHeader = req.headers.authorization;
  if(authHeader && authHeader.startsWith("Bearer")){
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err){
      return res.status(403).json({message: "Forbidden: Invalid or expired token"});
    }
    req.user = user;
    next();
  })
  } else {
    res.status(401).json({ messgae: "Unauthorized: No token provided or it's invalid" });
  }
}

export {authenticateJWT};