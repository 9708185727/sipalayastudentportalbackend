import jwt from "jsonwebtoken";

function auth(req, res, next) {
  try {
    const authHeader = req.headers?.authorization;
    let authToken;

    // Check if the authorization header contains a Bearer token
    if (authHeader && authHeader.startsWith("Bearer ")) {
      authToken = authHeader.split(" ")[1];
    } else {
      // If there's no Bearer token, try to get the token from cookies
      const cookie = req.headers.cookie;
      if (!cookie) return res.status(401).send("Unauthorized");

      // Extract the token from the cookie (assuming it's in the format 'authToken=YOUR_TOKEN')
      authToken = cookie.split("=")[1];
    }

    if (!authToken) return res.status(401).send("Unauthorized");

    // Verify the JWT token
    jwt.verify(authToken, process.env.JWT_SECRET, function (error, data) {
      if (error) {
        // If token verification fails, send an Unauthorized response
        return res.status(401).send("Unauthorized");
      }

      // Attach user data to request
      req.user = data.data;
      next();
    });
  } catch (error) {
    // Catch any unexpected errors and send a 500 (Internal Server Error) response
    console.error("Error in auth middleware:", error);
    return res.status(500).send("Internal Server Error");
  }
}

export default auth;
