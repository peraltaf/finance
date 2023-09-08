import { Card, Table } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import './Details.css';


export const Details = ({ symbol_data }) => {
  return (
    <Card className='data-container'>
      <Card.Header className='text-muted'>Summary</Card.Header>
      <Card.Body>
        <Table size='sm' className='summary-table'>
          {symbol_data.length > 0 && symbol_data.map(d => 
            <tbody key={uuidv4()}>
              <tr>
                <td>
                  <div className='cell'>
                    <span>Previous Close</span>
                    <span className='metric'>{d.regularMarketPreviousClose || 0}</span>
                  </div>
                </td>
                <td>
                <div className='cell'>
                  <span>Open</span>
                  <span className='metric'>{d.regularMarketOpen}</span>
                </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='cell'>
                    <span>Volume</span>
                    <span className='metric'>{Intl.NumberFormat('en-US', {
                      notation: 'compact',
                      maximumFractionDigits: 1
                    }).format(d.regularMarketVolume)}</span>
                  </div>
                </td>
                <td>
                  <div className='cell'>
                    <span>Avg. Volume</span>
                    <span className='metric'>{Intl.NumberFormat('en-US', {
                      notation: 'compact',
                      maximumFractionDigits: 1
                    }).format(d.averageDailyVolume10Day)}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='cell'>
                    <span>Bid</span>
                    <span className='metric'>{d.bid}</span>
                  </div>
                </td>
                <td>
                  <div className='cell'>
                    <span>Ask</span>
                    <span className='metric'>{d.ask}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='cell'>
                    <span>Days Range</span>
                    <span className='metric'>{d.regularMarketDayRange.low} | {d.regularMarketDayRange.high}</span>
                  </div>
                </td>
                <td>
                  <div className='cell'>
                    <span>52 Week Range</span>
                    <span className='metric'>{d.fiftyTwoWeekRange.low} | {d.fiftyTwoWeekRange.high}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='cell'>
                    <span>Market Cap</span>
                    <span className='metric'>{Intl.NumberFormat('en-US', {
                      notation: 'compact',
                      maximumFractionDigits: 1
                    }).format(d.marketCap)}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </Table>
      </Card.Body>
    </Card>
  )
}

export default Details;