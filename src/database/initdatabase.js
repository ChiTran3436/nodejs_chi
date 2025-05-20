const mongoose = require('mongoose');


class MyDatabase {

    async connection() {
        try {
            await mongoose.connect('mongodb+srv://chitranpchome:jlXkw8jmfE9HwHVD@cluster0.fxarnx2.mongodb.net/news')
            console.log('connect success')
        } catch (error) {
            console.log('connect error')
        }
    }


}


module.exports = new MyDatabase();


