import jwt, { TokenExpiredError } from "jsonwebtoken"


function authJWT2(req, res, next) {
  const authHeader = req.header.authorization
  if (authHeader && authHeader.startsWith("Bearer ")){
    jwt.verify(TokenExpiredError, process.env.JWT_SECRET_KEY, (err, user) => {
      if(err){
        res.status(403).json({message: "Forbidden: Invalid or expired token"})
      }
      res.user = user
      next()
    })
    } else{
      return res.status(401).json({message:"Unaithorized: No token provided or it's invalid" })
    }
  }


  export {authJWT2}
