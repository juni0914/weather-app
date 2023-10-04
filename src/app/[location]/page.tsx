import { getForecast } from "@/utils/getForecast"
import HomeButton from "../../components/HomeButton"

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

    return (
        <>
            <h1>{ name }의 7일 예보</h1>
            <ul>
                {res.forecast.forecastday.map((day)=>(
                    <li key={day.date}>
                    {day.date} / {day.day.avgtemp_c}</li>
                ))}
            </ul>
            <HomeButton/>
        </>
    )
}