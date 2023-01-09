import connectDb from "../../MongodbConn/mongodb"
import Winners from "../../models/winnerResult";
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
        let winner = new  Winners(req.body);
        await  winner.save();
        res.status(200).json({ success:true, status: "success" });
      } else {
        res.status(404).json({success:false, error: "Winner Already added." });
      }
    } catch (error) {
      res.status(404).json({success:false, error: "Winner Already added." });
    }
    
  };
  
  export default connectDb(handler);