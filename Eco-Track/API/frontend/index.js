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
  return userJson
}

const goToRoot = ()=>{
    $('#signUp').css('display:none')
    $('')
}