'use strict';

const e = React.createElement;

class McapPriceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cryptoData: [] };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    this.interval = setInterval(this.fetchData, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchData() {
    fetch('/mcap/calc')
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          cryptoData: this.updateWithPreviousData(prevState, data),
        }));
      });
  }

  updateWithPreviousData(prevState, data) {
    // TODO
    return data;
  }

  render() {
    const items = this.state.cryptoData
      ? this.state.cryptoData.map((entry, index) =>
          e(
            'tr',
            { class: 'crypto-entry' },
            e(
              'td',
              {
                class: 'square-cell',
              },
              index + 1
            ),
            e(
              'td',
              { class: 'square-cell' },
              e('img', { src: entry.image, class: 'token-icon' }, null)
            ),
            e(
              'td',
              {},
              e(
                'a',
                {
                  class: 'link-dark',
                  href: 'https://www.coingecko.com/en/coins/' + entry.id,
                  target: '_blank',
                },
                entry.name
              )
            ),
            e('td', {}, entry.formatted_price),
            e('td', {}, entry.price_in_btc_mcap),
            e('td', {}, entry.price_in_eth_mcap)
          )
        )
      : '';

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
