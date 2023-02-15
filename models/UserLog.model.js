const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userLogSchema = new Schema({
    logs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'DayLog'
        }
    ],
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

const UserLog = mongoose.model('UserLog', userLogSchema);
module.exports = UserLog;
