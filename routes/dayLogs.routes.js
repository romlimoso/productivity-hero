const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard");
const DayLog = require('../models/DayLog.model')
const UserLog = require('../models/UserLog.model')

router.get('/day-logs/add', (req, res, next) => {
	res.render('day-logs/add')
});

router.post('/day-logs', (req, res, next) => {
	const { day, productiveHours, semiProductiveHours} = req.body
	// node basic auth: req.session.user 
	const user = req.session.user
	const userId = req.session.user._id
	DayLog.create({ day, productiveHours, semiProductiveHours, owner: userId })
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
	const userId = req.session.user._id

  const query = { }
  if (req.session.user.role === "user") {
    query.owner = req.session.user._id
  }
  console.log(req.session.user)
	DayLog.find(query)
	.populate("owner")
	.then(dayLogs => {
      console.log("dayLogs: ", dayLogs)
			res.render('day-logs/index', { dayLogs })
		})
		.catch(err => {
			next(err)
		})
});

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