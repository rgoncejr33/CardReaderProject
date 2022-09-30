let form = document.getElementById("userInfo");
let customerName = document.getElementById("cardName");
let cardNumber = document.getElementById("cardNum");
let cardExpire = document.getElementById("cardExp");
let cardCvc = document.getElementsById("cardCVC");
let cNameInput = document.getElementById("cname");
let cNumberInput = document.getElementById("cnumber");
let expDateInput = document.getElementById("edate");
let expMonthInput = document.getElementById("emonth");
let cardCVCInput = document.getElementById("cvc");

function hideForm() {
    form.style.display="none";
}

function placeInfo() {
    customerName.textContent = cNameInput.value;
    customerNumber.textContent = cNumberInput.value;
    customerEdate.textContent = expDateInput.value;
    customerEmonth.textContent = expMonth.value;
    customerName.textContent = cNameInput.value;
}