const form = document.querySelector("form"),
  emailField = form.querySelector(".email-field"),
  emailInput = emailField.querySelector(".email"),
  passField = form.querySelector(".create-password"),
  passInput = passField.querySelector(".password");

// Email Validtion
function checkEmail() {
  const emaiPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailInput.value.match(emaiPattern)) {
    return emailField.classList.add("invalid"); //adding invalid class if email value do not mathced with email pattern
  }
  emailField.classList.remove("invalid"); //removing invalid class if email value matched with emaiPattern
}

//Hide and password
const eyecIcons = document.querySelectorAll(".show-hide");

eyecIcons.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    const pinput = eyeIcon.parentElement.querySelector("input");
    if (pinput.type === "password") {
      eyeIcon.classList.replace("bx-hide", "bx-show");
      return (pinput.type = "text");
    }
    eyeIcon.classList.replace("bx-show", "bx-hide");
    return (pinput.type = "password");
  });
});

//Password validation
function createPass() {
  const passPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passInput.value.match(passPattern)) {
    return passField.classList.add("invalid"); //adding invalid class if password input value do not match with passPattern
  }
  passField.classList.remove("invalid"); //removing invalid class if password input value matched with passPattern
}

//Confirm Password Validation
function confirmPass() {
  if (passInput.value == "") {
    return passField.classList.add("invalid");
  }
  passField.classList.remove("invalid");
}

// Calling Funtion on Form Sumbit
form.addEventListener("submit", (e) => {
  e.preventDefault(); //preventing form submitting
  checkEmail();
  createPass();
  confirmPass();

  let datos = new FormData(form);

  //calling function on key up
  emailInput.addEventListener("keyup", checkEmail);
  passInput.addEventListener("keyup", createPass);

  if (
    !emailField.classList.contains("invalid") &&
    !passField.classList.contains("invalid")
  ) {

    fetch("login.php", {
      method: "Post",
      body: datos,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true || data.success == 'true') {
          swal({
            title: "Buen Trabajo!",
            text: "incio con exito!",
            icon: "success",
          });
          setTimeout("location.href='dashboard.php'", 2000);
        }else{
          if(data.success == false || data.success == 'false'){
            swal({
              title: "Error!",
              text: "Error al iniciar sesion!",
              icon: "warning",
            });
          }
        }
      });
  }
});
