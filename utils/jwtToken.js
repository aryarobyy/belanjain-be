import jwt from 'jsonwebtoken';


const jwtToken = (userId) => {
    const secretKey = process.env.JWT_SECRET; 

    return jwt.sign({ userId }, secretKey, {
        expiresIn: '1h' 
    });
};

export default jwtToken;
