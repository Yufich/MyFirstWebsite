let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let postShema = new Schema({
    title:{
        type: String,
        required:true,
    },
    author:{
        type: String,
        required:true,
    },
});

let postModel = mongoose.model("postModel", postShema);

module.exports = postModel;