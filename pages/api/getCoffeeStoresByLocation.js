// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fectchCoffeSTores } from "../../lib/coffeSore";
export default async function handler(req, res) {
  try {
    const { latLong, limit } = req.query;
    console.log({ latLong, limit });
    const coffeeStorea = await fectchCoffeSTores(latLong, limit);

    res.status(200).json(coffeeStorea);
  } catch (error) {
    console.error("this is error", error);
    res.status(500).json({
      message: "Something wents wrong",
    });
  }
}
