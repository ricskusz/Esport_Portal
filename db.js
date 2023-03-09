const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

module.exports = async function connection() {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        
        await mongoose.connect(process.env.DB, connectionParams);
        console.log("Connected to Database");

    } catch (error) {
        console.log(error);
    }
}