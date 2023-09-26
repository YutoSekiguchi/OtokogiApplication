import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RecordDataType } from "../../../@types/record";
import { getRecordByURLCode } from "../../../services/record";
import { getMembersByRID } from "../../../services/member";
import { useRecordStore } from "../../../stores/record";
import { useMemberStore } from "../../../stores/member";
import { getPayTransitionsByRID, getPaysByRID } from "../../../services/pay";
import { PayDataType, PayTransitionDataType, PayTransitionLineGraphDataType } from "../../../@types/pay";
import styles from "../../../styles/Reccord.module.css"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Point } from "chart.js/dist/core/core.controller";
import { graphColorList } from "../../../configs/graphColorList";
import { graphOptions } from "../../../configs/graphOptions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.color = "#fff";
ChartJS.defaults.borderColor = "rgba(255, 255, 255, 0.2)";
ChartJS.defaults.font.size = 6;


const RexordDetail: NextPage = () => {
  const router = useRouter();
  const record = useRecordStore((state) => state.record);
  const setRecordData = useRecordStore((state) => state.setRecordData);
  const setMembers = useMemberStore((state) => state.setMembers);
  const members = useMemberStore((state) => state.members);
  const options = graphOptions;

  const [pays, setPays] = useState<PayDataType[]>([]);
  const [payTransitionData, setPayTransitionData] = useState<PayTransitionDataType[]>([]);
  const [payTransitionLineGraphData, setPayTransitionLineGraphData] = useState<ChartData<"line", (number | Point | null)[], unknown>>({
    labels: [],
    datasets: [],
  });
  const [driveTransitionLineGraphData, setDriveTransitionLineGraphData] = useState<ChartData<"line", (number | Point | null)[], unknown>>({
    labels: [],
    datasets: [],
  });
  const [driveBeerTransitionLineGraphData, setDriveBeerTransitionLineGraphData] = useState<ChartData<"line", (number | Point | null)[], unknown>>({
    labels: [],
    datasets: [],
  });

  const getMemberData = async(rid: number) => {
    const res = await getMembersByRID(rid);
    console.log(res);
    if (res != null) {
      setMembers(res);
    }
  }

  const getPayData =async (rid: number) => {
    const res = await getPaysByRID(rid);
    console.log(res);
    if (res !== null) {
      setPays(res);
    }
  }

  const getPayTransitionData = async(rid: number) => {
    const res = await getPayTransitionsByRID(rid);
    console.log(res);
    if (res !== null) {
      setPayTransitionData(res);
    }
  }

  const getFirstData = async() => {
    const { code } = router.query;
    if (typeof code === "string" ) {
      const res: RecordDataType = await getRecordByURLCode(code);
      if (res != null) {
        setRecordData(res);
        await getMemberData(res.id);
        await getPayData(res.id);
        await getPayTransitionData(res.id);
        
      }
      console.log(res)
    }
  }

  useEffect(() => {
    getFirstData();
  }, [router])

  useEffect(() => {
    if (payTransitionData.length > 0) {
      let payDatasets: PayTransitionLineGraphDataType[] = [];
      let driveDatasets: PayTransitionLineGraphDataType[] = [];
      let driveBeerDatasets: PayTransitionLineGraphDataType[] = [];
      payTransitionData.map((payTransition, i) => {
        payDatasets.push(
          {
            label: payTransition.name,
            data: payTransition.transitionPrice,
            borderColor: graphColorList[i%(graphColorList.length)],
            backgroundColor: "#fffa",
            tension: 0.3,
          }
        );
        driveDatasets.push(
          {
            label: payTransition.name,
            data: payTransition.transitionDrive,
            borderColor: graphColorList[i%(graphColorList.length)],
            backgroundColor: "#fffa",
            tension: 0.3,
          }
        );
        driveBeerDatasets.push(
          {
            label: payTransition.name,
            data: payTransition.transitionDriveBeer,
            borderColor: graphColorList[i%(graphColorList.length)],
            backgroundColor: "#fffa",
            tension: 0.3,
          }
        );
      });

      const payDataTmp = {
        labels: payTransitionData[0].priceDetail,
        datasets: payDatasets,
      }
      const driveDataTmp = {
        labels: [...Array(payTransitionData[0].transitionDrive.length)].map((_, i) => i+1),
        datasets: driveDatasets,
      }
      const driveBeerDataTmp = {
        labels: [...Array(payTransitionData[0].transitionDriveBeer.length)].map((_, i) => i+1),
        datasets: driveBeerDatasets,
      }
      setPayTransitionLineGraphData(payDataTmp);
      setDriveTransitionLineGraphData(driveDataTmp);
      setDriveBeerTransitionLineGraphData(driveBeerDataTmp);
    }
  }, [payTransitionData])

  return(
    <div className="graph_container">
      <div className={styles.graph_canvas}>
        <h2 className={styles.graph_canvas_title}>支払い遷移</h2>
        <Line options={options} data={payTransitionLineGraphData} style={{ width: "100%" }} height={400} />
      </div>

      <div className={styles.graph_canvas}>
        <h2 className={styles.graph_canvas_title}>シンプルな運転回数遷移</h2>
        <Line options={options} data={driveTransitionLineGraphData} style={{ width: "100%" }} height={400} />
      </div>

      <div className={styles.graph_canvas}>
        <h2 className={styles.graph_canvas_title}>酒封印運転回数遷移</h2>
        <Line options={options} data={driveBeerTransitionLineGraphData} style={{ width: "100%" }} height={400} />
      </div>

      <button className={styles.back_page_button} onClick={() => {router.push(`/record/${router.query.code}`)}}>
        戻る
      </button>
    </div>  
  );
}

export default RexordDetail;