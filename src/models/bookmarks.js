const mongoose = require('mongoose')
// const validator = require('validator')

const bookMarkSchema = new mongoose.Schema({
	title:{
		type: String,
		required: true,
		trim: true
	},
	link:{
		type: String,
		required: true,
		unique: true,
		trim : true
	},
	tags:[{
		tag:{
			type:String,
			trim: true
		}
	}]
})

const bookMark = mongoose.model('bookMark', bookMarkSchema)
module.exports = bookMark