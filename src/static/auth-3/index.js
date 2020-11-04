const productUrl = "http://localhost:3000/products";

const itemName = $('#itemName').val();

const query = fetch(productUrl, {
    method: 'get',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    name: itemName
})
    .then(response => {
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
            console.log(result);
        }
    });