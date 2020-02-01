const jwt = require('jsonwebtoken');

// ... would be stored elsewhere, env var
const dummyKey = 'secretKeyStringHere!'

const checkForValidToken = (req,res, next) => {
	const { token } = req.headers
	if(!token){
		return res.json({'Error': 'missing token'})
	}

	try{
		let tokenData = jwt.verify(token, dummyKey)
		if(tokenData){
			next()
		}
	}catch(e){
		console.log('e')
		console.log(e)
		res.json({Error: e})
	}
}

const extendTokenExpDate = (req,res,next) => {
	let tokenData = jwt.verify(req.headers.token, dummyKey)
	tokenData.exp = expTime()
	req.headers.token = tokenData
	next()
}

const expTime = () => Math.floor(Date.now() / 1000) + (60 * 60)

module.exports = { 
	checkForValidToken,
	extendTokenExpDate,
	expTime
}