const imageContainer =document.getElementById('image-container')
const loader =document.getElementById('loader');

let photoArray =[];

let ready =false;
let imageLoaded =0;
let totalImage =0;

function imageLoader(){
    
    imageLoaded++;
    console.log(imageLoaded)
    if(imageLoaded === totalImage){
        ready =true;
        loader.hidden =true
        count =30;
        const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
        
    }
}

function setAttribute(element ,attribute){
 for(const key in attribute) {
 element.setAttribute(key, attribute[key])
 }
}

function displayphotos(){
    imageLoaded =0;
    totalImage =photoArray.length
    
    photoArray.forEach((photo)=> {

        const item =document.createElement('a');
        // item.setAttribute('href',photo.links.html)
        // item.setAttribute('target','_blank');
        setAttribute(item, {
            href:photo.links.html,
            target:'_blank'
        })

        const img =document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        setAttribute(img ,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description

        });
        img.addEventListener('load', imageLoader)


        item.appendChild(img)
        imageContainer.appendChild(item)
   
    })
}

let count =5;
const apiKey ='bWH0h_4dnxldHhZwa7GFTVp9YAPSBokK2hhfY326Hgs';
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

async function getPhotos (){
try {
    const response =await fetch(apiUrl);
    photoArray = await response.json();
    displayphotos();
} catch (error) {
    
}

}
 window.addEventListener('scroll', ()=> {
if(window.innerHeight + window.scrollY >=document.body.offsetHeight - 1000 && ready){
    ready =false;
    getPhotos();
}
 })

getPhotos();