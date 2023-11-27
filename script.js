const bar = document.getElementById('bar')
const close = document.getElementById('close')
const nav = document.getElementById('navbar')

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active')
  })
 
 if (close) {
   close.addEventListener('click', () => {
     nav.classList.remove('active')
   })
 }
}


var MainImg = document.getElementById("MainImg");
  var smallimg = document.getElementsByClassName("small-img");

smallimg[0].onclick = function(){
  MainImg.src = smallimg[0].src;
}

smallimg[1].onclick = function(){
  MainImg.src = smallimg[1].src;
}

smallimg[2].onclick = function(){
  MainImg.src = smallimg[2].src;
}

smallimg[3].onclick = function(){
  MainImg.src = smallimg[3].src;
}
  
  smallimg[4].onclick = function(){
  MainImg.src = smallimg[4].src;
}
    
// -------------for login form--------------

function switchForm(className, e){
  e.preventDefault();
  const allForm = document.querySelectorAll('form');
  const form = document.querySelector(`form.${className}`);
  
  allForm.forEach(item=> {
    item.classList.remove('active');
  })
  
  form.classList.add('active');
}

const registerPassword = document.querySelector('form.register #password');
const registerConfirmPassword = document.querySelector('form.register #confirm-pass');

registerPassword.addEventListener('input', function(){
 registerConfirmPassword.pattern = `${this.value}`; 
})


// country state and local government configuration

var config = {
  cUrl: 'https://api.countrystatecity.in/v1/countries',
  ckey:   'OVQzTEc4NEpob29uSEpwNHdhNHVBTTQwV0dOaHVCOWtSbDBvelRQUQ=='
}


var countrySelect = document.querySelector('.country');
var stateSelect = document.querySelector('.state');
var lgaSelect = document.querySelector('.lga');


