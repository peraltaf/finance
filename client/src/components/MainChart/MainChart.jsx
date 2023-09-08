import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Card } from 'react-bootstrap';


export const MainChart = ({ selected_symbol, chart_data, volume_data }) => {
  const options = {
    chart: {
      height: window.innerHeight-435,
    },

    title: {
      text: null
    },

    yAxis: [{
      labels: {
        align: 'right',
        x: -3
      },
      title: {
        text: 'OHLC'
      },
      height: '60%',
      lineWidth: 2,
      resize: {
          enabled: true
      }
    }, {
      labels: {
        align: 'right',
        x: -3
      },
      title: {
        text: 'Volume'
      },
      top: '65%',
      height: '35%',
      offset: 0,
      lineWidth: 2
    }],

    tooltip: {
      split: true
    },

    colors: ['#332288'],

    rangeSelector: {
      buttons: [{
        type: 'hour',
        count: 1,
        text: '1h'
      }, {
        type: 'day',
        count: 1,
        text: '1D'
      }, {
        type: 'day',
        count: 3,
        text: '3D'
      }, {
        type: 'day',
        count: 5,
        text: '5D'
      }, {
        type: 'all',
        count: 1,
        text: 'All'
      }],
      selected: 4,
      inputEnabled: true,
      inputStyle: {
        color: '#1769A0'
      }
    },

    plotOptions: {
      candlestick: {
        color: '#117733',
        upColor: '#CC6677',
      }
    },

    series: [{
      name: selected_symbol,
      type: 'candlestick',
      data: chart_data,
      tooltip: {
        valueDecimals: 2
      }
    }, {
      type: 'column',
      name: 'Volume',
      data: volume_data,
      yAxis: 1
    }],

    credits: { enabled: false }
  };

  return (
    <Card style={{ height: '100%' }}>
      <Card.Body>
        <Card.Subtitle className='mb-2 text-muted'></Card.Subtitle>
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={'stockChart'}
              options={options}
            />
      </Card.Body>
    </Card>
  )
}

export default MainChart;