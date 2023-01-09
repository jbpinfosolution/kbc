import connectDb from "../../MongodbConn/mongodb"
import Result from "../../models/result";
import NextCors from 'nextjs-cors';
const handler = async (req, res) => {
    try {
      await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
      if (req.method == "POST") {
        console.log(req.body);
        let result = new Result(req.body);
        await result.save();
        res.status(200).json({ success:true, status: "success" });
      } else {
        res.status(404).json({success:false, error: "Score already submitted." });
      }
    } catch (error) {
      res.status(404).json({success:false, error: "Score already submitted." });
    }
    
  };
  
  export default connectDb(handler);