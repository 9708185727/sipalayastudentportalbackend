import jwt from "jsonwebtoken";
function createAuthToken(data){
    var token=jwt.sign({data},process.env.JWT_SECRET);
    return token;
}
export {createAuthToken,};