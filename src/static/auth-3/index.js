const basePath = window.location.href
    .split('/')
    .slice(0, -2)
    .join('/');
const productUrl = `${basePath}/products`;



$('#search-bar').submit(e => {
    e.preventDefault();
    const itemName = $('#item_name').val();
    const searchUrl = `${productUrl}?name=${itemName}`
    fetch(searchUrl, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            console.log(response);
            if (response.status === 200) {
                return response.json()
                    .then(user => [response.status, user]);
            } else {
                return response.text()
                    .then(message => [response.status, message]);
            }
        })
        .then(([status, result]) => {
            if (status === 400) {
                alert("Invalid credentials provided!");
            } else if (status === 500) {
                alert(`Server responded with error: ${result}`);
            } else {
                $(function () {
                    var data = [];

                    $(result).map(function (i, item) {
                        data.push('<li>' + "Item:" + item.item_name + " selling at price $" + parseFloat(item.price).toFixed(2) + '</li>');
                    });
                    $('#search-results').empty().append(data);
                })
            }
        })
});