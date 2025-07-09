const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config({
    path: '../../../config.env'
});

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});


const app = require('./app');
//const database = process.env.MONGODB_URL.replace('<PASSWORD>', process.env.PASSWORD);
const database = "mongodb+srv://premvati_final:FRjK9Cq5SbwkowQ4@cluster0.o98hbop.mongodb.net/"

mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(con => {
    console.log('DB connection Successfully!');
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});




process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});







