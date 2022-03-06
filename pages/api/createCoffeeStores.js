const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_APIKEY,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
const table = base("coffee-store");

const coffeStores = (req, res) => {
  res.send("AIRTABLE");
};

export default coffeStores;
