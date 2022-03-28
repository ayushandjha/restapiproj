const hamBurge = document.querySelector('#ham-burger');
const hamBurgerItem = document.querySelector('.ham-item');
const linkCont = document.querySelector('.nav-links');



hamBurge.addEventListener('click',()=>{
    hamBurge.classList.toggle('is-active');
    linkCont.classList.toggle('nav-links-active');
})


















