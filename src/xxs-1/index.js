$(document).ready(() => {
    $('#submit').click(() => {
        const inputText = $('#input').val();
        $('#reviews').append(`<li>${inputText}</li><br>`);
    })
});
