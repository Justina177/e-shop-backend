const { default: mongoose } = require("mongoose");

const connect = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(connect.connection.host)
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
};

module.exports = connect