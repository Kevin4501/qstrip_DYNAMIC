
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and retnpm urn it
  let cite = new URLSearchParams(search);
  return cite.get('city');
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the dat
  try{
    let url = config.backendEndpoint+`/adventures?city=${city}` ;
    let res = await fetch(url);
    let citiesData = await res.json();
    return citiesData;
   } catch(error){
    return null;
   }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  
  adventures.forEach((adventures)=>{
    addElement(adventures.id , adventures.category, adventures.image,adventures.name, adventures.costPerHead , adventures.duration );
   
  });
  return adventures;
}

  function addElement(id,category,image,name,costPerHead,duration){

    let ele = document.createElement("div");
    ele.setAttribute("id",name);
    ele.className="b-0 col-12 col-lg-3 mb-4 col-sm-6";
    ele.innerHTML = 
    `<div class = "position-relative px-3">
    <h5 class = "category-banner">${category}<h5>
    <a href = "detail/?adventure=${id}" id=${id}>
        
                <div class ="activity-card shadow-lg ">
                    <img src="${image}" class="" alt="image">
                    
                    <div class = "container p-2 px-3">
                    <div class = "d-flex justify-content-between">
                    <h5 >${name}</h5>
                    <p>₹${costPerHead}</p>
                    </div>

                    <div class = "d-flex justify-content-between">
                    <h5>Duration</h5>
                    <p>${duration} Hours</p>
                    </div>
                    </div>

                   
                </div> 
               
    </a>
    <div>`
    ;

    return document.getElementById("data").append(ele);
    
}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredDuration = [];
  list.forEach((list)=>{
    if(list.duration>=low && list.duration<=high){
      filteredDuration.push(list);
    }
  });
  return filteredDuration;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredCategory = [];
  for(let i = 0 ; i< categoryList.length ; i++){
    for(let j = 0 ; j< list.length ; j++){
      if(categoryList[i]===list[j].category){
        filteredCategory.push(list[j]);
      }
    }
  }
  return filteredCategory;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredLists = [];
  let durationTimings = [];
  
  durationTimings = filters.duration.split("-");
  console.log(durationTimings);
  let low = durationTimings[0];
  let high = durationTimings[1];

  let categoryList = filters.category;
  console.log(categoryList);

  if(filters.duration.length>0 && filters["category"].length > 0){
    filteredLists = filterByCategory(list,categoryList);
    filteredLists = filterByDuration(list,low,high);
  }

  else if(filters["category"].length > 0){
    filteredLists = filterByCategory(list,categoryList);
  }

  else if(filters.duration.length > 0){
    filteredLists = filterByDuration(list,low,high);
  }

  else {
    filteredLists = list;
  }

  // Place holder for functionality to work in the Stubs
  console.log(filteredLists)
  return filteredLists;
  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
 let storageLocal =  window.localStorage.setItem("filters", JSON.stringify(filters));

  return storageLocal;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  let newObject = window.localStorage.getItem("filters");
    // Place holder for functionality to work in the Stubs

  return JSON.parse(newObject);
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryFilters = filters.category;
  let durationFilters = filters.duration;
  document.getElementById("duration-select").value = durationFilters; 
  let parentEle = document.getElementById("category-list")
  
  categoryFilters.forEach((e,index)=>{
      let divEle = document.createElement("div")
      divEle.className = "category-filter shadow-sm"
      divEle.innerText = categoryFilters[index];
      parentEle.append(divEle);
  })
 return parentEle;

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
