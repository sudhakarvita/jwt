const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
      
        username:{
            type:String,
            require:true
        },
        mobileno:{
            type: String,
            require: true
        },
       
},
    { timestamps: true }
)

module.exports = mongoose.model("admin",adminSchema)