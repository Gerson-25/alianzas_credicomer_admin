const btnBack = document.querySelector('.btn-back')
const btnEstabelecimientos = document.querySelector('.btn-establecimientos')
const btnPromociones = document.querySelector('.btn-promociones')
const btnLista = document.querySelector('.btn-lista')
const btnLogout = document.querySelector('.btn-logout')
const db = firebase.firestore();
let categoryNames; 
const categoriesContainer = document.querySelector('.categories-container')
const categoriesLoad = document.querySelector('.categories-load')

let setColor;
let companyImage;
var color = '#D7D7D7'


let collectionPath;
let subCollectionPath;
const colorRequest = document.querySelectorAll('.color')

var categoryIcons = Array(
    "icons/icon_beauty_flat.svg",
    "icons/icon_clinic_flat.svg",
    "icons/ic_food_flat.svg",
    "icons/icon_fun_flat.svg",
    "icons/icon_education_flat.svg",
    "icons/icon_home_flat.svg",
    "icons/ic_cloth_flat.svg",
    "icons/icon_firs_aid_flat.svg"
    )

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            emailAddress = user.email;
            console.log(emailAddress)
            if(emailAddress.includes("credicomer")){
                collectionPath="alliance";
                subCollectionPath="promotions"; 
                setColor = 'green'
                companyImage = "img/Logo_Credicomer.svg"

            }
            else{
                collectionPath='alliance_unicomer';
                subCollectionPath="promotions_unicomer";  
                setColor = '#2271B3'
                companyImage = "img/logo_unicomer.svg"
            }
        }
        else{
            window.location.href = "index.html";
        }
        console.log(collectionPath)
        console.log(subCollectionPath)
        getCategories(collectionPath)
        changeColor(setColor)
        setImage(companyImage)
    });

    function changeColor(color){
        colorRequest.forEach(e => {
          e.style.backgroundColor = color
        })      
      } 

    btnLogout.addEventListener('click', e => {
        logout()
    })

    function setImage(image){
        var companyLogo = document.querySelector('.company-logo')
        companyLogo.src = image
    }

    

    function logout(){
        firebase.auth().signOut();
        window.location.href = "index.html";
    };

    btnBack.addEventListener('click', e =>{
           window.location.href = "prueba.html"
    });

    btnEstabelecimientos.addEventListener('click', e =>{
        window.location.href = "establecimientos.html"
    });

    btnPromociones.addEventListener('click', e =>{
        window.location.href = "promociones.html"
    });

    btnLista.addEventListener('click', e =>{
        window.location.href = "lista.html"
    });
    var i = 0

    function getCategories(c){
        db.collection(c).get().then((query) =>{
            query.forEach((element) => {
                categoriesLoad.style.display = 'none'
                createCategories(element.id, i)
                categoryNames = document.querySelectorAll('.category-name')
                console.log(categoryNames)
                i ++;
            });
        })
    }

    
    function createCategories(category,index){
        categoriesContainer.innerHTML += `<div class="col l4" style="padding:40px;">
        <div style="height: 280px; width: 100%;" class="card-panel">
            <div style="height: 40%; width: 100%;" class="card-content">
                <img src=${categoryIcons[index]} height="100%" alt="">
            </div>
            <div style="height: 60%;">
                <p>Categoria: <span style="color: teal;" class="category-name">${category.toUpperCase()}</span></p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id lacinia diam.</p>
                <a style="color: teal; text-decoration: underline;" href="establecimientos.html?category=${category}">IR A CATEGORIA</a>
            </div>
        </div>
    </div>`
    }

