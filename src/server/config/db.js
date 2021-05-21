const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://pbyenstuen:36sEry595qQJajE@cluster0.mkdfd.mongodb.net/smidig-prosjekt?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

module.exports = connectDB;