<template>
  <div class="home">
    <div class="navbar">
      <div class="logo">
        CHEW SHIFU'S
        <div class="sub">GUIDE TO CYBERSECURITY EXCELLENCE</div>
      </div>
      <div class="navx">
        <div class="item">
          <span class="progress">{{ points }}</span><span class="writeup"> / 5000 Points</span>
          <br/>
          <span class="writeup">You're almost there!</span>
        </div>
      </div>
    </div>
    <div class="main" v-if="main_page == 1">
      <div class="landing">
        <img src="https://kit8.net/images/detailed/3/Guy_and_computer.png"/>
        <div class="title">Welcome to Chew Shifu's<sup>TM</sup> Guide</div>
        <div class="sub-title">This guide is free to use - do whatever you'd like (go ham).</div>
        <div class="button" @click="main_page = 2">Let's get started</div>
      </div>
    </div>
    <div class="main" v-if="main_page == 3">
      <div class="landing">
        <div class="title">Let's see how you did.</div>
        <div class="sub-title">Congratulations! Your score of <span class="b">{{ points }}</span> puts you in the top <span class="b">99%</span> of users - great job!<br/>Keep up the progress on your cybersecurity journey, we're sure you'll do just fine.</div>
        <div class="row spacer">
          <div class="h">SQL Injection</div>
          <div class="v"><span class="b">{{ auth_points }}</span> Points</div>
        </div>
        <div class="row line-bottom">
          <div class="h">XSS Attacks</div>
          <div class="v"><span class="b">{{ xss_points }}</span> Points</div>
        </div>
        <div class="row spacer-bottom">
          <div class="h">Total</div>
          <div class="v"><span class="b">{{ points }}</span> Points</div>
        </div>
        <div class="button" @click="reload()">Start Over</div>
      </div>
    </div>
    <div class="main" v-if="main_page == 2">
      <div class="sidebar">
        <div class="chat" @click="selected = 1" :class="{'selected': selected === 1}">
          <div class="meal">{{ xss_pts }}</div>
          <div class="name">XSS Attacks</div>
          <span class="progress">{{ xss_points }}</span><span class="writeup"> / 2500 Points</span>
        </div>
        <div class="chat" @click="selected = 2" :class="{'selected': selected === 2}">
          <div class="meal">{{ auth_pts }}</div>
          <div class="name">Authentication Attacks</div>
          <span class="progress">{{ auth_points }}</span><span class="writeup"> / 2500 Points</span>
        </div>
        <div class="copyright" @click="reload()">Want to try again? Start over</div>
      </div>
      <div class="main-wrapper">
        <div class="progress-bar">
          <div class="name">{{ (selected == 1) ? "XSS Attacks" : "Authentication Attacks"}} (Part {{ sub_selected }})</div>
          <div class="pb-wrapper">
            <div class="points">
              <span class="progress">{{ (selected == 1) ?  xss_points : auth_points }}</span><span class="writeup"> Points</span>
            </div>
            <div class="bar" v-if="selected == 1">
							<template v-for="i in [1,2,3]">
	              <div class="indiv-bar" :key="'xss' + i" @click="sub_selected = i; reset()" v-bind:class="{filled: completed_xss_tasks.includes(i)}"></div>
							</template>
            </div>
            <div class="bar" v-if="selected == 2">
							<template v-for="i in [1,2,3]">
	              <div class="indiv-bar" :key="'auth' + i" @click="sub_selected = i; reset()" v-bind:class="{filled: completed_auth_tasks.includes(i)}"></div>
							</template>
            </div>
          </div>
        </div>
        <div class="content" v-if="selected === 1">
					<div class="profile-container">
						<div>
							<div class="username">Signed in as:</div>
							<div id="username-field">Guest</div>
						</div>
						<div id="pick-username-container" style="display: flex; flex-direction: row; flex-grow:1; justify-content:flex-end">
								<input id="username-input" placeholder="Username" style="max-width: 300px; margin:0 1rem 0 0"/>
								<button id="pick-username" class="def-button" @click="changeusername()">Select username</button>
						</div>
					</div>
          <div v-if="sub_selected === 1">
						<div class="reviews-container">
								<div style="display: flex">
									<div class="product-container">
											<img src="../assets/cookies.jpg" />
											<div class="title">
												Cookies
												<br/>
												<div class="subtitle">$999</div>
											</div>
									</div>

									<div style="margin-left: 1rem">
											<h1>Reviews</h1>
											<div id="reviews1">
												<div class="review">
														<div class="username">Cookie Monster:</div>
														<div class="text">Best cookies ever</div>
												</div>
												<div class="review">
														<div class="username">Elsie-Rose Cooley:</div>
														<div class="text">This Cookies works excessively well. It mortally improves my golf by a lot.</div>
												</div>
												<div class="review">
														<div class="username">Guo Shun:</div>
														<div class="text">My locust loves to play with it.</div>
												</div>
												<div class="review">
														<div class="username">Rick Forster:</div>
														<div class="text">This Cookies works outstandingly well. It beautifully improves my basketball by a lot.</div>
												</div>
												<div class="review">
														<div class="username">PM_ME_COOKIE_PICTURES:</div>
														<div class="text">nice cookie picture</div>
												</div>
											</div>

											<div class="submit-container">
													<textarea id="input1"></textarea><br>
													<button id="submit1" class="def-button" @click="runSubmit(1)">Submit</button><br>
											</div>
									</div>
								</div>

						</div>
          </div>
          <div v-if="sub_selected === 2">
						<div class="reviews-container">
								<div style="display: flex">
									<div class="product-container">
											<img src="../assets/hacking-book.jpg" />
											<div class="title">
												Book
												<br/>
												<div class="subtitle">$1,499</div>
											</div>
									</div>
									<div style="margin-left: 1rem">
										<h1>Reviews</h1>
										<div id="reviews2">
												<div class="review">
														<div class="username">Mallory:</div>
														<div class="text">Learned all my hacking from here</div>
												</div>
												<div class="review">
														<div class="username">Cohan Barron:</div>
														<div class="text">This Hacking book works very well. It persistently improves my soccer by a lot.</div>
												</div>
												<div class="review">
														<div class="username">Funny guy:</div>
														<div class="text">
															What’s a hacker’s favorite season?
															Phishing season.
														</div>
												</div>
												<div class="review">
														<div class="username">Tobias Leonard:</div>
														<div class="text">My demon loves to play with it.</div>
												</div>
										</div>

										<div class="submit-container">
												<textarea id="input2"></textarea><br>
												<button id="submit2" class="def-button" @click="runSubmit(2)">Submit</button><br>
										</div>
									</div>
								</div>
						</div>
		  </div>
          <div v-if="sub_selected === 3">
						<div class="reviews-container">
								<div style="display: flex">
									<div class="product-container">
											<img src="../assets/yubikey.jpg" />
											<div class="title">
												YubiKey
												<br/>
												<div class="subtitle">$1,999</div>
											</div>
									</div>
									<div style="margin-left: 1rem">

											<h1>Reviews</h1>

											<div id="reviews3">
													<div class="review">
															<div class="username">Guy:</div>
															<div class="text">Bad. Can't copy my files on to it</div>
													</div>
													<div class="review">
															<div class="username">Xiao Ming:</div>
															<div class="text">Fake</div>
													</div>
													<div class="review">
															<div class="username">Orla Pollard</div>
															<div class="text">one of my hobbies is programming. and when i'm programming this works great.</div>
													</div>
													<div class="review">
															<div class="username">Alice:</div>
															<div class="text">this YubiKey is tasty</div>
													</div>
											</div>

											<div class="submit-container">
													<textarea id="input3"></textarea><br>
													<button id="submit3" class="def-button" @click="runSubmit(3)">Submit</button><br>
											</div>
									</div>
								</div>

						</div>
					</div>
        </div>
        <div class="content" v-if="selected === 2">
          <div v-if="sub_selected === 1">

						<div class="cart">
						<h1>Cart checkout</h1>
							<div class="cart-item">
								<div>
									<div class="title">Cookies</div>
									<div class="subtitle">$999</div>
								</div>
								<img src="../assets/cookies.jpg" />
							</div>
							<div class="cart-item">
								<div>
									<div class="title">Book</div>
									<div class="subtitle">$999</div>
								</div>
								<img src="../assets/hacking-book.jpg" />
							</div>
							<div class="cart-toolbar">
								<div>
									<div>Promo code (only available for admins):</div>
									<div id="promo-code" class="subtitle">NIL</div>
								</div>
								<div class="cart-btn-container">
									<button class="def-button" id="checkout-btn" @click="checkout()">Check out</button>
									<button class="def-button" style="margin-right: 1rem" id="promo-btn" @click="promo()">Get promo</button>
								</div>
							</div>
						</div>
					</div>
          <div v-if="sub_selected === 2">


						<div class="profile-container">
							<div>
								<h2>Profile:</h2>
								<div id="message">Not logged in!</div>
								<div id="id">a</div>
								<div id="profile">a</div>
							</div>
							<div>
								<div id="logout" @click="logout" class="def-button">Log out</div>
							</div>
						</div>
						<form class="login-form" id="login-form">
							<h1>Login</h1>
							<div>
								<input placeholder="Username" name="username" type="text" id="username" class="special" />
							</div>
							<div>
								<input placeholder="Password" name="password" type="password" id="password"  class="special" />
							</div>
							<div>
								<div @click="login()" class="def-button">Log In</div>
							</div>
							<div class="subtitle" style="font-weight:normal; text-transform: none; padding: 20px; background-color: #F4F7F8; color: #444">
								Guests can log in with the username `guest` and password `guest`.
							</div>

						</form>

					</div>
          <div v-if="sub_selected === 3">
						<div class="topnav">
								<a class="active" href="#home">Products</a>
								<a href="#news">News</a>
								<a href="#contact">Contact</a>
								<a href="#about">About</a>
						</div>

						<form class="search-bar" id="search-bar" method="GET" action="/">
								<div style="display: flex;">
										<input name="item_name" class="special" type="text" id="item_name" style="margin: 0" />
										<div @click="search()" class="def-button" style="max-width: 120px; margin-left: 1rem; display: flex; justify-content: center; align-items: center;">Search</div>
								</div>
							<div id="list" style="margin-top: 40px; padding: 0px;">
									<ul id="search-results">
										
									</ul>
							</div>

							<div style="display: flex;">
								<input id="promo_code_3" placeholder="Promo Code" type="text" style="margin: 0; width: 200px;" />
								<div @click="applypromo()" class="def-button" style="max-width: 150px; margin-left: 1rem; display: flex; justify-content: center; align-items: center;">Apply Promo</div>
							</div>
						</form>

					</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

