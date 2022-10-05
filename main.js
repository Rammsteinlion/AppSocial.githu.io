const form = document.querySelector("form"),
  nameField = form.querySelector(".name-field"),
  nameInput = nameField.querySelector(".name"),
  emailField = form.querySelector(".email-field"),
  emailInput = emailField.querySelector(".email"),
  passField = form.querySelector(".create-password"),
  passInput = passField.querySelector(".password"),
  cPassField = form.querySelector(".confirm-password"),
  cPassInput = cPassField.querySelector(".cPassword");

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
  if (passInput.value !== cPassInput.value || cPassInput.value === "") {
    return cPassField.classList.add("invalid");
  }
  cPassField.classList.remove("invalid");
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
  cPassInput.addEventListener("keyup", confirmPass);

  // console.log(form.getAtribute );

  /*let datos = new FormData(form);
   console.log(datos.get('email'))
   console.log(datos.get('password'))
   console.log(datos.get('cpassword'))*/

  if (
    !emailField.classList.contains("invalid") &&
    !passField.classList.contains("invalid") &&
    !cPassField.classList.contains("invalid") &&
    !nameField.classList.contains("invalid")
  ) {
    /*console.log(datos.get('email'));
    console.log(datos.get('password'));
    console.log(datos.get('cpassword'));*/

    /**swal({
  title: "Good job!",
  text: "You clicked the button!",
  icon: "success",
}); */

    fetch("save.php", {
      method: "Post",
      body: datos,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true || data.success == 'true') {
          swal({
            title: "Buen Trabajo!",
            text: "Registrado con exito!",
            icon: "success",
          });
          setTimeout("location.href='login.html'", 2000);
        }else{
          if(data.success == false || data.success == 'false'){
            swal({
              title: "Error!",
              text: "Usuario ya se encuentra registrado!",
              icon: "warning",
            });
          }
        }
      });
  }
});
