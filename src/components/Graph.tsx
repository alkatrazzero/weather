import React from "react";
import {VictoryArea,VictoryLabel, VictoryChart,VictoryStack, VictoryGroup, VictoryPortal, VictoryScatter,VictoryAxis} from 'victory'
import moment from 'moment'

type Props = {
  graphData:IGraphValue[];
  isPositive: boolean
};

interface IGradientValues {
  offset: string,
  color: string
}

export const Graph: React.FC<Props> = ({graphData,isPositive}) => {

  const getDataArray = () => {
    return graphData.map((i)=>{
      return {x:moment(i.dt).format('DD.MM'),y: i.temp}
    })
  }

  const gradientData:IGradientValues[] = [
    {
      offset:'0%',
      color: isPositive ? "rgb(255,215,199)" :"rgb(200,214,255)"
    },
    {
      offset:'25%',
      color: isPositive ? "rgb(255,235,217)" :"rgb(200,223,254)"
    },
    {
      offset:'50%',
      color: isPositive ? "rgb(255,242,226)" :"rgb(222,231,252)"

    },
    {
      offset:'75%',
      color: isPositive ? "rgb(255,248,237)" :"rgb(236,237,252)"

    },
    {
      offset:'100%',
      color: isPositive ? "rgb(255,255,245)" :"rgb(245,240,252)"
    },
  ]
  const gradientId = isPositive ? 'myGradientPositive' : 'myGradientNegative'
  const url = `url(#${gradientId})`

  return (
    <div className="chart-areea">
      <div className="victory-chart">
        <svg style={{ height: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              {gradientData.map((d:IGradientValues,index:number)=><stop key={index} offset={d.offset} stopColor={d.color} />)}
            </linearGradient>
          </defs>
        </svg>
          <VictoryChart
            width={1500} height={400}>
            <VictoryGroup data={getDataArray()} >
              <VictoryArea
                interpolation="natural"
                style={{
                    data: { fill: url }
                }}
              />
              <VictoryScatter
                size={0}
                labels={({ datum }) => datum.y}
                labelComponent={
                  <VictoryLabel style={{'fontSize': '35px'}}/>
                }
              />
            </VictoryGroup>
            <VictoryAxis
              style={
                {
                  axis: {
                    strokeWidth:0
                  },
                  tickLabels: {
                    display:'none',
                  },
                }
              }
            />
        </VictoryChart>
        <div className='line-data-row'>
          {getDataArray().map((i,index)=><span key={index} className='date-line'>{i.x}</span>)}
        </div>
      </div>
    </div>
  )
};