<script>
import $ from 'jquery'

import "../static/xss-1/index"
import "../static/xss-2/index"
import "../static/xss-3/index"
import "../static/auth-1/index"
import "../static/auth-2/index"
import "../static/auth-3/index"
require('../static/xss-1/style.css')
require('../static/xss-2/style.css')
require('../static/xss-3/style.css')
require('../static/auth-1/style.css')
require('../static/auth-2/style.css')
require('../static/auth-3/style.css')

const basePath = window.location.origin;
const promoUrl = `${basePath}/admin/promo`;
const loginUrl = `${basePath}/login`;
const productUrl = `${basePath}/products`;
const successText = "Good job!"
const originalAlert = window.alert;
let promo;
let a = {
  name: 'Home',
  created: function () {
    this.showAlert = false;
    setTimeout(() => { this.showAlert = true; }, 5000)
	},
  data: function () {
    return {
      selected: 1,
      sub_selected: 1,
      main_page: 1,
      showAlert: false,
			xss_points: 0,
			auth_points: 0,
			completed_xss_tasks: [],
			completed_auth_tasks: [],
			isLoggedIn: false,
    }
	},
	computed: {
		points: function() {
			return this.xss_points + this.auth_points;
		},
		auth_pts: function() {
			let p = this.auth_points;
			return (p == 0) ? "NOT STARTED" : (p == 2500) ? "COMPLETED" : "IN PROGRESS"
		},
		xss_pts: function() {
			let p = this.xss_points;
			return (p == 0) ? "NOT STARTED" : (p == 2500) ? "COMPLETED" : "IN PROGRESS"
		}
	},
	methods: {
		search: function() {
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
                originalAlert("Invalid credentials provided!");
            } else if (status === 500) {
                originalAlert(`Server responded with error: ${result}`);
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
		},
		applypromo: function () {
			const secret = $('#promo_code_3').val();
			if (secret === "3103ISTHEBEST") {
                originalAlert(successText);
				this.updatex('auth', 3);
			} else {
                originalAlert("Invalid promo code provided!");
			}

		},
		runSubmit: function(i) {
            window.alert = (msg) => {
                if (fromConsole()) {
                    originalAlert('Nice try! Don\'t use the console :)');
                    return;
                }

                // fetch(`${window.location.href}\x77\x69\x6e\x63\x6f\x6e\x64\x69\x74\x69\x6f\x6e`);
                originalAlert(successText);
                this.updatex('xss', i);
            }
      
            if (i === 1) {
                let username = $("#username-field").text();
                let inputText = $('#input'+i).val();

                const review = $('<div/>', { class: "review" });
                    
                $(`<div class="username">${username}</div>`).appendTo(review);

                $(`<div class="text">${inputText}</div>`).appendTo(review);

                $('#reviews' + i).append(review);
                
            } else if (i === 2) {
                let username = $("#username-field").text();
                let inputText = $('#input'+i).val();
                inputText = inputText.replace(/<script>/gi, "").replace(/<\/script>/gi, "");

                const review = $('<div/>', { class: "review" });
            
                $(`<div class="username">${username}</div>`).appendTo(review);
            
                $(`<div class="text">${inputText}</div>`).appendTo(review);
            
                $('#reviews2').append(review);

            } else {
                let username = $("#username-field").text();
                let inputText = $('#input'+i).val();
                
                const review = $('<div/>', { class: "review" });
                    
                $(`<div class="username">${username}</div>`).appendTo(review);

                $('<div/>', {
                    text: inputText,
                    class: "text"
                }).appendTo(review);
                
                $('#reviews' + i).append(review);
			}
		},
		changeusername : function () {
            let username = $("#username-input").val();
            $("#username-field").text(username || "Guest");
		},
		updatex: function (a, b) {
	    var vm = this;
			if (a == 'xss') {
				if (!vm.completed_xss_tasks.includes(b)) {
					vm.xss_points += [500, 900, 1100][b-1];
				}
				vm.completed_xss_tasks.push(b);
			} else {
				if (!vm.completed_auth_tasks.includes(b)) {
					vm.auth_points += [500, 900, 1100][b-1];
				}
				vm.completed_auth_tasks.push(b);
			}
			if ((this.auth_points + this.xss_points) === 5000) {
				this.main_page = 3;
			} else {
				if (b <= 2) {
					this.sub_selected = b+1;
					this.reset();
				} else {
					this.selected = ((this.selected) % 2) + 1;
					this.sub_selected = 1;
				}
			}
		},
		
		reset: function() {
			$('#input1').val("");
			$('#input2').val("");
			$('#input3').val("");
		},

		promo: function () {
			fetch(promoUrl)
				.then(response => {
					if (response.status === 200) {
						return response.text()
							.then(text => [true, text]);
					} else {
						return response.text()
							.then(text => [false, text])
					}
				})
				.then(([success, text]) => {
					if (success) {
						$('#promo-code').html(text);
						promo = text;
					} else {
						originalAlert(`Server responded with: ${text}`);
					}
				})
		}, 

		checkout: function ()  {

				if (!promo) {
					originalAlert("You have not gotten the promo code!")
				} else {
					const body = JSON.stringify({
						code: promo
					});
					fetch(promoUrl, {
						method: 'post',
						body: body,
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						}
					}).then(response => {
						if (response.status === 200) {
							originalAlert(successText);
							this.updatex('auth', 1);
						} else {
							originalAlert("Your promo code appears to be invalid!");
						}
					})
				}
			},
			reload: function () {
				location.reload();
			},

			login : function () {
				if (this.isLoggedIn) {
					originalAlert("Already logged in!");
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
							originalAlert("Invalid credentials provided!");
						} else if (status === 500) {
							originalAlert(`Server responded with error: ${result}`);
						} else {
							originalAlert(successText);
							this.updatex('auth', 2);
						}
					})
	}, 

	logout: function () {
		this.isLoggedIn = false;
		$('#id').html('');
		$('#profile').html('');
		$('#id').css('display', 'none');
		$('#profile').css('display', 'none');
		$('#logout').css('display', 'none');
		$('#message').css('display', 'block');

	}

		}
	}

