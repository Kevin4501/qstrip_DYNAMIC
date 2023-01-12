import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let advURL = new URLSearchParams(search);
  //console.log( advURL.get('adventure'));
  return advURL.get('adventure');

  // Place holder for functionality to work in the Stubs
  //return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let url = config.backendEndpoint+`/adventures/detail?adventure=${adventureId}` ;
    console.log(url);
    let res = await fetch(url);
    let advData = await res.json();
    console.log(advData);
    return advData;
   } catch(error){
    return null;
   }

  // Place holder for functionality to work in the Stubs
 // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  console.log(adventure);
  let nameID = document.getElementById("adventure-name");
  nameID.innerHTML = `${adventure.name}`;

  let advSubs = document.getElementById("adventure-subtitle");
  advSubs.innerHTML = `${adventure.subtitle}`;

  let advImg = document.getElementById("photo-gallery");
  adventure.images.forEach(element => {
    
    console.log(element);
    var img = document.createElement('img');
    img.className = "activity-card-image";
    img.src =`${element}`;
     advImg.appendChild(img);

  });

  let advDetails = document.getElementById("adventure-content");
  advDetails.innerHTML = `${adventure.content}`;
 
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
 document.getElementById("photo-gallery").innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
 <div class="carousel-indicators">
   <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
   <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
   <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
 </div>
 <div class="carousel-inner" id="carousel-inner">
 
 </div>
 <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
   <span class="carousel-control-prev-icon" aria-hidden="true"></span>
   <span class="visually-hidden">Previous</span>
 </button>
 <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
   <span class="carousel-control-next-icon" aria-hidden="true"></span>
   <span class="visually-hidden">Next</span>
 </button>
</div>`;

  let couraselEle = document.getElementById("carousel-inner");
 

  for(let i = 0 ; i<images.length ; i++){
    if(i===0){
      let innerEle = document.createElement("div");
      innerEle.classList = "carousel-item active";
      innerEle.innerHTML = ` <img class="d-block w-100 activity-card-image" src="${images[i]}" >`;
      couraselEle.append(innerEle); 
    }
    else{
      let innerEle = document.createElement("div");
      innerEle.classList = "carousel-item";
      innerEle.innerHTML = ` <img class="d-block w-100 activity-card-image" src="${images[i]}">`;
      couraselEle.append(innerEle); 
    }
  }
  

}  


//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure);
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML=adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  return document.getElementById("reservation-cost").innerHTML = adventure.costPerHead*persons;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let dataform = document.getElementById("myForm");
 
  dataform.addEventListener('submit',async function(e){
    e.preventDefault();
    let url=config.backendEndpoint+"/reservations/new"; 
    let formData = dataform.elements;
    console.log(formData);
    try{
      const postData = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
      },
        body: JSON.stringify({
          "name" : formData.name.value,
          "date" : formData.date.value,
          "person" : formData.person.value,
          "adventure" : adventure.id,
        }),
      
      })

      const resData = await postData.json();
      alert("Success!")
      console.log(resData);
    }
    catch(err){
      alert("Failed!")
    }
  
  })



}
//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block";
  }
  else{
    document.getElementById("reserved-banner").style.display = "none";
  }


}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
