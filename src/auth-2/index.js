const loginUrl = "http://localhost:3000/login";

let isLoggedIn = false;

$('#login-form').submit(e => {
  e.preventDefault();

  if (isLoggedIn) {
    alert("Already logged in!");
    return;
  }

  const username = $('#username').val();
  const password = $('#password').val();

  const body = JSON.stringify({
    username: username,
    password: password
  });

  fetch(loginUrl, {
    method: 'post',
    body: body,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
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
        isLoggedIn = true;
        $('#id').html(`Id: ${result.id}`);
        $('#profile').html(`Username: ${result.username}`);
        $('#id').css('display', 'block');
        $('#profile').css('display', 'block');
        $('#logout').css('display', 'block');
        $('#message').css('display', 'none');
      }
    })
})

$('#logout').click(() => {
  isLoggedIn = false;
  $('#id').html('');
  $('#profile').html('');
  $('#id').css('display', 'none');
  $('#profile').css('display', 'none');
  $('#logout').css('display', 'none');
  $('#message').css('display', 'block');
});