import './styles/style.css'

const btClear = document.getElementById("btClear");
const btGetCoordinate = document.getElementById("btGetCoordinate");
const btDownload = document.getElementById("btDownload");
const textCoordinates = document.getElementById("textCoordinates");
const selectedOption = document.getElementById("selectedOption");

btGetCoordinate.addEventListener("click", () => {fetchCurrentCoordinate()})
btClear.addEventListener("click", () => {handleClearText()})
btDownload.addEventListener("click",() => {handleCSVFiles()})

function fetchCurrentCoordinate() {
  var promise = new Promise(function(resolve, reject) {
    btGetCoordinate.disabled=true;
      navigator.geolocation.getCurrentPosition(function(position){
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          resolve({latitude,longitude});
      }) 
  })
  promise.then(function(position){
    handlePosition(position);
    btGetCoordinate.disabled=false;
  });
}

function handlePosition(position) {
  textCoordinates.value = selectedOption.value + "," + position.latitude + "," + position.longitude + "\n" + textCoordinates.value;
}

function handleClearText(){
  const answer = confirm("Deseja realmente apagar o conteúdo? Esta ação é irreversível...");
  if (answer) {
    textCoordinates.value=""
  };
}

function handleCSVFiles() {
  saveCSVFiles(textCoordinates.value);
}

// read about utf-8 BOM
function saveCSVFiles(csvContent){
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvContent);
  hiddenElement.target = '_blank';
  hiddenElement.download = getDocumentName() + '.csv';
  hiddenElement.click();
}

function getDocumentName(){
  var documentName = prompt("Insira um nome para o arquivo", "Coordinates");
  if (documentName === null) {documentName = "Coordinates"};
  return(documentName)
}

