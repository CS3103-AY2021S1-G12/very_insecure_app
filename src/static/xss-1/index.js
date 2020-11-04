let done = false;

$(document).ready(() => {
    $('#submit').click(() => {
        const inputText = $('#input').val();
        $('#reviews').append(`<li>${inputText}</li><br>`);
    });

    const originalAlert = window.alert;
    window.alert = (msg) => {
        if (!done) {
            fetch(`${window.location.href}\x77\x69\x6e\x63\x6f\x6e\x64\x69\x74\x69\x6f\x6e`);
            const nextLevel = $('<button/>', {
                text: 'Next Level',
                click: () => {
                    const basePath = window.location.href
                        .split('/')
                        .slice(0, -2)
                        .join('/');
                    window.location.href = `${basePath}/xss-2`;
                }
            })
            $('#success').append(nextLevel);
            done = true;
        }
        originalAlert('Good job!');
    }
});
