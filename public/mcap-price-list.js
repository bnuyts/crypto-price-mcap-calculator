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
        'div',
        { class: 'crypto-entry' },
        e('img', { src: entry.image, class: 'token-icon' }, null),
        `${entry.name} - ${entry.current_price} - ${entry.price_in_btc_mcap} - ${entry.price_in_eth_mcap}`
      )
    );
    return e('div', {}, items);
  }
}

const domContainer = document.querySelector('#mcap-price-list-container');
ReactDOM.render(e(McapPriceList), domContainer);