export default a 

function fromConsole () {
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


</script>

<style scoped>
.def-button {
  padding: 1rem 1.5rem;
	background-color: teal;
	color: white;
	display: inline-block;
  border-radius: 2px;
	font-size: 0.8rem;
	letter-spacing: 1px;
	text-transform: uppercase;
	border-radius: 5px;
	border: 0;
	cursor: pointer;
}
.alert {
  background-color: #FF6961;
  color: #fff;
  width: calc(100% + 80px);
  margin-left: -40px;
  margin-top: -40px;
  padding: 10px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  margin-bottom: 20px;
}
input, textarea {
  width: 100%;
  border: 0;
  font-size: 1.2rem;
  margin: 20px 0;
  border-bottom: 1px dashed #ccc;
  padding: 10px;
}
input.special {
	background-color: #444;
	color: white;
	border-bottom: 0;
	margin: 10px 0;
	padding: 20px;
	width: 100%;
	border-radius: 5px;
}
textarea {
	border: 1px solid #ccc;
	border-radius: 10px;
	width: 100%;
  font-size: 1.2rem;
}
input:focus {
  outline: 0;
}
.text {
  color: #777;
}
.bubble {
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;;
}
hr {
  margin: 20px 0;
}
.details {
  font-size: 14px;
  letter-spacing: 1px;
  margin-bottom: 10px;
  text-transform: uppercase;
}
.cols {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 40px;
}
.col {
  width: 45%;
  position: relative;
}
.main-date {
  font-size: 16px;
}
.pre {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 14px;
}
.home {
  height: 100vh;
  margin: 0;
  padding: 0;
}
.navbar {
  border-bottom: 1px solid #eaeaea;
  background-color: #fff;
  display: flex;
  padding: 20px 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 99999;
}
.navx {
  display: flex;
  align-items: center;
}
.navx .item {
  margin: 0 15px;
  color: #777;
  text-align: right;
}
.main {
  position: relative;
  display: flex;
  min-height: 100%;
}
.sidebar {
  background-color: teal;
  flex: 0 1 300px;
  min-width: 350px;
  border-right: 1px solid #eaeaea;
  min-height: 100%;
  position: relative;
}
.content {
  flex: 1 1 auto;
	background-color: #fff;
	flex-direction: column;
  text-align: left;
}
.profile {
  display: flex;
  align-items: center;
}
.rounded {
   background-color: #00a4df;
   width: 30px;
   height: 30px;
   display: flex;
   align-items: center;
   justify-content: center;
   color: #fff;
   border-radius: 50%;
   margin-left: 30px;
   margin-right: 10px;
}
.chat {
  background-color: #eee;
  opacity: 0.8;
  padding: 20px;
  text-align: left;
  cursor: pointer;
  transition: 0.5s all;
}
.chat.selected {
  background-color: #fff;
  opacity: 1;
}
.chat:hover {
  background-color: #f4f4f4;
  opacity: 1;
}
.meal {
  padding: 5px 10px;
  color: #777;
  border: 1px solid #aaa;
  display: inline-block;
  border-radius: 2px;
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.date {
  font-size: 12px;
  text-transform: uppercase;
  color: #444;
  margin-bottom: 5px;
}
.name {
  font-size: 1.4rem;
  font-weight: bold;
  color: #444;
  margin-bottom: 10px;
}
.status {
  font-size: 14px;
}
.copyright {
  color: #FFF;
  margin-top: 3rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
}
.filter {
  background-color: #FFF;
  font-size: 12px;
  color: #777;
  text-align: left;
  padding: 20px;
}
.param:hover {
  cursor: pointer;
  color: #444;
}
.param.selected {
  font-weight: bold;
  color: #000;
}
.create {
  background-color: #00b9ff;
  padding: 10px 20px;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
  text-align: center;
  cursor: pointer;
}
.progress {
  color: teal;
  font-weight: bold;
  font-size: 1.2rem;
}
.writeup {
  text-transform: uppercase;
  font-size: 0.7rem;
  letter-spacing: 1px;
}
.progress-bar {
  padding: 20px;
  border-bottom: 1px solid #eaeaea;
  width: 100%;
  text-align: left;
}
.pb-wrapper {
  display: flex;
  align-items: center;
}
.progress-bar .points {
  text-align: left;
}
.progress-bar .bar {
  text-align: right;
  flex-grow: 1;
  display: flex;
	margin-left: 50px;
}
.progress-bar .bar .indiv-bar{
  background-color: #DDD;
  display: inline-block;
  position: relative;
  cursor: pointer;
  margin-left: .5%;
  margin-right: .5%;
  height: 8px;
  border-radius: 4px;
	flex-grow: 1;
}
.progress-bar .bar .indiv-bar.filled{
  background-color: teal;
}
.main-wrapper {
  width: 100%;
}
.logo {
  color: teal;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 2rem;
}
.logo .sub {
  font-weight: normal;
  font-size: 0.7rem;
  letter-spacing: 1px;
  color: #777;
}
.landing {
  width: 100%;
  padding: 20px;
}
.landing img {
  width: 40%;
}
.landing .title {
  font-size: 2.4rem;
  font-weight: bold;
}
.landing .button {
  padding: 1rem 5rem;
  background-color: teal;
  border-radius: 1rem;
  display: inline-block;
  color: white;
  font-weight: bold;
  text-transform:uppercase;
  letter-spacing: 1px;
  margin-top: 2rem;
  cursor: pointer;
}
.row.spacer {
  margin-top: 50px;
}
.row.spacer-bottom {
  margin-bottom: 50px;
}
.row.line-bottom {
  border-bottom: 1px solid #DDD;
}
.row {
  width: 50%;
  left: 25%;
  position: relative;
  display: flex;
  padding: 5px 0;
  align-items: center;
}
.row .h {
  font-weight: bold;
  font-size: 1.2rem;
}
.row .v {
  flex-grow: 1;
  text-align: right ;
}
.b {
  font-weight: bold;
  color: teal;
}
</style>
