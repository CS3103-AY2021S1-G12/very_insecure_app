import $ from 'jquery'

let done = false;
const basePath = window.location.href
    .split('/')
    .slice(0, -2)
    .join('/');

const nextLevel = $('<button/>', {
    text: 'Next Level',
    click: () => {
        window.location.href = `${basePath}/xss-final/`;
    }
});
