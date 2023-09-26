import type { Metadata, NextPage } from "next";
import { useRecordStore } from "../../../stores/record";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../styles/Reccord.module.css"
import { getRecordByURLCode } from "../../../services/record";
import { getMembersByRID } from "../../../services/member";
import { RankingDataType, RecordDataType } from "../../../@types/record";
import { EvaArrowCircleUpOutline } from "../../../components/common/icons/EvaArrowCircleUpOutline";
import CopyButton from "../../../components/record/CopyButton";
import ShareButton from "../../../components/record/ShareButton";
import { useMemberStore } from "../../../stores/member";
import { PayDataType } from "../../../@types/pay";
import { getPaysByRID } from "../../../services/pay";
import { generateDayFormat } from "../../../modules/generateDayFormat";
import { EntypoEdit } from "../../../components/common/icons/EntypoEdit";
import { groupAndSortByPrice } from "../../../modules/record/generatePayDataSortByPrice";
import { addCommasToNumber } from "../../../modules/addCommasToNumber";
import { AkarIconsCrown } from "../../../components/common/icons/AkarIconsCrown";
import { PROJECT_NAME } from "../../../configs/settings";

export async function generateMetadate(): Promise<Metadata> {
  const router = useRouter();
  const { code } = router.query;
  let name = "";
  if (typeof code === "string") {
    const res: RecordDataType = await getRecordByURLCode(code);
    if (res != null) {
      name = res.title
    }
  }
  return {
    title: `${name} | ${PROJECT_NAME}`,
    openGraph: {
      title: `${name} | ${PROJECT_NAME}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} | ${PROJECT_NAME}`,
    },
  }
}

const Record: NextPage = () => {

  const router = useRouter();
  const record = useRecordStore((state) => state.record);
  const setRecordData = useRecordStore((state) => state.setRecordData);
  const setMembers = useMemberStore((state) => state.setMembers);
  const members = useMemberStore((state) => state.members);

  const [pays, setPays] = useState<PayDataType[]>([]);
  const [rankingData, setRankingData] = useState<RankingDataType[]>([]);
  const [isShowAllPays, setIsShowAllPays] = useState<boolean>(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

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
      setPays(res.reverse());
    }
  }

  const getFirstData = async() => {
    const { code } = router.query;
    // console.log(code)
    if (typeof code === "string" ) {
      console.log(code)
      const res: RecordDataType = await getRecordByURLCode(code);
      if (res != null) {
        setRecordData(res);
        await getMemberData(res.id);
        await getPayData(res.id);
      }
      console.log(res)
    }
  }

  const getMemberName = (mid: number) => {
    let memberName = "";
    members.map((member) => {
      if(member.id === mid) {
        memberName = member.name;
      }
    })
    return memberName;
  }

  const movePayEditPage = (pid: number) => {
    router.push(`/record/${router.query.code}/payment/${pid}/edit`);
  }

  const moveRecordEditPage = () => {
    router.push(`/record/${router.query.code}/edit`)
  }

  useEffect(() => {
    getFirstData();
  }, [router])

  useEffect(() => {
    if (pays.length > 0) {
      const sortByPrice = groupAndSortByPrice(pays);
      setRankingData(sortByPrice);
    }
  }, [pays])

  const PayList = ({list}: {list: PayDataType[]}) => {
    return(
      <>
        {
          list.map((pay, i) => (
            <div key={i} className={styles.pay_el}>
              <div className={styles.pay_el_left}>
                <p className={styles.pay_detail}>{pay.detail}</p>
                <p className={styles.pay_name_day}>{getMemberName(pay.mid)}の漢気&nbsp;({generateDayFormat(pay.date)})</p>
              </div>
              <div className={styles.pay_el_right}>
                <p className={styles.pay_money}>{pay.price !== 0? `¥${addCommasToNumber(pay.price)}` : ""}</p>
                <button className={styles.pay_edit_button} onClick={() => movePayEditPage(pay.id)}>
                  <EntypoEdit className={styles.pay_edit_icon} />
                </button>
              </div>
            </div>
          ))
        }
      </>
    )
  }

  return (
    <div className="container">
      {
        record && (typeof record === "object" && "title" in record)
        ?
        <>
          <div className={styles.record_header}>
            <h1 className={styles.record_header_title}>{record.title}</h1>
            <div className={styles.record_header_member_list}>
              {
                members.map((data, i) => (
                  <div key={i}>
                    <p className={styles.record_header_member}>{data.name}</p>
                    {
                      i != members.length-1 && <p className={styles.record_header_member}>・</p>
                    }
                  </div>
                ))
              }
            </div>
          </div>

          <div className={styles.main}>
            <button className={styles.add_record_button} onClick={() => {router.push(`/record/${router.query.code}/payment/new`)}}>
              漢気記録を追加
            </button>
            {pays.length > 0
              ?
              <>
                <div className={styles.pay_list}>
                  {
                    isShowAllPays || pays.length <= 7?
                    <PayList list={pays} />
                    :
                    <>
                      <PayList list={pays.slice(0, 7)} />
                      <button className={styles.more_show_button} onClick={() => {setIsShowAllPays(true)}}>さらに表示する</button>
                    </>
                  }
                </div>
              </>
              :
              <>
                <div className={styles.arrow_icon_wrapper}>
                  <EvaArrowCircleUpOutline className={styles.arrow_icon} />
                </div>
                <div>
                  <p className={styles.detail_context}>「漢気記録を追加」ボタンから<br />メンバー間の漢気記録を登録しましょう</p>
                </div>
              </>
            }

            <div className={styles.member_ranking}>
              <p className={styles.member_ranking_title}>ランキング</p>
              {
                rankingData.map((data, i) => (
                  <div className={styles.ranking_box} key={i}>
                    <div className={styles.ranking_box_left}>
                      {
                        i==0&&
                        <AkarIconsCrown color="#e6b422" />
                      }
                      {
                        i==1&&
                        <AkarIconsCrown color="#808080" />
                      }
                      {
                        i==2&&
                        <AkarIconsCrown color="#b87333" />
                      }
                      <p className={`${i==0? "first_rank": i==1? "second_rank": i==2? "third_rank": ""} bold-text`}>{i+1}位</p>
                      <p className={styles.ranking_name}>{getMemberName(data.mid)}</p>
                    </div>
                    <p className={styles.ranking_price}>¥{addCommasToNumber(data.totalPrice)}</p>
                  </div>
                ))
              }
            </div>

            <div>
              <button
                className={styles.detail_result_button}
                onClick={() => {router.push(`/record/${router.query.code}/detail`)}}
              >
                詳細結果を見る
              </button>
            </div>

            <div className={styles.button_wrapper}>
              <CopyButton textToCopy={currentUrl} />
              <ShareButton textToShare={currentUrl} />
            </div>

            <div>
              <button
                className={styles.edit_button}
                onClick={moveRecordEditPage}
              >
                グループ編集
              </button>
            </div>
          </div>
        </>
        :
        <></>
      }
    </div>
  );
}

export default Record;