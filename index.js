const forms = document.forms[0]
const aviableSim = {
    name: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    surname: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    email:  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    userInfo: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    css:/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    js: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    favCar: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    html: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    age: /^100|[1-9]?\d$/
}

function validate(field, regex) {
    if (regex.test(field.value)) {
        field.classList.add('valid')
        field.classList.remove('invalid')
        if(field.nextSibling.nextSibling) {
            field.nextSibling.nextSibling.innerHTML = ""
        }
    } else {
        field.classList.add('invalid')
        field.classList.remove('valid')
    }
}

let inputs = forms.querySelectorAll('input')
let button = forms.querySelector('button')
inputs.forEach(input => {
    input.onkeyup = () => {
        validate(input, aviableSim[input.name])
    }
});


let requireFields = document.querySelectorAll('.blue')
let allFields = document.querySelector('#all')
let needFields = document.querySelector('#need')
let success = document.querySelector('#success')
let error = document.querySelector('#error')


allFields.innerHTML = inputs.length
needFields.innerHTML = requireFields.length

let isLoading = false

forms.onsubmit = (event) => {
    event.preventDefault()

    let arr = []

    inputs.forEach(inp => {
        if(inp.classList.contains('invalid') || inp.value.length == 0) {
            if(inp.nextSibling.nextSibling) {
                arr.push('invalid')
                inp.classList.add('invalid')
                inp.nextSibling.nextSibling.innerHTML = "Please enter your email adress"
                inp.nextSibling.nextSibling.style.color = "red"
            }
        }
    })

    if(arr.length == 0) {
        isLoading = !isLoading
        LoadingWathcer()
        setTimeout(() => {
            submit()
        }, 3000);
    } 

    error.innerHTML = arr.length
    success.innerHTML = inputs.length - arr.length
  

}

function submit() {
    let user = {}

    let fm = new FormData(forms)

    fm.forEach((value, key) => {
        user[key] = value
    })

    console.log(user);

    inputs.forEach(inp => {
        inp.value = ""
        isLoading = false
        LoadingWathcer()
    })
}

function LoadingWathcer() {
    if(isLoading) {
        button.innerHTML = "Loading..."
    } else {
        button.innerHTML = "Save changes"
    }
}