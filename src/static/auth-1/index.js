const basePath = window.location.href
  .split('/')
  .slice(0, -2)
  .join('/');
const promoUrl = `${basePath}/admin/promo`;

let promo;

$('#promo-btn').click(() => {
  fetch(promoUrl)
    .then(response => {
      if (response.status === 200) {
        return response.text()
          .then(text => [true, text]);
      } else {
        return response.text()
          .then(text => [false, text])
      }
    })
    .then(([success, text]) => {
      if (success) {
        $('#promo-code').html(text);
        promo = text;
      } else {
        alert(`Server responded with: ${text}`);
      }
    })
});

$('#checkout-btn').click(() => {
  if (!promo) {
    alert("You have not gotten the promo code!")
  } else {
    const body = JSON.stringify({
      code: promo
    });
    fetch(promoUrl, {
      method: 'post',
      body: body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.status === 200) {
        alert("Congratulations!!!");
      } else {
        alert("Your promo code appears to be invalid!");
      }
    })
  }
});