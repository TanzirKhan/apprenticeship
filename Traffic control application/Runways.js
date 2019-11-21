class Runways{
    constructor(available, element, progress){
        this.available = available;
        this.element = document.getElementById(element);
        this.progress = document.getElementById(progress)
    }
    
    changeColor(){
        if(this.available === true){
            this.element.style.backgroundColor = 'green';
        }
        else{
            this.element.style.backgroundColor = 'red';
        }
    }
}