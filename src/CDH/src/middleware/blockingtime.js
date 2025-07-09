import BlockingTime from "../models/blockingtime.js";
import moment from "moment";

const checkBlockingWindow = async (req, res, next) => {
  const now = moment();

const blockingTimes = await BlockingTime.find();

  for (const block of blockingTimes) {
    const start = moment(block.starttime, "YYYY-MM-DD HH:mmA");
    const end = moment(block.endtime, "YYYY-MM-DD HH:mmA");

    if (!start.isValid() || !end.isValid()) {
        console.warn("Invalid blocking time format:", block);
        continue;
      }
  
      if (now.isBetween(start, end)) {
        return res.status(403).json({ message: "Access is temporarily restricted." });
      }
  }
  next();
};

export default checkBlockingWindow;
