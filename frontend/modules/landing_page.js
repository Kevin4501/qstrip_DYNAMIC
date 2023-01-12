import config from "../conf/index.js";

async function init() {
  
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
  
  return cities;
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
 try{
  let res = await fetch( config.backendEndpoint+"/cities");
  let citiesData = await res.json();
  return citiesData;
 } catch(error){
  return null;
 }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  
  let div_one = document.createElement("div");
  div_one.className="col-12 col-sm-6 col-lg-3 mb-4";
  div_one.setAttribute("id",id);

  let anchorEle = document.createElement("a");
  anchorEle.setAttribute("href",`pages/adventures/?city=${id}`);
  anchorEle.setAttribute("id","${id}");

  let tileClass = document.createElement("div");
  tileClass.className = "tile";

  let imageSrc = document.createElement("img");
  imageSrc.setAttribute("src",image);

  let textT = document.createElement("div");
  textT.setAttribute("class","tile-text text-center");

  let cityName = document.createElement("h5");
  cityName.innerText = city ;

  let descriptEle = document.createElement("p");
  descriptEle.innerText = description;

  textT.append(cityName , descriptEle);
  tileClass.append(textT , imageSrc);

  anchorEle.append(tileClass);

  div_one.append(anchorEle);

  let parentEle = document.getElementById("data");
  parentEle.append(div_one);

  return parentEle;

}

export { init, fetchCities, addCityToDOM };
