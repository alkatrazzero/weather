import React from "react";
import {VictoryArea,VictoryLabel, VictoryChart,VictoryStack, VictoryGroup, VictoryPortal, VictoryScatter,VictoryAxis} from 'victory'
import moment from 'moment'

type Props = {
  graphData:IGraphValue[];
  isPositive: boolean
};

export const Graph: React.FC<Props> = ({graphData,isPositive}) => {

  const getDataArray = () => {
    return graphData.map((i)=>{
      return {x:moment(i.dt).format('DD.MM'),y: i.temp}
    })
  }

  return (
    <div>
      <div className="chart-areea">
        <div className="victory-chart">
          <svg style={{ height: 0 }}>
            <defs>
              <linearGradient id="myGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor= {"rgb(255,215,199)" }/>
                <stop offset="25%" stopColor= { "rgb(255,235,217)"} />
                <stop offset="50%" stopColor={ "rgb(255,242,226)"} />
                <stop offset="75%" stopColor={ "rgb(255,248,237)"}/>
                <stop offset="100%" stopColor={"rgb(255,255,245)"} />
              </linearGradient>
            </defs>
          </svg>
            <VictoryChart
              width={1500} height={400}>
              <VictoryGroup data={getDataArray()} >
                <VictoryArea
                  interpolation="natural"
                  style={{
                      data: { fill: "url(#myGradient)" }
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
    </div>
  )
};