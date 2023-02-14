const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dayLogSchema = new Schema({
	day: Number,
	productiveHours: Number,
	semiProductiveHours: Number,
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

const DayLog = mongoose.model('DayLog', dayLogSchema);
module.exports = DayLog;
