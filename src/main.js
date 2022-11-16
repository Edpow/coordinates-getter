import './styles/style.css'

const textAte70 = document.getElementById("textAte70");
const btAte70 = document.getElementById("btAte70");
const btClearAte70 = document.getElementById("btClearAte70");
const textMaior70 = document.getElementById("textMaior70");
const btMaior70 = document.getElementById("btMaior70");
const btClearMaior70 = document.getElementById("btClearMaior70");
const btDownload = document.getElementById("download");
var currentPosition = "";
getLocation();

btAte70.addEventListener("click", () => {addAte70LatLongString()})
btMaior70.addEventListener("click", () => {addMaior70LatLongString()})
btClearAte70.addEventListener("click",() => {textAte70.value = ""})
btClearMaior70.addEventListener("click",() => {textMaior70.value = ""})
btDownload.addEventListener("click", () => {handleCSVFiles()})

function addAte70LatLongString() {
  getLocation();
  if (currentPosition === "") {
    alert("Posição atual não capturada")
  } else {
    textAte70.value = textAte70.value +"\n" + currentPosition;
    currentPosition=""
  }

}

function addMaior70LatLongString() {
  getLocation();
  if (currentPosition === "") {
    alert("Posição atual não capturada")
  } else {
  textMaior70.value = textMaior70.value +"\n"  + currentPosition;
  currentPosition=""
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handlePosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}


function handlePosition(position) {
  currentPosition = position.coords.latitude + "," + position.coords.longitude;
}

function handleCSVFiles() {
  saveCSVFiles("data:text/csv;charset=utf-8," + "Caixa até 70cm"  + textAte70.value + "\n\nCaixa Maiores que 70cm" +  textMaior70.value);
}

function saveCSVFiles(csvContent){
  var encodedUri = encodeURI(csvContent);
  console.log(encodedUri);
  window.open(encodedUri);
}
