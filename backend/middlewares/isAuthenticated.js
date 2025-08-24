import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token; //get token from cookies
        //if token is not present then user is not authenticated
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);//if token exists then decode it
        //if token is not valid then it will throw an error and we will catch it in catch block
        //if decode is null or undefined then it means token is invalid 
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        req.id = decode.userId;//store userId in req.id so that we can use it in next middlewares or controllers
        //req.id will be used to find user in database  
        next();  //call next middleware or controller
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;