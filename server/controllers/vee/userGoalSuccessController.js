import User from '../../models/User.js';




const checkGoalSuccess = async (req, res) => {
    
    const { id } = req.params;

  try {
    const user = await User.findById(id);

//เช็ค ID user
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

//เช็คว่าน้ำหนักจริง น้อยกว่าหรือเท่ากับ น้ำหนักเป้าหมาย
//true ถ้าถึงเป้า(เท่าหรือน้อยกว่า), false ถ้ายังไม่ถึง(มากกว่า)

    const weight = user.weight;
    const goal = user.goal;

    const isGoalAchieved = weight <= goal;

    res.json(isGoalAchieved);


 } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}



const userGoalSuccessController = {
    checkGoalSuccess: checkGoalSuccess
};



export default userGoalSuccessController;