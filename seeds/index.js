const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

main().catch(err => console.log(err))

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp')
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'conection error:'));
db.once('open', () => {
    console.log('Database connected');
});  

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5613216546132651',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/random/?camping', 
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo itaque ipsam, ipsum autem facilis assumenda aliquam vel debitis. Qui nulla nemo maiores aliquam ipsa aliquid reiciendis maxime itaque, minima ut?',
            price: `${price}`
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})