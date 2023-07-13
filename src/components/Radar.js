import ReactEcharts from "echarts-for-react"


function RadarChart() {
  const options = {
    backgroundColor: "rgb(33,37,41,0)",

    legend: {
      data: ['Allocated Budget'],
      padding: [5, 10, 100]
    },
    radar: {
      // shape: 'circle',
      startAngle: 90,
      splitNumber: 5,
      center:['50%', '70%'],
      radius: '100%',
      indicator: [
        { name: 'Amount', max: 100 },
        { name: 'Hard', max: 100 },
        { name: 'Speed', max: 100 },
        // { name: 'Customer Support', max: 100 },
        // { name: 'Development', max: 100 },
        // { name: 'Marketing', max: 100 }
      ],
      splitArea: {
        areaStyle: {
          color: ['rgb(33,37,41,0.2)'],
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 10
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
    },
    
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [30, 10, 50],
            name: 'Allocated Budget'
          },
         
        ],
        
        areaStyle: {
          opacity: 0.5
        }
      }
    ]
  };

  return (
    <div className="shadow m-3 p-4 bg-dark rounded shadow bg-opacity-75">

      <div class="text-center">

        <h4 class="mb-0">AwesomeTeam</h4>
        <ReactEcharts className="mt-3"
          option={options}
          theme={"dark"}
        // style={{ width: "600px", height: "300px" }}
        ></ReactEcharts>
        <div class="d-flex justify-content-between align-items-center mt-3 px-4">

          <div class="stats">
            <h6 class="mb-0">Place</h6>
            <span style={{ fontSize: 30 }}>5</span>

          </div>

          <div class="stats">
            <h6 class="mb-0">Done</h6>
            <span style={{ fontSize: 30 }}>8</span>

          </div>

          <div class="stats">
            <h6 class="mb-0">Points</h6>
            <span style={{ fontSize: 30 }}>1400</span>

          </div>

        </div>
      </div>

    </div>
  )
}

export default RadarChart