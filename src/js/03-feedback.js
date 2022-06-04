import throttle from 'lodash.throttle';
import "../css//03-feedback.css";
import "../css//common.css";

 const formData ={}
const STORAGE_KEY = "feedback-form-state";


const form = document.querySelector('.feedback-form')
const textarea = document.querySelector('.feedback-form textarea')
const input = document.querySelector('.feedback-form input')



form.addEventListener ('input', throttle(onFormInput, 500))
form.addEventListener('submit', onFormSubmit)
populateData()

function onFormSubmit(event){
    event.preventDefault()
    if(!input.value || !textarea.value){
        alert('Заповніть всі поля')
    }
    else{
        console.log(formData)
        input.value ="",
        textarea.value = ""
    }
    event.target.reset()
    localStorage.removeItem(STORAGE_KEY)
    
}

function onFormInput(event) {
formData[event.target.name] = event.target.value
// console.log(formData) 
localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
}

function populateData(){
const savedData = localStorage.getItem(STORAGE_KEY)
const parsData = JSON.parse(savedData)
if(savedData){
    if(parsData.email){
        formData[input.name] = parsData.email
        input.value = parsData.email
    }
    if(parsData.message){
        formData[textarea.name] = parsData.message
        textarea.value = parsData.message
    }
    else{
        textarea.value = '',
        input.value = ''
    }
}
}
