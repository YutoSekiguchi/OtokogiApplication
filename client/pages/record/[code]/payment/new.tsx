import { NextPage } from "next";
import { useRouter } from "next/router";
import { useRecordStore } from "../../../../stores/record";
import { ChangeEvent, useEffect, useState } from "react";
import { getMembersByRID } from "../../../../services/member";
import { RecordDataType } from "../../../../@types/record";
import { getRecordByURLCode } from "../../../../services/record";
import styles from "../../../../styles/Reccord.module.css"
import { useMemberStore } from "../../../../stores/member";
import { PostPayDataType } from "../../../../@types/pay";
import { getToday } from "../../../../modules/getToday";
import { postPay } from "../../../../services/pay";
import PayEditForm from "../../../../components/record/PayEditForm";

const NewRecord: NextPage = () => {

  return (
    <div className="container">
      <PayEditForm />
    </div>
  );
}

export default NewRecord;