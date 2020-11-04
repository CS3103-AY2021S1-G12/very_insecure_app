let username = 'Guest';
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
    $('#username-field').text(username);

    let pickUsernameMode = false;
    let pickUsernameText = 'Confirm';
    $('#pick-username').click(() => {

        pickUsernameMode = !pickUsernameMode;
        const temp = pickUsernameText;
        pickUsernameText = $('#pick-username').text();
        $('#pick-username').text(temp);

        if (pickUsernameMode) {
            const input = $('<textarea/>', {
                id: "username-input",
                maxLength: 25,
                rows: 1
            });
            $("#pick-username-container").prepend(input);

        } else {
            username = $("#username-input").val() || username;
            $("#username-field").text(username);
            $("#username-input").remove();
        }
    })

    $('#submit').click(() => {
        let inputText = $('#input').val();
        inputText = inputText.replace(/<script>/gi, "").replace(/<\/script>/gi, "");
        const review = $('<div/>', { class: "review" });

        $(`<div class="username">${username}</div>`).appendTo(review);

        $(`<div class="text">${inputText}</div>`).appendTo(review);

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

    fetch(`${basePath}/xss-3/`)
        .then((res) => {
            if (res.status === 200) {
                $('#success').append(nextLevel);
                done = true;
            }
        });

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
