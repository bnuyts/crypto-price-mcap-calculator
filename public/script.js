const mcapListEl = document.getElementById('mcap-price-list');

fetch('/mcap/calc')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((entry) => {
      var eleDiv = document.createElement('div');
      var eleText = document.createTextNode(
        `${entry.name} - ${entry.current_price} - ${entry.price_in_btc_mcap} - ${entry.price_in_eth_mcap}`
      );
      eleDiv.appendChild(eleText);
      mcapListEl.appendChild(eleDiv);
    });
  });
