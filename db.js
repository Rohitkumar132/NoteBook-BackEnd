const mongoose = require("mongoose");

module.exports = () =>{
    const connectionParams = {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    };

    try {
        mongoose.connect(process.env.DB, connectionParams);
        console.log("Connected to DataBase Successfully")
    } catch (err) {
        console.log(err , "Unable to connect To Database")
    }
}