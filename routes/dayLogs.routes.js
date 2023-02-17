const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard");
const DayLog = require('../models/DayLog.model')
const UserLog = require('../models/UserLog.model')

router.get('/day-logs/add', (req, res, next) => {
	res.render('day-logs/add')
});

router.post('/day-logs', (req, res, next) => {
	const { day, productiveHours, lessProductiveHours, hoursOfSleep, nutritionQuality} = req.body
	// node basic auth: req.session.user 
	const user = req.session.user
	const userId = req.session.user._id
	DayLog.create({ day, productiveHours, lessProductiveHours, hoursOfSleep, nutritionQuality, owner: userId })
		.then(createdDayLog => {
			
			UserLog.findOneAndUpdate(
			 	{ owner: userId },
				{ $push: { logs: createdDayLog } }
			)
			.then(() => {
				res.redirect('/day-logs')
			})
		})
		.catch(err => {
			next(err)
		})
	
});



router.get('/day-logs', isLoggedIn, (req, res, next) => {

  const query = { }
  if (req.session.user.role === "user") {
    query.owner = req.session.user._id
  }
  console.log(req.session.user)
	UserLog.find(query)
  	.populate({
		path: 'logs',
		populate:  'owner'	
	})

	.then(userLog => {
      console.log("dayLogs: ", userLog[0])
			res.render('day-logs/index', { userLog })
		})
		.catch(err => {
			next(err)
		})
});



router.get('/data', isLoggedIn, (req, res, next) => {
	const userId = req.session.user._id

	const query = { }
	if (req.session.user.role === "user") {
	  query.owner = req.session.user._id
	}
	UserLog.find(query)
	.populate({
		path: 'logs',
		populate:  'owner'	
	})
		.then((logs) => {
			res.json(logs)
			// console.log("LOGS: ",logs)
			// let userData = []
			// for (let i=0; i < UserLog.find(query).length; i++) {
			// 	let jValues = []
			// 	for (let j=0; i < Object.keys(UserLog.find(query)[0]).length; j++) {

			// 	jValues.push(Object.values[UserLog.find(query)[i]][j])

			// 	}
			// 	userData.push(jValues)
			// }
			console.log(logs)
		})
		.catch(err => {
			next(err)
		})
	})




router.get('/day-logs/:id/delete', (req, res, next) => {

	const dayLogId = req.params.id
	// if you are an admin you can delete any room
	// if you are a user you can only delete rooms that you have created

	const query = { _id: dayLogId }

	if (req.session.user.role === 'user') {
		query.owner = req.session.user._id
	}
	console.log(query)
	DayLog.findOneAndDelete(query)
		.then(() => {
			res.redirect('/day-logs')
		})
		.catch(err => {
			next(err)
		})
});


module.exports = router;