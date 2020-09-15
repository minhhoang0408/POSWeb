
const validateInput = (type, checkingText) => {
  if (type === "name") {
    if(checkingText === ""){
      return {
        isInputValidName: true,
        errorMessName: "Tên Khách Hàng Không để trống !"
      }
    }else{
      const regex = /^[A-Za-z ]{1,30}$/
      const checkingResult = regex.exec(checkingText);
      if(checkingResult !== null) {
        return {
          isInputValidName: false,
          errorMessName: ""
        }
      }else {
        return {
          isInputValidName: true,
          errorMessName: "Tên khách hàng là ký tự [a-z]!"
        }
      }
    }
  }else{
    if(checkingText === ""){
      return {
        isInputValidPhone: true,
        errorMessPhone: "Số điện thoại không được để trống !"
      }
    }else{
      const regexp = /^\d{10,11}$/;
      const checkingResult = regexp.exec(checkingText);
      if (checkingResult !== null) {
          const firstNumberPhones = ["09", "03", "08"];
          const first = checkingText.slice(0,2);
          const index = firstNumberPhones.indexOf(first);
          if(index === -1){
            return { isInputValidPhone: true,
                     errorMessPhone: 'Đầu số điện thoại không đúng !'};
          }else{
            return { isInputValidPhone: false,
                     errorMessPhone: ''};
          }
      } else {
          return { isInputValidPhone: true,
                  errorMessPhone: 'Số điện thoại phải có 10 - 11 chữ số! và không chứa ký tự đặc biệt'};
      }
    }
  }
}

export {
  validateInput
}