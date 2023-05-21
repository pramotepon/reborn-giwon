import useContext from "react";
import { useParams } from "react-router-dom";
import ActivityCardEdit from "../components/ActivityCardEdit.jsx";
import Dashboard from "../layout/DashboardLayout/Dashboard.jsx";

const CRUDScreen = () => {
	const { id } = useParams();

	return (
		<Dashboard>
			<ActivityCardEdit acitivityId={id} />
		</Dashboard>
	);
};

export default CRUDScreen;
