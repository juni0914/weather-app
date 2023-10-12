import Link from "next/link";

import style from './style.module.css'
import { getCurrentWeather } from "@/utils/getCurrentWeather";
import { getTime } from "@/utils/getTime";
import RevalidateButton from "@/components/RevalidateButton";


export default async function Home() {
  const res = await getCurrentWeather('seoul');
  const time = await getTime(res.location.tz_id)


  return (
    <div className={style.container}>
      <h1 className={style.title}>날씨 예보</h1>
      
      <h3 className={style.subtitle}>
        {time.year}년 {time.month}월 {time.day}일 / 현재 시간: {time.time}:{time.seconds} (Seoul / Korea)
      </h3>
      <ul className={style.list}>
        <li className={style['list-item']}>
          <Link href="/Seoul?name=서울">서울</Link>
        </li>
        <li className={style['list-item']}>
          <Link href="/London?name=런던">런던</Link>
        </li>
        <li className={style['list-item']}>
          <Link href="/NYC?name=뉴욕">뉴욕</Link>
        </li>
        <li className={style['list-item']}>
          <Link href="/Tokyo?name=도쿄">도쿄</Link>
        </li>
      </ul>
      {/* <RevalidateButton tag={'time'}/> */}
    </div>
  );
}

