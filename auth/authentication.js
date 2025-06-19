import jwt from "jsonwebtoken";

export const authentication = (req, res, next) => {
  const authHeader = req.get("Authorization");
  try {
    console.log("authHeader************", authHeader);
    if (!authHeader) {
      res.status(401).send("No se encontró el token");
      return;
    }
    
    const token = authHeader.split(" ")[1];
    let decodedToken
    
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
      res.status(401).send(err);
      return;
    }
    
    if (!decodedToken) {
      res.status(401).send(err);
      return;
    }

    console.log("decodedToken", decodedToken);
    next();
  } catch (error) {
      res.status(500).send(error);
  }

}