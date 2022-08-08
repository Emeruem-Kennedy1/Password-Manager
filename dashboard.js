let pass = document.querySelector("#password_reveal");
console.log(pass)

pass.addEventListener("click",function(){
    let shown_password = document.querySelector(".password_hidden");
    shown_password.textContent ="kyronnyoro1"
    shown_password.classList.add("password_font");
})