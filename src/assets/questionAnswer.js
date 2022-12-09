if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false); 
} else if (window.attachEvent)  {
  window.attachEvent("onload", setUpPage);
}
function setUpPage() {
    console.log("asdf")
    console.log("asdf")
    console.log("asdf")
    console.log("asdf")
    console.log("asdf")
}
   

console.log("asdf")
btnAddQuestion = document.getElementById("btnAddQuestion");
if(btnAddQuestion.addEventListener){
    btnAddQuestion.addEventListener("click", xSymbol, false);
 } else {
    btnAddQuestion.attachEvent("onclick", xSymbol, false);
 }

 /* creates X symbol */
function xSymbol(event){
    QA = document.getElementById("Q&A");
    console.log("asdf")


    QA.innerHTML =
    "PIRITITTS" +
    QA.innerHTML;

    // var existingSymbol = document.querySelectorAll("fieldset p");
    // if(existingSymbol[0]){
    //     fieldSet.removeChild(existingSymbol[0]);
    // }

    // var deleteSymbol = document.createElement("p");
    // deleteSymbol.innerHTML = "X";
    // deleteSymbol.value = event.currentTarget.id;
    // if(deleteSymbol.addEventListener){
    //     deleteSymbol.addEventListener("click", deleteFav, false);
    // } else {
    //     deleteSymbol.attachEvent("onclick", deleteFav, false);
    // }

    // fieldSet.insertBefore(deleteSymbol, document.getElementById(deleteSymbol.value));
}
console.log("asdf")
console.log("asdf")
console.log("asdf")
console.log("asdf")
console.log("asdf")
console.log("asdf")
console.log("asdf")
console.log("asdf")
console.log("asdf")
