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
        <div className="forecastDiv">
            <div className="infoDiv">
                <h1>{ name }의 일주일 일기 예보</h1> <h3>{time.year}년 {time.month}월 {time.day}일 / 마지막 업데이트 시간 : {currentRes.current.last_updated}   <HomeButton/></h3>
                <h2>
                    현재 시간은 {time.time}:{time.seconds}입니다. <br/><br/>
                    현재 기온 : {currentRes.current.temp_c}°C 
                    
                    <img className="weathericon" src={res.current.condition.icon} alt="Weather Icon" />
                </h2>
            </div>
                <ul className={style.weatherlist}>
                    {res.forecast.forecastday.map((day) => (
                        <li key={day.date} className={style.weatherDay}>
                        
                        <div className={style.weatherDetails}>
                            <div className={style.weatherInfo}>
                                <h3>{day.date}</h3>
                                <p>평균 기온 : {day.day.avgtemp_c} °C 일출 : {day.astro.sunrise} 일몰 :  {day.astro.sunset}</p>
                                <p>최저 기온 : {day.day.mintemp_c} °C</p>
                                <p>최고 기온 : {day.day.maxtemp_c} °C</p>
                                <p>비가 올 확률 : {day.day.daily_chance_of_rain}%</p>
                            </div>
                            <ul className={style.hourlyWeather}>
                                {day.hour.filter((hour, index) => index % 2 === 0).map((hour) => {
                                    const timeParts = hour.time.split(" ")[0].slice(5); // 시간 문자열을 분할하여 배열로 만듦
                                    const time = hour.time.split(" ")[1]; // 배열에서 두 번째 요소를 선택 (예: "00:00")

                                    return (
                                    <li key={hour.time_epoch} className={style.hourlyWeatherItem}>
                                        <h4>{timeParts} {time}</h4>
                                        <p>기온: {hour.temp_c} °C</p>
                                        <img className="weathericon" src={hour.condition.icon} alt="Weather Icon" />
                                        
                                        <p>강수 확률: {hour.chance_of_rain}%</p>
                                    </li>
                                    );
                                })}
                                </ul>
                        </div>
                        </li>
                    ))}
                </ul>

        </div> 
        </>
    )
}