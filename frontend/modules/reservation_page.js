import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let backendData = await fetch(config.backendEndpoint+"/reservations/");
    let resData = await backendData.json();
  
    // Place holder for functionality to work in the Stubs
    return resData;
  } catch(error){
    return null;
   }
 
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  console.log(reservations);
  //reservations = [];
 if(reservations.length>0){
  document.getElementById("reservation-table-parent").style.display = "block";
  document.getElementById("no-reservation-banner").style.display = "none";
 }
 else{
  document.getElementById("reservation-table-parent").style.display = "none";
  document.getElementById("no-reservation-banner").style.display = "block";
 }

  //Conditionally render the no-reservation-banner and reservation-table-parent
 const tableDate = new Date();
 console.log(tableDate.toLocaleDateString("en-IN"));
 const actDate = tableDate.toLocaleDateString("en-IN");
 const options = {
 
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

 
 
 let divELe = document.getElementById("reservation-table");
 reservations.forEach(element => {
  let d = new Date(element.date).toLocaleDateString("en-IN");
  let da = new Date(element.time).toLocaleString("en-IN",options)
  
  let reserveList = document.createElement("tr");
  reserveList.innerHTML = `   
  <td scope="col">${element.id}</td>
  <td scope="col">${element.name}</td>
  <td scope="col">${element.adventureName}</td>
  <td scope="col">${element.person}</td>
  <td scope="col">${d}</td>
  <td scope="col">${element.price}</td>
  <td scope="col">${da.split(" at")}</td>
  <td id = "${element.id}"><a href = "/frontend/pages/adventures/detail/?adventure=${element.adventure}" id="${element.adventure}"><button class = "reservation-visit-button" id = "${element.adventure}">Visit Adventure</button></a></td>
`
//frontend/pages/adventures/detail/?adventure=2674554670
if(reservations.length>0){
  divELe.append(reserveList);
}
  
 });

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
  
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
