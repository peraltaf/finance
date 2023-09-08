import { Badge, Card, ListGroup } from 'react-bootstrap';
import './SymbolSelector.css';
import Search from '../Search/Search';


const SymbolSelector = ({ 
    addNewSymbol,
    setSearchVisibility,
    updateSymbol,
    search_research_vis,
    symbol_list,
    symbol
  }) => {
  return (
    <Card className='symbol__selector'>
      <Search
        addNewSymbol={addNewSymbol}
        setSearchVisibility={setSearchVisibility}
        updateSymbol={updateSymbol}
        search_research_vis={search_research_vis}
        trending_symbols={symbol_list}
      />
      <Card.Body>
        <ListGroup>
          {symbol_list ?
            symbol_list.map(d => 
              (<ListGroup.Item 
                  action 
                  active={d.symbol === symbol ? true : false}
                  as='button'
                  onClick={() => updateSymbol([d])}
                  key={d.symbol+d.regularMarketChange}
                  title={d.displayName || d.shortName}
                  className='symbol-selector-item'
                >
                <div className='symbol__selector-cont'>
                  <div className='ms-2 me-auto'>
                    <span className='fw-bold'>{d.symbol}</span>
                  </div>

                  <div>
                    <span className='symbol__selector-price'>{d.regularMarketChange.toFixed(2)}</span>
                    <Badge bg={d.regularMarketChange < 0 ? 'danger' : 'success'} pill>
                      {d.regularMarketChangePercent.toFixed(2)}%
                    </Badge>
                  </div>
                </div>
              </ListGroup.Item>)
            )
            : null
          }
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default SymbolSelector;