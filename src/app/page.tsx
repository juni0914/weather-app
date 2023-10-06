import Link from "next/link";

import style from './style.module.css'
import { getCurrentWeather } from "@/utils/getCurrentWeather";
import { getTime } from "@/utils/getTime";
import RevalidateButton from "@/components/RevalidateButton";


export default async function Home() {
  const res = await getCurrentWeather('seoul');
  const time = await getTime(res.location.tz_id)


  return (
    <>
      <h1>날씨 예보</h1>
      <h3>{time.year}년 {time.month}월 {time.day}일 / 마지막 업데이트 시간 : {time.time}:{time.seconds}</h3>
      <ul className={style.list}>
        <li>
          <Link href="/Seoul?name=서울">서울</Link>
        </li>
        <li>
          <Link href="/London?name=런던">런던</Link>
        </li>
        <li>
        <Link href="/NYC?name=뉴욕">뉴욕</Link>
        </li>
        <li>
        <Link href="/Tokyo?name=도쿄">도쿄</Link>
        </li>
      </ul>
      {/* <RevalidateButton tag={'time'}/> */}
    </>
  )
}

