import Winners from "../../models/winnerResult"
import connectDb from "../../MongodbConn/mongodb";
import NextCors from 'nextjs-cors';
const handler = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
  let winner = await Winners.find();
  res.status(200).json({ winner });
};

export default connectDb(handler);
