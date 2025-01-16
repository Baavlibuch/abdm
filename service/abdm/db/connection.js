const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://siddharthkumar28717:kEXHLTKJgBEXsdmQ@cluster0.6qwnbxo.mongodb.net/HPR',{
	 useNewUrlParser: true,
  	 useUnifiedTopology: true,
}).then(() => {
	console.log("MongoDB connection established")
}).catch((err) => {
	console.log("MongoDB connection failed". err);
})
