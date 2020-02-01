const express = require("express");
const app = express();

app.get('/open', (req,res) => {
	res.json({'open': 'endpoint'})
})

let listenPort = process.env.PORT || 1234
app.listen(listenPort, () => {
  console.log(`Your app is listening on port ${listenPort}`);
});
