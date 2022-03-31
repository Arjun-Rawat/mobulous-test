const BASE = window.location.host;
const registrationHandler = () => {};

$(() => {
  let form = $("#registerForm");
  //   $successMsg = $(".alert");
  $.validator.addMethod("regex", function (value, element, regexpr) {
    return regexpr.test(value);
  });
  form.validate({
    rules: {
      name: {
        required: true,
        minlength: 3,
      },
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
        minlength: 8,
      },
      phone: {
        required: true,
        regex: /^(\+\d{1,3}[- ]?)?\d{10}$/,
      },
      age: {
        required: true,
      },
      gender: {
        required: true,
      },
 
    },
    messages: {
      name: "*Please specify your name",

      email: "*Please specify a valid email address",
      password: {
        require: "*Please specify the password",
        minlength: "*Password should be min 8 char long",
        regex: "*Password must contain at least 8 characters, at least one number and both lower and uppercase letters and special characters",
      },
      phone: {
        require: "*Please specify the phone",
        regex: "*Phone should be  10",
      },
      gender: {
        require: "*Please specify gender",
      },
      age: {
        require: "*Please specify Age",
      },
    },
    submitHandler: function (form) {
      console.log(this);

      form.submit();
    },
  });

  $("#regiserBtn").on("click", (event) => {
    event.preventDefault();
    if (form.valid()) {
      let name = $("#registerForm input[name = 'name']")[0].value;
      let email = $("#registerForm input[name = 'email']")[0].value;
      let phone = $("#registerForm input[name = 'phone']")[0].value;
      let gender = $("#registerForm input[name = 'gender']:checked")[0].value;
      let age = $("#registerForm input[name = 'age']")[0].value;
      let password = $("#registerForm input[name = 'password']")[0].value;

      //   let data = ;
      //   console.log(data);

      $.ajax({
        url: `http://${BASE}/v1/users/register`,
        type: "POST",
        data: { name: name, email: email, phone: phone, gender: gender, age: age, password: password },

        beforeSend: function (request) {
          //   request.setRequestHeader("Authority", authorizationToken);
        },
        // data: JSON.stringify(data),
        success: function (res) {
          alert("User Registered");
          $("#registerForm")[0].reset();

          //   console.log(res);
        },
        error: function (err) {
          //   console.log(err.responseJSON);
          alert(err.responseJSON.message);
        },
      });
    }
  });
});
//

$(() => {
  let loginform = $("#loginForm");

  loginform.validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
      },
    },
    messages: {
      email: { require: "*Please specify a valid email address" },
      password: {
        require: "*Please specify the password",
      },
    },
    submitHandler: function (form) {
      //   form.submit();
    },
  });

  $("#loginBtn").on("click", (event) => {
    event.preventDefault();
    if (loginform.valid()) {
      let email = $("#loginForm input[name = 'email']")[0].value;
      let password = $("#loginForm  input[name = 'password']")[0].value;

      //   let data = ;
      //   console.log(data);

      $.ajax({
        url: `http://${BASE}/v1/users/login`,
        type: "POST",
        data: { email: email, password: password },
        success: function (res) {
          console.log(res);
          //   let data = res;
          localStorage.setItem("access_token", res.accessToken);
          alert("Logged in successfully");
          $("#loginForm")[0].reset();
        },
        error: function (err) {
          //   console.log(err.responseJSON);
          alert(err.responseJSON.message);
        },
      });
    }
  });

  //

  $("#userBtn").on("click", (event) => {
    event.preventDefault();
    $.ajax({
      url: `http://${BASE}/v1/users/userinfo`,
      type: "GET",
      success: function (res) {
        console.log(res);
      },
      beforeSend: function (request) {
        request.setRequestHeader("access_token", localStorage.getItem("access_token"));
      },
      error: function (err) {
        alert(err.responseJSON.message);
      },
    });
  });
});
