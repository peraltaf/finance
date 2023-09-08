import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SymbolSelector from './components/SymbolSelector/SymbolSelector';
import Navigation from './components/Nav/Navigation';
import { Col, Container, Row } from 'react-bootstrap';
import Details from './components/Details/Details';
import News from './components/News/News';
import Recommendations from './components/Recommendations/Recommendations';
import MainChart from './components/MainChart/MainChart';
import { useEffect, useState } from 'react';
import moment from 'moment';


const App = () => {
  const [search_research_vis, setSearchVisibility] = useState('d-none');
  const trackClick = e => {
    if (!['search-box', 'search-result'].some(v => e.target.classList.contains(v)))
      setSearchVisibility('d-none');
  };

  const [selected_symbol, setSymbol] = useState('AAPL');
  const [summary_data, setSummaryData] = useState([]);
  const [chart_data, setChartData] = useState([]);
  const [volume_data, setVolumeData] = useState([]);
  const [news_data, setNewsData] = useState([]);
  const [insights_data, setInsightsData] = useState([]);
  const [trending_symbols, setTrendingList] = useState([]);

  const formatChartData = symbol => {
    fetch(`${process.env.REACT_APP_API_URL}/get_chart/?symbol=${symbol}`)
      .then(response => response.json())
      .then(data => {
        const main_chart = data.reduce((a,c) => {
          return [
            ...a, [
              moment(c.date).unix()*1000,
              c.open,
              c.high,
              c.low,
              c.close
            ]
          ]
        }, []);

        const volume = data.reduce((a,c) => {
          return [
            ...a, [
              moment(c.date).unix()*1000,
              c.volume
            ]
          ]
        }, []);

        setChartData(main_chart);
        setVolumeData(volume);
      });
  }

  const newsData = symbol => {
    fetch(`${process.env.REACT_APP_API_URL}/search/?q=${symbol}`)
      .then(response => response.json())
      .then(data => {
        setNewsData(data.news);
      });
  }

  const insightsData = symbol => {
    fetch(`${process.env.REACT_APP_API_URL}/get_insights/?symbol=${symbol}`)
      .then(response => response.json())
      .then(data => {
        setInsightsData(data.secReports);
      });
  }

  const trendingSymbols = () => {
    fetch(`${process.env.REACT_APP_API_URL}/get_trending/`)
      .then(response => response.json())
      .then(data => {
        setTrendingList(data);
        updateSymbol([data[0]]);
      });
  }

  useEffect(() => {
    trendingSymbols();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateSymbol = d => {
    setSymbol(d[0].symbol);
    setSummaryData(d);
    formatChartData(d[0].symbol);
    newsData(d[0].symbol);
    insightsData(d[0].symbol);
  }

  const addNewSymbol = d => {
    setTrendingList([d, ...trending_symbols]);
  }

  return (
    <>
      <Navigation />
      <Container className='main-container mt-3' onClick={trackClick}>
        <Row>
          <Col sm={12} md={4} lg={4} xl={3} xxl={2} className='detail-container'>
            <SymbolSelector 
              addNewSymbol={addNewSymbol}
              setSearchVisibility={setSearchVisibility}
              updateSymbol={updateSymbol}
              search_research_vis={search_research_vis}
              symbol={selected_symbol}
              symbol_list={trending_symbols}
            />
          </Col>

          <Col sm={12} md={8} lg={8} xl={9} xxl={10}>
            <Container className='symbol-data-container'>
              <Row>
                <Col sm={12} md={12} lg={12} xl={4} className='detail-container'>
                  <Details symbol_data={summary_data} />
                </Col>
                
                <Col sm={12} md={12} lg={12} xl={4} className='detail-container'>
                  <News news_data={news_data} />
                </Col>

                <Col sm={12} md={12} lg={12} xl={4} className='detail-container'>
                  <Recommendations insights_data={insights_data} />
                </Col>
              </Row>

              <Row>
                <Col sm={12}>
                  <MainChart
                    chart_data={chart_data}
                    selected_symbol={selected_symbol}
                    volume_data={volume_data}
                  />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

      </Container>
    </>
  );
}

export default App;
