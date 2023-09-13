const jwt = require("jsonwebtoken")
require("dotenv").config()

function generateJWT(idUser){
	const payload ={
		user :{
			idUser
		}
	}
	return jwt.sign(payload, process.env.jwtSecret,{expiresIn:"1h"})
}

module.exports = generateJWT;
