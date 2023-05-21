import useContext from "react";
import ActivityCardEdit from "../components/ActivityCardEdit.jsx";
import Dashboard from "../layout/DashboardLayout/Dashboard.jsx";
const CRUDScreen = () => {
	return (
		<Dashboard>
			<ActivityCardEdit />
		</Dashboard>
	);
};

export default CRUDScreen;
