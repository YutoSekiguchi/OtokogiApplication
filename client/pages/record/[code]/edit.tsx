import { NextPage } from "next";
import EditForm from "../../../components/record/EditForm";

const RecordEditPage: NextPage = () => {
  return (
    <div className="container">
      <EditForm mode="edit" />
    </div>
  )
}

export default RecordEditPage;