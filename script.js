//! This file is getting big!. Need to pull this apart into smaller chunks. Don't forget to export and import.

/* Create our Global Variables */
let form = document.getElementById("userInfo");
let button = document.getElementById("btnGo");
let thanks = document.getElementById("thanksState");

    /* Error Message Spans */
let errSpanName = document.getElementById("errMsgName");
let errSpanNum = document.getElementById("errMsgNum");
let errSpanExpDate = document.getElementById("errMsgExpDate");
let errSpanCVC = document.getElementById("errMsgCVC");

    /* Elements from the card */
let customerName = document.getElementById("cardName");
let cardNumber = document.getElementById("cardNum");
let cardExpire = document.getElementById("cardExp");
let cardCvc = document.getElementById("cardCVC");

    /* Get Data from the user inputs (form) */
let cNameInput = document.getElementById("cname");
let cNumberInput = document.getElementById("cnumber");
let expMonthInput = document.getElementById("emonth");
let expYearInput = document.getElementById("eyear");
let cardCVCInput = document.getElementById("cvc");

    /* Regex Tester Variables */
const nameRegex = /^[A-Z]{1,1}[a-z]{1,}\s[A-Z]{1,1}[a-z]{1,}/g;
const cardNumRegex = /^[0-9]{16}/g;

/* Input Border When Error */
const inputErrStyle = "2px solid red";

/* Add Event Listeners */
form.addEventListener("blur", checkForErrors);
form.addEventListener("keyup", function() {
    //formatCardNumber();
    checkForErrors();
    placeInfo(formatCardNumber());
});
button.addEventListener("click", submitForm);
//cNumberInput.addEventListener("keyup", formatCardNumber);

/* One Function to rule them all! (This function calls other functions)*/
function submitForm() {
    if(checkForErrors() == true) {
        return;
    }
    //formatCardNumber();
    //placeInfo(formatCardNumber);
    hideFormAndDisplayThanks();
}

/* Write Functions */
    /* Hide the form so we can display the thank you page */
function hideFormAndDisplayThanks() {
    form.style.display="none";
    button.textContent = "Continue";
    thanks.style.display = "flex";
}

/* map form data to the card front and card back for thank you page */
function placeInfo(formattedCardNum) {
    //! Need placeholder data to stay when there is nothing in the input
    if(cNameInput.value == ""){
        customerName.textContent = "Jane Appleseed"
    }else {
        customerName.textContent = cNameInput.value;
    }
    if(cNumberInput.value == ""){
        cardNumber.textContent = "0000 0000 0000 0000";
    }else{
        cardNumber.textContent = formattedCardNum;
    }
    if(cardCVCInput.value === ""){
        cardCvc.textContent = "000";
    } else {
        cardCvc.textContent = cardCVCInput.value;
    }
    /* Combine the values of expiration year and month into the expire textContent */
    cardExpire.textContent = expMonthInput.value + "/" + expYearInput.value;
}

/* Test form accuracy */
function checkForErrors() {
    let areThereErrors = false;

    if(!cNameInput.value.match(nameRegex)){
        errSpanName.style.visibility = "visible";
        cNameInput.style.border = inputErrStyle;
        areThereErrors = true;
    } else {
        errSpanName.style.visibility = "hidden";
        cNameInput.style.border = "1px solid var(--lightGrayishViolet)";
        areThereErrors = false;
    }

    if(!cNumberInput.value.match(cardNumRegex)){
        errSpanNum.style.visibility = "visible";
        cNumberInput.style.border = inputErrStyle;
        areThereErrors = true;
    } else {
        errSpanNum.style.visibility = "hidden";
        cNumberInput.style.border = "1px solid var(--lightGrayishViolet)";
        areThereErrors = false;
    }

    if(expMonthInput.value == "" || expYearInput.value == "" || ((parseInt(expMonthInput.value) < 1) || (parseInt(expMonthInput.value) > 12))) {
        areThereErrors = true;
        errSpanExpDate.style.visibility = "visible";
        if(expMonthInput.value == "" || ((parseInt(expMonthInput.value) < 1) || (parseInt(expMonthInput.value) > 12))){
            expMonthInput.style.border = inputErrStyle;
        } else {
            expMonthInput.style.border = "1px solid var(--lightGrayishViolet)";
        }
        if(expYearInput.value == ""){
            expYearInput.style.border = inputErrStyle;
        } else {
            expYearInput.style.border = "1px solid var(--lightGrayishViolet)";
        }
    } else {
        areThereErrors = false;
        errSpanExpDate.style.visibility = "hidden";
    }

    if(cardCVCInput.value == ""){
        areThereErrors = true;
        errSpanCVC.style.visibility = "visible";
        cardCVCInput.style.border = inputErrStyle;
    } else {
        areThereErrors = false;
        errSpanCVC.style.visibility = "hidden";
        cardCVCInput.style.border = "1px solid var(--lightGrayishViolet)";
    }

    return areThereErrors;
}

function formatCardNumber(){
    let value = cNumberInput.value;
    const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
    const onlyNumbers = value.replace(/[^\d]/g, '');

    let formattedCardNum = onlyNumbers.replace(
        regex, (regex, $1, $2, $3, $4) =>
        [$1, $2, $3, $4].filter(group => !!group).join(' ')
    );

    return formattedCardNum;
}