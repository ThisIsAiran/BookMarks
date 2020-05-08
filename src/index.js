const express = require('express')
const ejs = require('ejs')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3100
const urlencodedParser = bodyParser.urlencoded({ extended: false})
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const bookMarkModel = require('./models/bookmarks.js')

app.use(express.static(publicDirectoryPath))
app.set('view engine', 'ejs');
app.set('views',viewsPath);

require('./db/mongoose.js')

app.get('/',async (req, res)=>{
	try{
		const bookmarks = await bookMarkModel.find();
		res.render('home',{bookmarks:bookmarks})
	}
	catch(e)
	{
		res.send(e)
	}
})

app.post('/AddingBookMark', urlencodedParser, async (req, res)=>{
	const bookmark = new bookMarkModel({
		'title':req.body.title,
		'link' : req.body.link
	})
	console.log(bookmark)
	try{
		let tags = req.body.tags.split(',')
		for(var i=0;i<tags.length;i++)
			tags[i] = tags[i].trim()
		let uniqueTag = new Set(tags);
		tags = [...uniqueTag]
		for(var i=0;i<tags.length;i++)
			bookmark.tags = bookmark.tags.concat({tag:tags[i]})
		console.log(tags)
		await bookmark.save()
		res.status(201).redirect('/')
	}
	catch(e)
	{
		res.status(400).send(e);
	}
})

app.get('/removeBookmark/:_id', async (req, res)=>{
	try{
		const _id = req.params._id;
		await bookMarkModel.findByIdAndRemove(_id);
		res.redirect('/')
	}
	catch(e)
	{
		res.status(500).send(e)
	}

})

app.get('/removeTag/:id/:tagId', async (req, res)=>{
	try{
		const _id = req.params.id;
		const bookmark = await bookMarkModel.findById(_id);
		for(var i=0; i< bookmark.tags.length;i++)
		{
			if(bookmark.tags[i]._id == req.params.tagId){
				bookmark.tags.splice(i, 1)
				break;
			}
		}
		await bookmark.save();
		res.status(200).redirect('/')
	}
	catch(e)
	{
		res.send(e)
	}
})

app.use(express.json())
app.listen(port, ()=>{
	console.log("Server is on port " + port)
})