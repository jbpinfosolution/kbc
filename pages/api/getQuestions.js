import QuestionDetails from "../../models/questions";
import connectDb from "../../MongodbConn/mongodb";
import NextCors from 'nextjs-cors';
const handler = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
  let question = await QuestionDetails.find();
  res.status(200).json({ question });
};

export default connectDb(handler);
