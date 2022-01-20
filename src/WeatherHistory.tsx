import { Group } from "@visx/group"
import { curveBasis } from "@visx/curve"
import { LinePath } from "@visx/shape"
import { Threshold } from "@visx/threshold"
import { scaleTime, scaleLinear } from "@visx/scale"
import { AxisLeft, AxisBottom } from "@visx/axis"
import { GridRows, GridColumns } from "@visx/grid"
import weatherData from "./weatherData.json"
import "./WeatherHistory.css"

const background = "#f3f3f3"

const date = (d: any) => d.dt * 1000
const temperature = (d: any) => d.temp
const feelsLike = (d: any) => d.feels_like

const timeScale = scaleTime<number>({
  domain: [
    Math.min(...weatherData.hourly.map(date)),
    Math.max(...weatherData.hourly.map(date))
  ],
  nice: true
})

const temperatureScale = scaleLinear<number>({
  domain: [
    Math.min(...weatherData.hourly.map(d => Math.min(temperature(d), feelsLike(d)))),
    Math.max(...weatherData.hourly.map(d => Math.max(temperature(d), feelsLike(d))))
  ],
  nice: true
})

const defaultWidth = 600
const defaultHeight = 400
const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 }

export type WeatherHistoryProps = {
  width?: number
  height?: number
  margin?: { top: number; right: number; bottom: number; left: number }
}

const WeatherHistory: React.FC<WeatherHistoryProps> = ({
  width = defaultWidth,
  height = defaultHeight,
  margin = defaultMargin
}) => {
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  timeScale.range([0, xMax])
  temperatureScale.range([yMax, 0])

  return (
    <div>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} rx={10} />
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={temperatureScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <GridColumns scale={timeScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <AxisBottom top={yMax} scale={timeScale} numTicks={width > 520 ? 10 : 5} />
          <AxisLeft scale={temperatureScale} />
          <text x="-70" y="15" transform="rotate(-90)" fontSize={10}>
            Temperature (°C)
          </text>
          <Threshold<any>
            id={`${Math.random()}`}
            data={weatherData.hourly}
            x={d => timeScale(date(d)) ?? 0}
            y0={d => temperatureScale(temperature(d)) ?? 0}
            y1={d => temperatureScale(feelsLike(d)) ?? 0}
            clipAboveTo={0}
            clipBelowTo={yMax}
            curve={curveBasis}
            belowAreaProps={{
              fill: 'violet',
              fillOpacity: 0.4
            }}
            aboveAreaProps={{
              fill: 'green',
              fillOpacity: 0.4
            }}
          />
          <LinePath
            data={weatherData.hourly}
            curve={curveBasis}
            x={d => timeScale(date(d)) ?? 0}
            y={d => temperatureScale(temperature(d)) ?? 0}
            stroke="#f22"
            strokeWidth={1.5}
          />
          <LinePath
            data={weatherData.hourly}
            curve={curveBasis}
            x={d => timeScale(date(d)) ?? 0}
            y={d => temperatureScale(feelsLike(d)) ?? 0}
            stroke="#22f"
            strokeWidth={1.5}
            strokeOpacity={0.8}
            strokeDasharray="1,2"
          />
        </Group>
      </svg>
    </div>
  )
}

export default WeatherHistory
