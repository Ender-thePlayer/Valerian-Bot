const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
	_id: {type: mongoose.Schema.Types.ObjectId, required: true},
	guildid: {type:String, required:true},
	channelid: {type:String, required:true},
});

module.exports = mongoose.model("bye", productSchema);
