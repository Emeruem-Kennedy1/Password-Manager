// var button = document.querySelectorAll('show-button');
var fakePassword = document.querySelectorAll('.fake-password');
var password = document.querySelectorAll('.password-label');


window.addEventListener('load', function(){
    for (let i = 0; i < password.length; i++) {
        password[i].style.display = 'none';
    }
})


document.querySelectorAll('#show-button').forEach((item,value) => {
    let isVisible = false;
    item.addEventListener('click', event => {
        if (isVisible) {
            fakePassword[value].style.display = 'block';
            password[value].style.display = 'none';
            isVisible = false;
            item.innerHTML = 'Show';
        } else {
            fakePassword[value].style.display = 'none';
            password[value].style.display = 'block';
            isVisible = true;
            item.innerHTML = 'Hide';
        }
    })

    // Todo: ass a timeout for the showing of the password
})