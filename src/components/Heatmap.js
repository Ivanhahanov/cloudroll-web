import ReactEcharts from "echarts-for-react"


function Heatmap() {
  const hours = [
    'Test Task', 'Deploy VM', '2p', '3p', '4p', '5p',
    '6p', '7p'
];
  // prettier-ignore
  const days = [
    'AwesomeTeam', 'Nakateam', 'Naliway',
    'Team1', 'NewTeam'
  ];
  // prettier-ignore
  const data = [[0, 0, 5], [0, 1, 2], [0, 2, 4], [0, 3, 0], [0, 4, 10], [0, 5, 0], [0, 6, 8], [0, 7, 5],
  [1, 0, 7], [1, 1, 2], [1, 2, 3], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0],
  [2, 0, 1], [2, 1, 0], [2, 2, 3], [2, 3, 10], [2, 4, 0], [2, 5, 0], [2, 6, 5], [2, 7, 0],
  [3, 0, 9], [3, 1, 5], [3, 2, 3], [3, 3, 0], [3, 4, 0], [3, 5, 8], [3, 6, 0], [3, 7, 0],
  [4, 0, 1], [4, 1, 2], [4, 2, 3], [4, 3, 0], [4, 4, 0], [4, 5, 0], [4, 6, 10], [4, 7, 0], ]
    .map(function (item) {
      return [item[1], item[0], item[2] || '-'];
    });
  const options = {
    backgroundColor: "rgb(33,37,41,0)",
    tooltip: {
      position: 'top'
    },
    grid: {
      height: '80%',
      left: '20%',
      right: '5%',
      top: '5%'
    },
    xAxis: {
      axisLabel: {
        interval: 0,
        rotate: 30 //If the label names are too long you can manage this by rotating the label.
      },
      type: 'category',
      data: hours,
      splitArea: {
        show: true
      }
    },
    yAxis: {
      type: 'category',
      data: days,
      splitArea: {
        show: true
      }
    },
    visualMap: {
      min: 0,
      max: 10,
      show: false,
      calculable: false,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
      inRange : {   
        color: ['#DD2000', '#009000' ] //From smaller to bigger value ->
    }
    },
    series: [
      {
        name: 'Punch Card',
        type: 'heatmap',
        data: data,
        label: {
          show: false
        },
        
      }
    ]
  };

  return (
    <div className="shadow m-3 p-4 bg-dark rounded shadow bg-opacity-75">
      <ReactEcharts className=""
        option={options}
        theme={"dark"}
      // style={{ width: "600px", height: "300px" }}
      ></ReactEcharts>
    </div>
  )
}

export default Heatmap