const mongoose = require('mongoose');
const readLine = require('readline');
const fs = require('fs');

const { Schema, model } = mongoose;

function parseLine(line) {
  // here's where we do something with a line

  if (line[line.length - 1] == '\r') line = line.substr(0, line.length - 1); // discard CR (0x0D)

  if (line.length > 0) {
    // ignore empty lines
    let obj = JSON.parse(line); // parse the JSON
    return obj;
  }
  return null;
}

async function processBusiness(buff) {
  const data = parseLine(buff);
  if (data) {
    console.log({ businessId: data.business_id });
    const docData = {
      _id: data.business_id,
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      postalCode: data.postal_code,
      latitude: data.latitude,
      longitude: data.longitude,
      stars: data.stars,
      reviewCount: data.review_count,
      isOpen: data.is_open,
      attributes: data.attributes,
      categories: data.categories,
      hours: data.hours,
    };
    const dbDoc = new Business(docData);
    await dbDoc.save();
  }
}

async function processReview(buff) {
  const data = parseLine(buff);
  if (data) {
    console.log({ reviewId: data.review_id });
    const docData = {
      _id: data.review_id,
      businessId: data.business_id,
      stars: data.stars,
      date: data.date,
      text: data.text,
      useful: data.useful,
      funny: data.funny,
      cool: data.cool,
    };
    const dbDoc = new Review(docData);
    await dbDoc.save();
  }
}

async function initMongo() {
  try {
    const mongo = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to mongodb!');
    return mongo;
  } catch (err) {
    console.log(err);
  }
}

const businessSchema = Schema({
  _id: String,
  name: String,
  address: String,
  city: String,
  state: String,
  postalCode: String,
  latitude: String,
  longitude: String,
  stars: Number,
  reviewCount: Number,
  isOpen: Number,
  attributes: {
    type: Map,
  },
  categories: { type: [String], default: [] },
  hours: {
    type: Map,
    of: String,
  },
});
const Business = model('Business', businessSchema);

const reviewSchema = Schema({
  _id: String,
  businessId: String,
  stars: Number,
  date: Date,
  text: String,
  useful: Number,
  funny: Number,
  cool: Number,
});
const Review = model('Review', reviewSchema);

const filePathReviews = 'yelp-reviews.json';
const filePathRestaurants = 'yelp-businesses.json';

const seed = async () => {
  const mongo = await initMongo();

  const restRl = readLine.createInterface({
    input: fs.createReadStream(filePathRestaurants, { flags: 'r', encoding: 'utf-8' }),
    crlfDelay: Infinity,
  });

  console.log('seeding businesses');
  for await (const line of restRl) {
    await processBusiness(line);
  }

  const reviewRl = readLine.createInterface({
    input: fs.createReadStream(filePathReviews, { flags: 'r', encoding: 'utf-8' }),
    crlfDelay: Infinity,
  });

  console.log('seeding reviews');
  for await (const line of reviewRl) {
    await processReview(line);
  }

  console.log({ businesses: await Business.countDocuments(), reviews: await Review.countDocuments() });
  await mongo.connection.close();
};

seed();
