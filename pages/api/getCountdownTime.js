import CountDownTime from "../../models/countDownTime";
import connectDb from "../../MongodbConn/mongodb";
import NextCors from 'nextjs-cors';

const handler = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
  let time = await CountDownTime.find();
  res.status(200).json({ time });
};

export default connectDb(handler);
