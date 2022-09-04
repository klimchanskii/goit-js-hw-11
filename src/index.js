import search from './api'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
    form: document.querySelector("#search-form"),
    box:  document.querySelector(".gallery"),
    guard: document.querySelector(".js_guard")
}
let page = 1;
let searchQuery = ""
let simpleLighBox= null;


const options = {
    root:null,
    rootMargin: "200px",
    threshold: 1,
}
const observer = new IntersectionObserver(updateList, options) 

refs.form.addEventListener("submit", onFormSubmit)

function onFormSubmit(e){
    e.preventDefault()


    searchQuery = e.currentTarget.elements.searchQuery.value;
    clearArticlesContainer()
    e.currentTarget.reset();
    search(searchQuery).then(data =>{
        
    

    
    if(data.hits.length === 0 || !searchQuery){
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");

    }else{
        Notify.success(`Hooray! We found totalHits ${data.totalHits} images.`);
     creatMarkup(data) 
    observer.observe(refs.guard)
     console.log(data) 
    }
    return data
})
}


function updateList(entries){
entries.forEach(entry => {

    if(entry.isIntersecting){
        search(searchQuery, page += 1).then(data =>{
            creatMarkup(data)
            console.log(data)
        })}
    

}
)};




function creatMarkup(data){
    const markup = data.hits.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads})=>{
      
      return    `<div class="photo-card">
      <a href="${largeImageURL}"> 
      <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
  
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
        ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
    
      <b>Downloads</b>
        ${downloads}
      </p>
  </div>
</div>`}).join('')

refs.box.insertAdjacentHTML("beforeend",markup)
simpleLighBox = new SimpleLightbox('.gallery a');

  simpleLighBox.refresh()
}
function clearArticlesContainer() {
    refs.box.innerHTML = '';
  }
  

