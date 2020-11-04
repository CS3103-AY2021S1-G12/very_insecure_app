let done = false;
const basePath = window.location.href
    .split('/')
    .slice(0, -2)
    .join('/');

const nextLevel = $('<button/>', {
    text: 'Next Level',
    click: () => {
        window.location.href = `${basePath}/xss-3/`;
    }
});

$(document).ready(() => {
    fetch(`${basePath}/xss-3/`)
        .then((res) => {
            if (res.status === 200) {
                $('#success').append(nextLevel);
                done = true;
            }
        });

    $('#submit').click(() => {
        let inputText = $('#input').val();
        inputText = inputText.replace(/<script>/gi, "").replace(/<\/script>/gi, "");
        const review = $('<div/>', { class: "review" });

        $('<div/>', {
            text: 'Guest',
            class: "username"
        }).appendTo(review);

        $(`<div class="text">${inputText}<div/>`).appendTo(review);

        $('#reviews').append(review);
    });

    const originalAlert = window.alert;
    window.alert = (msg) => {
        if (!done) {
            fetch(`${window.location.href}\x77\x69\x6e\x63\x6f\x6e\x64\x69\x74\x69\x6f\x6e`);
            $('#success').append(nextLevel);
            done = true;
        }
        originalAlert('Good job!');
    }
});
