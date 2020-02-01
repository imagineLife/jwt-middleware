const express = require("express");
const app = express();
const jwt = require('jsonwebtoken')
const { 
	checkForValidToken,
	extendTokenExpDate,
	expTime
} = require('./middlewares')

//would usually come from somewhere else
let dummyKey = 'secretKeyStringHere!'




//an un-protected route
app.get('/open', (req,res) => {
	return res.json({'open': 'endpoint'})
})

/*
	gets a token
	REQUIRES username && password
*/

app.get('/token', (req,res) => {

	//parse username && password from request url params
	let {un, pw} = req.query

	//error handling
	if(!un || !pw){
		return res.json({"Missing": "required params"})
	}

	//get data from a database or somewhere else
	let moreDummyData = {
		extraData: 'somethingElse',
	  extraDataTwo: 'anotherThing'
	}

	//build the jwt
	let token = jwt.sign({
	  exp: expTime(),
	  data: {
	  	username: un,
	  	password: pw,
	  	...moreDummyData
	  }
	}, dummyKey);

	//return the jwt
	//... can be appended to res header or other method of passing to client....
	return res.json({'token': token})
})

app.get('/protected', checkForValidToken, (req,res) => {
	res.json({'passed': 'Checked for token && passed!'})
})

app.get('/protectedWithRefresh',checkForValidToken, extendTokenExpDate, (req,res) => {
	res.json({'passed': 'Checked for token, && extended token!'})
})

let listenPort = process.env.PORT || 1234
app.listen(listenPort, () => {
  console.log(`Your app is listening on port ${listenPort}`);
});
