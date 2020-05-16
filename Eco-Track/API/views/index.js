/**** Calls ****/
const addUser = require('../calls/addUserCall')
/* Calls */

/****Add User****/ 
const parseUserData = async()=>{
  const userForm = document.forms.registrationForm
  const userData = new FormData(userForm);
  const userJson = {
    "fname":userData.get('fname'),
    "lname":userData.get('lname'),
    "email":userData.get('email'),
    "bussines_info":userData.get('bussines_info')
  }
  console.log(userJson)
  if (validation(userJson)) {
    const response = await addUser();
    goToRoot(response)
  }
  return userJson
}
const validation = (validateUser)=>{
  if (validateUser['fname'].length >= 3 && validateUser['lname'].length >= 3 && validateUser['email'].indexOf('@') !== -1 &&  validateUser['bussines_info'].length > 10){
    return true
  }
  $('.alert-danger').css({ 'display': 'block' })
  return false
}
const goToRoot = (user)=>{
    $('#signUp').css({ 'display': 'none' })
    $('.seed').append(user['seed'])
    $('.key').append(user['key'])
    $('#seedKey').css({ 'display': 'block' })

}
/*Add User*/ 

/****Create Products****/ 

const goToUploadProducts = ()=>{
  $('#seedKey').css({ 'display': 'none' })
  $('#uploadProducts').css({ 'display': 'block' })
}



 const parseProductsData = ()=>{ 
  const productsForm = document.forms.uploadProductsForm
  const productsData = new FormData(productsForm);
  const productsJson = {
    "productsFile":productsData.get('productsFile'),
    "serviceType":productsData.get('serviceType'),
  }
  return productsJson
} 


  
