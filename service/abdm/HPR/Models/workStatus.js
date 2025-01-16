const mongoose = require('mongoose');
const {Schema} = mongoose;

const workStatusSchema = new Schema({
        Work_status: String,
        id: Number
});

const WorkStatus = mongoose.model("workStatus", workStatusSchema, "workStatus");

module.exports = WorkStatus;

