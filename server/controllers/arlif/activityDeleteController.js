import Activity from "../../models/Activity.js";

const activityDelete = async (req, res) => {
    const { id } = req.params;
    const activityLob = await Activity.deleteOne({
        _id:id,
    })
    res.json("Activity is deleted")
    
}

const activityDeleteController = {
    activityDelete: activityDelete
};

export default activityDeleteController;