const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dayLogSchema = new Schema({
	day: Number,
	productiveHours: Number,
	lessProductiveHours: Number,
	hoursOfSleep: Number,
	nutritionQuality: Number,


/* 	intenseActiveHours: Number,
	moderateActiveHours: Number,
	healthyNutrition: Boolean,
	hoursOfSleep: Number, */

	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

const DayLog = mongoose.model('DayLog', dayLogSchema);
module.exports = DayLog;
