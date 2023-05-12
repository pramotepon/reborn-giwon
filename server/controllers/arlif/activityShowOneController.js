import Activity from "../../models/Activity.js";

const activityShowOne = async (req, res) => {
  const { id } = req.params;
  const showOne = await Activity.findOne({
    _id: id,
  });
  
  res.json(showOne);
};

const activityShowOneController = {
  activityShowOne: activityShowOne,
};

export default activityShowOneController;
