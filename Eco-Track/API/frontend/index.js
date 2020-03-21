
const parseUserData = ()=>{
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
    goToRoot()
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
const goToRoot = ()=>{
    console.log('go to root')
    $('#signUp').css({ 'display': 'none' })
    $('#seedKey').css({ 'display': 'block' })

}