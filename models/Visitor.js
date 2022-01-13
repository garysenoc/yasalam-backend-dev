const mongoose = require("mongoose");


const visitorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    outlet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Outlet",
    },
    isBranch:{
        type:Boolean,
        default:false,
    },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
    },
    day:{
        type:String
    },
    month:{
          type:String
     },
    year:{
          type:String
    },
    time:{
        type: Date,
        default: Date.now()
    },
});

const Visitor = mongoose.model("Visitor", visitorSchema);
module.exports = Visitor;
