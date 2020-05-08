const mongoose = require('mongoose')
const connectionUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Bookmarks'
mongoose.connect(connectionUrl,{
	useNewUrlParser:true,
	useCreateIndex:true,
	useFindAndModify:false,
	useUnifiedTopology: true
})