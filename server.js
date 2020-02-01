const express = require("express");
const app = express();
const jwt = require('jsonwebtoken')

//would usually come from somewhere else
let dummyKey = 'secretKeyStringHere!'
let expTime = Math.floor(Date.now() / 1000) + (60 * 60)
console.log('expTime')
console.log(expTime)


app.get('/open', (req,res) => {
	return res.json({'open': 'endpoint'})
})

app.get('/token', (req,res) => {
	let {un, pw} = req.query

	let token = jwt.sign({
	  exp: expTime,
	  data: {
	  	username: un,
	  	password: pw,
	  	extraData: 'somethingElse',
	  	extraDataTwo: 'anotherThing'
	  }
	}, dummyKey);

	if(!un || !pw){
		return res.json({"Missing": "required params"})
	}


	return res.json({'token': token})
})

let listenPort = process.env.PORT || 1234
app.listen(listenPort, () => {
  console.log(`Your app is listening on port ${listenPort}`);
});
