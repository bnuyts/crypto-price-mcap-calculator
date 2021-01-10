'use strict';

const e = React.createElement;

class McapPriceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cryptoData: [] };
  }

  componentDidMount() {
    fetch('/mcap/calc')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ cryptoData: data });
      });
  }

  render() {
    const items = this.state.cryptoData.map((entry) =>
      e(
        'tr',
        { class: 'crypto-entry' },
        e(
          'td',
          { class: 'icon-cell' },
          e('img', { src: entry.image, class: 'token-icon' }, null)
        ),
        e('td', {}, entry.name),
        e('td', {}, entry.current_price),
        e('td', {}, entry.price_in_btc_mcap),
        e('td', {}, entry.price_in_eth_mcap)
      )
    );
    return e(
      'table',
      { class: 'table' },
      e(
        'thead',
        {},
        e(
          'tr',
          {},
          e('th', {}, ''),
          e('th', {}, 'name'),
          e('th', {}, 'current price'),
          e('th', {}, 'price in BTC mcap'),
          e('th', {}, 'price in ETH mcap')
        )
      ),
      e('tbody', {}, items)
    );
  }
}

const domContainer = document.querySelector('#mcap-price-list-container');
ReactDOM.render(e(McapPriceList), domContainer);
