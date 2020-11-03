let done = false;

$(document).ready(() => {
    $('#submit').click(() => {
        const inputText = $('#input').val();
        $('#reviews').append(`<li>${inputText}</li><br>`);
    });

    const originalAlert = window.alert;
    window.alert = (msg) => {
        if (!done) {
            $('#success').append(`<button>Next level</button>`);
            done = true;
        }
        originalAlert('Good job!');
    }
});
