function mode(n){
    var BODY = document.getElementById('con');
    var bruh = document.getElementsByClassName('text');
    BODY.style.transition = "background-color 1s";
    BODY.style.transitionTimingFunction = "ease-in";
    var y;
    function tran(x){
        bruh[x].style.transition="color 1s";
        bruh[x].style.transitionTimingFunction="ease-in";
    }
    switch(n){
        case 0:
            BODY.style.backgroundColor='#000011';
            for(y = 0; y < bruh.length; y++){
                bruh[y].style.color ='white';
                tran(y);
            }
            break;
        case 1:
            BODY.style.backgroundColor='#ffffff';
            for(y=0; y<bruh.length; y++){
                bruh[y].style.color='black';
                tran(y);
            }
            break;
    }
}
function registration(){
    var cool = document.getElementById('thanks');
    var firstName = document.getElementById('fn').value;
    var surname = document.getElementById('sn').value;
    var password= document.getElementById('ps').value;
    var address = document.getElementById('email').value;
    if(firstName != "" && surname != "" && address != "" && password != ""){
        cool.innerHTML = "Thank you for signing up with Evolve";
    }
    else{
        cool.innerHTML = "Please fill in the fields marked with a *"
    }
}
var switches = document.getElementById('night');
var s = 0;
switches.addEventListener("click", function(){
    switch(s){
        case 0:
            mode(s);
            s=1;
            break;
        case 1:
            mode(s);
            s=0;
            break;
    }
});