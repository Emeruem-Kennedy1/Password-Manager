let pass = document.querySelector("#password_reveal");
console.log(pass)

pass.addEventListener("click",function(){
    let shown_password = document.querySelector(".password_hidden");
    shown_password.textContent ="kyronnyoro1"
    shown_password.classList.add("password_font");
})

const navSlide = () =>{
    const burger =document.querySelector(".burger");
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll(".nav-item");
    

    burger.addEventListener("click", ()=>{
        nav.classList.toggle('nav-active');

        navLinks.forEach((link,index)=> {
            if(link.style.animation){
                link.style.animation = '';
            }else{
            link.style.animation = `navLinksFade 0.2s ease forwards ${index / 7 + 0.3 }s`;
            }
        });
    });    
}

navSlide();