import { NextPage } from "next";
import PayEditForm from "../../../../../components/record/PayEditForm";

const PayEditPage: NextPage = () => {
  return (
    <div className="container">
      <PayEditForm mode="edit" />
    </div>
  );
}

export default PayEditPage;