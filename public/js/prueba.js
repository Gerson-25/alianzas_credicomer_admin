
const btnEstabelecimientos = document.querySelector('.btn-establecimientos')
const btnPromociones = document.querySelector('.btn-promociones')
const btnLista = document.querySelector('.btn-lista')
const btnLogout = document.querySelector('.btn-logout')
const colorRequest = document.querySelectorAll('.color')
const btnListaHome = document.querySelector('.btn-lista-home')
const homeImage = document.querySelector('.home-image')

let setColor;
let companyImage;
let homeImageSrc;
    btnEstabelecimientos.addEventListener('click', e =>{
        window.location.href = "establecimientos.html"
    });

    btnPromociones.addEventListener('click', e =>{
        window.location.href = "promociones.html"
    });

    btnLista.addEventListener('click', e =>{
        window.location.href = "lista.html"
    });

    btnListaHome.addEventListener('click', e =>{
        window.location.href = "lista.html"
    });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            emailAddress = user.email;
            console.log(emailAddress)
            if(emailAddress.includes("credicomer")){
                collectionPath="alliance";
                subCollectionPath="promotions"; 
                setColor = 'green'
                companyImage = "img/Logo_Credicomer.svg"
                homeImageSrc = "img/homepage_logo.svg"

            }
            else{
                collectionPath='alliance_unicomer';
                subCollectionPath="promotions_unicomer";  
                setColor = '#2271B3'
                companyImage = "img/logo_unicomer.svg"
                homeImageSrc = "img/homepage_logo_unicomer.svg"
            }
        }
        else{
            window.location.href = "index.html";
        }
        console.log(collectionPath)
        console.log(subCollectionPath)
        changeColor(setColor)
        setImage(companyImage)
        setHomeImage(homeImageSrc)
    });

    function changeColor(color){
        colorRequest.forEach(e => {
          e.style.backgroundColor = color
        })      
      } 

      function setHomeImage(image){
        homeImage.src = image
      }

    btnLogout.addEventListener('click', e => {
        logout()
    })

    function logout(){
        firebase.auth().signOut();
        window.location.href = "index.html";
    };

    function setImage(image){
        var companyLogo = document.querySelector('.company-logo')
        companyLogo.src = image
    }