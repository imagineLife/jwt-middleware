const express = require("express");
const app = express();
const jwt = require('jsonwebtoken')

//would usually come from somewhere else
let dummyKey = 'secretKeyStringHere!'
let expTime = Math.floor(Date.now() / 1000) + (60 * 60)


const refreshToken = () => {

}
//an un-protected route
app.get('/open', (req,res) => {
	return res.json({'open': 'endpoint'})
})

/*
	gets a token
	REQUIRES username && password
*/


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
app.get('/token', (req,res) => {

	//parse username && password from request url params
	let {un, pw} = req.query

	//error handling
	if(!un || !pw){
		return res.json({"Missing": "required params"})
	}

	//build the jwt
	let token = jwt.sign({
	  exp: expTime,
	  data: {
	  	username: un,
	  	password: pw,
	  	extraData: 'somethingElse',
	  	extraDataTwo: 'anotherThing'
	  }
	}, dummyKey);

	//return the jwt
	//... can be appended to res header ....
	return res.json({'token': token})
})

app.get('/protected', checkForValidToken, (req,res) => {
	res.json({'passed': 'Checked for token && passed!'})
})

// app.get('/protectedWithRefresh', refreshToken(checkForValidToken), (req,res) => {
// 	res.json({'passed': 'Checked for token && passed!'})
// })

let listenPort = process.env.PORT || 1234
app.listen(listenPort, () => {
  console.log(`Your app is listening on port ${listenPort}`);
});
