let done = false;
const basePath = window.location.href
    .split('/')
    .slice(0, -2)
    .join('/');

const nextLevel = $('<button/>', {
    text: 'Next Level',
    click: () => {
        window.location.href = `${basePath}/xss-2/`;
    }
});

$(document).ready(() => {
    fetch(`${basePath}/xss-2/`)
        .then((res) => {
            if (res.status === 200) {
                $('#success').append(nextLevel);
                done = true;
            }
        });

    $('#submit').click(() => {
        const inputText = $('#input').val();
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
        if (fromConsole()) {
            originalAlert('Nice try! Don\'t use the console :)');
            return;
        }

        if (!done) {
            fetch(`${window.location.href}\x77\x69\x6e\x63\x6f\x6e\x64\x69\x74\x69\x6f\x6e`);
            $('#success').append(nextLevel);
            done = true;
        }
        originalAlert('Good job!');
    }
});

function fromConsole() {
    let wasConsole = typeof keys === 'function' && keys.toString().indexOf('Command Line API') !== -1;
    if (wasConsole) {
        return true;
    }

    let stack;
    try {
        throw new Error();
    }
    catch (e) {
        stack = e.stack;
    }
    if (!stack)
        return false;

    var lines = stack.split("\n");
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].indexOf("at Object.InjectedScript.") >= 0)
            return true;   // Chrome console
        if (lines[i].indexOf("@debugger eval code") == 0)
            return true;   // Firefox console
        if (lines[i].indexOf("_evaluateOn") == 0)
            return true;   // Safari console
    }
    return false;
}