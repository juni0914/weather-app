import { getForecast } from "@/utils/getForecast"
import { getTime } from "@/utils/getTime"
import HomeButton from "../../components/HomeButton"
import { getCurrentWeather } from "@/utils/getCurrentWeather"
import style from '../style.module.css'

type Props = {
    params:{
        location: string
    },
    searchParams: {
        name: string
    }
}

export function generateMetadata({ searchParams }: Props) {
    return {
        title: `날씨 앱 - ${searchParams.name}`,
        description: `${searchParams.name}의 날씨를 알려드립니다.`
    }
}

export default async function Detail({ params, searchParams }: Props){
    const name = searchParams.name

    const res = await getForecast(params.location)

    const currentRes = await getCurrentWeather(params.location)

    const time = await getTime(res.location.tz_id)

    return (
        <>
            <h1>{ name }의 7일 예보</h1> <h3>{time.year}년 {time.month}월 {time.day}일 / 마지막 업데이트 시간 : {time.time}:{time.seconds}  <HomeButton/></h3>
            <h2>
                현재 기온은 {currentRes.current.temp_c}°C 입니다. 
                <img className="weathericon" src={res.current.condition.icon} alt="Weather Icon" />
            </h2>
            <ul className={style.weatherlist}>
                {res.forecast.forecastday.map((day)=>(
                    <li key={day.date} >
                        <h3>{day.date}</h3><br/>
                        평균 기온은 {day.day.avgtemp_c} °C입니다.<br/>
                        최저기온은 {day.day.mintemp_c} °C, 최고기온은 {day.day.maxtemp_c} °C입니다.<br/>
                        비가 올 확률은 {day.day.daily_chance_of_rain}% 입니다.
                    </li> 
                ))}
            </ul>
            
        </>
    )
}