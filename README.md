# selling.github.io
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon server.js",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mongoose": "^6.6.5"
  }
}
onst mongoose = require('mongoose');

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String
    },
    user_email: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    }
});




const User = mongoose.model('User', UserSchema);

module.exports = { User };

const express = require('express');
const app = express();
const port = 3000;

app.use(require('cors')());

const mongoose = require('mongoose');
const { User } = require('./schema');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
    try {
        mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log('Connected to MongoDB');
        }).catch((e) => {
            console.log('Error connecting to MongoDB');
        });
    } catch (err) {
        console.log('Error connecting to MongoDB', err);
    }
})();


app.post('/register', async (req, res) => {
    try {

        let user = await User.create(req.body);
        res.status(201).send(user);

    } catch (error) {

        res.status(500).send(error);
    }
})

app.post('/login', async (req, res) => {
    try {
        let { username, password } = req.body;
        let user = await User.findOne({ username: username, password: password });
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(404).send('User not found');
        }

    } catch (error) {

        res.status(500).send(error);
    }
});

app.get('/users', async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});





app.listen(port, () => {
    console.log('server is up and running on port numner ' + port);
})

<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

.column {
  float: left;
  width: 33.3%;
  margin-bottom: 16px;
  padding: 0 8px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
}

.about-section {
  padding: 50px;
  text-align: center;
  background-color: #474e5d;
  color: white;
}

.container {
  padding: 0 16px;
}

.container::after, .row::after {
  content: "";
  clear: both;
  display: table;
}

.title {
  color: grey;
}

.button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  background-color: #555;
}

@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    display: block;
  }
}
</style>
</head>
<body>

<div class="about-section">
  <h1>About Us Page</h1>
  <p>Some text about who we are and what we do.</p>
  <p>Resize the browser window to see that this page is responsive by the way.</p>
</div>

<h2 style="text-align:center">Our Team</h2>
<div class="row">
  <div class="column">
    <div class="card">
      <img src="/w3images/team1.jpg" alt="Jane" style="width:100%">
      <div class="container">
        <h2>Jane Doe</h2>
        <p class="title">CEO & Founder</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>jane@example.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src="/w3images/team2.jpg" alt="Mike" style="width:100%">
      <div class="container">
        <h2>Mike Ross</h2>
        <p class="title">Art Director</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>mike@example.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src="/w3images/team3.jpg" alt="John" style="width:100%">
      <div class="container">
        <h2>John Doe</h2>
        <p class="title">Designer</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>john@example.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>
</div>

</body>
</html>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>

<body>
    <div style="background-color: green; color:white; display: flex; align-items: center; justify-content: center;">
        You are logged in
    </div>
    <ul>
        <li id="name">name: </li>


        <li id="username">username: </li>
    </ul>
    <button id="logout">Logout</button>
    <script>
        let token = localStorage.getItem('user')
        if (!token) {
            window.location.href = '/login.html'
        }

        else {
            token = JSON.parse(token)
            console.log(token)
            document.getElementById("name").innerHTML = `name: ${token.name}`

            document.getElementById("username").innerHTML = `username: ${token.username}`
        }

        document.getElementById("logout").addEventListener('click', () => {
            localStorage.removeItem('user')
            window.location.href = '/login.html'
        })

    </script>
</body>

</html>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Index</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>

<body>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Demo Website</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/login.html">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/reg.html">Signup</a>
                    </li>

                </ul>
            </div>
        </div>
    </nav>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.1.3/axios.min.js"
        integrity="sha512-0qU9M9jfqPw6FKkPafM3gy2CBAvUWnYVOfNPDYKVuRTel1PrciTj+a9P3loJB+j0QmN2Y0JYQmkBBS8W+mbezg=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"></script>

</body>

</html>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>

<body>
<nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Demo Website</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/login.html">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/reg.html">Signup</a>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
    <div class="row">
        <div class="col-lg-4">

        </div>
        <div class="col-lg-4">
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1"> Username</label>
                    <input type="text" class="form-control" id="username" aria-describedby="emailHelp"
                        placeholder="Enter email">

                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password">
                </div>

                <button type="submit" id="login" class="btn btn-primary">Login</button>

                <button type="submit" class="btn btn-success">
                    <a href="/reg.html">Signup</a></button>
            </form>
        </div>
        <div class="col-lg-4">

        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.1.3/axios.min.js"
        integrity="sha512-0qU9M9jfqPw6FKkPafM3gy2CBAvUWnYVOfNPDYKVuRTel1PrciTj+a9P3loJB+j0QmN2Y0JYQmkBBS8W+mbezg=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"></script>

    <script>

        $(document).ready(function () {
            console.log("ready!");
            var user = localStorage.getItem("user");
            if (user) {
                document.location.href="/home.html";
            }
            $("#login").click(function (e) {
                e.preventDefault();
                console.log("login clicked");
                var username = $("#username").val();
                var password = $("#password").val();
                console.log(username);
                console.log(password);
                axios.post('http://localhost:3000/login', {
                    username: username,
                    password: password
                })
                    .then(function (response) {
                        console.log(response.data);
                        localStorage.setItem("user", JSON.stringify(response.data));
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
        });

    </script>
</body>

</html>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>

<body>
    <div id="message"
        style="background-color: green; display: flex; align-items: center; justify-content: center; width:100%; height: 60px; ">

    </div>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Demo Website</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/login.html">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/reg.html">Signup</a>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
    <div class="row">
        <div class="col-lg-4">

        </div>
        <div class="col-lg-4">
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input type="email" class="form-control" id="name" aria-describedby="emailHelp"
                        placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Username</label>
                    <input type="text" class="form-control" id="username" placeholder="Password">
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp"
                        placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
                        else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password">
                </div>

                <button type="submit" id="signup" class="btn btn-primary">Signup</button>

                <button type="submit" class="btn btn-success">
                    <a href="/login.html">Login</a></button>
            </form>
        </div>
        <div class="col-lg-4">

        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.1.3/axios.min.js"
        integrity="sha512-0qU9M9jfqPw6FKkPafM3gy2CBAvUWnYVOfNPDYKVuRTel1PrciTj+a9P3loJB+j0QmN2Y0JYQmkBBS8W+mbezg=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"></script>
    <script>

        $(document).ready(function () {
            console.log("ready!");
            var user = localStorage.getItem("user");
            if (user) {
                document.location.href = "/home.html";
            }
        });

        var message = document.getElementById("message");
        message.style.display = "none";
        var submit = document.getElementById("signup");

        submit.addEventListener("click", function (e) {
            var name = document.getElementById("name").value;
            var username = document.getElementById("username").value;
            var email = document.getElementById("email").value;
            var password = document.getElementById("password").value;

            e.preventDefault();
            var data = {
                name: name,
                username: username,
                email: email,
                password: password
            }
            axiosCall(data);

        })


        function axiosCall(data) {
            axios.post("http://localhost:3000/register", data)
                .then(function (response) {
                    console.log(response);
                    message.innerHTML = "Registration Successful";
                    message.style.display = "block";
                    setTimeout(function () {
                        message.style.display = "none";
                    }, 3000)
                })
                .catch(function (error) {
                    console.log(error);
                    message.innerHTML = "Registration Successful";
                    message.style.display = "block";
                    setTimeout(function () {
                        message.style.display = "none";
                    }, 3000)
                })
        }
    </script>
</body>

</html>