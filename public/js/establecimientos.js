const compressor = require('compressorjs');
const btnBack = document.querySelector('.btn-back')
const btnEstabelecimientos = document.querySelector('.btn-establecimientos')
const btnPromociones = document.querySelector('.btn-promociones')
const btnLista = document.querySelector('.btn-lista')
var elems = document.querySelector('.drop-down-categories');
let establishmentList =document.querySelector('.establishment-list');
let companyNames;
let categories = [];
let optionsCategory  = document.querySelectorAll('option')
let actionSee;
const storage = firebase.storage().ref();
const imageSubmit = document.getElementById("image-submit");
const addEstablishment = document.getElementById("add-establishment")
const alertContainer = document.querySelector('.alert-container')
const editContainer = document.getElementById("edit-container")
const confirmationContainer = document.querySelector('.confirmation-container')
const editChartContainer = document.getElementById('edit-chart-container')
const deleteChartContainer = document.getElementById('delete-chart-container')
const closeButton = document.getElementById('close-button')
const closeAlert = document.querySelector('.close-alert-button')
const modifyButton = document.querySelector('.modify-button')
const promoTitle2 = document.getElementById('new-promo-title')
const promoDescription = document.getElementById('new-promo-description')
const modificationFilePath = document.getElementById('modification-file-path')
const closeDeleteChart = document.querySelector('.close-delete-chart')
const lockPromo = document.querySelector('.lock-promo')
const loader = document.querySelector('.loader')
const loaderBackground = document.querySelector('.loader-background')
const titleContainer = document.querySelector('.title-container')
const confirmEstablishment = document.querySelector('.confirm-establishment')
const closeConfirmationChart = document.querySelector('.close-confirmation-chart')
let globalEstablishment
var description = document.getElementById("edescription")
var direction = document.getElementById("eaddress")
var establishment_name = document.getElementById("ename")
var filePath = document.querySelector('.file-path')
var phone_number = document.getElementById("ephone")

var selectedCategory = document.getElementById("selected-category")
var selectedEstablishment = document.getElementById("selected-establishment")

var collectionPath = "alliance"
var subCollectionPath = "promotions"

const db = firebase.firestore();
var value = location.search
var valueSplit = value.split('=')
var categoryFromList = valueSplit[1]

    console.log(location.search)

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

    getCategories()

    function getCategories(){
        db.collection("alliance").get().then((query) =>{
            query.forEach((element) => {
                console.log(element.id)
                fillDropDown(element.id)
                var elements = document.querySelectorAll('select');
                var options = document.querySelectorAll('option')
                M.FormSelect.init(elements, options);
            });
        });
    }

    if(categoryFromList != null){
        getEstablisments(categoryFromList)
    }
    else{
        getEstablisments("Belleza")
    }
    
    

    function getEstablisments(category){
        db.collection('alliance').doc(category).collection('establishments').get().then(query =>{
            establishmentList.innerHTML = ""
            query.forEach(element =>{
                var doc = element.data();
                var description = doc.description.substring(0, 130) + '...'
                description
                fillEstablishment(doc.establishment, description)
                companyNames = document.querySelectorAll('.company-name');
                companyDescription = document.querySelectorAll('.company-description')
                actionEdit = document.querySelectorAll('.actions-edit')
                actionDelete = document.querySelectorAll('.actions-delete')
                actionEdit.forEach((element, index) => {
                    element.addEventListener('click', e => {    
                        promoTitle2.value = companyNames[index].textContent
                        promoDescription.value = companyDescription[index].textContent
                        editContainer.style.display = "block"
                        editChartContainer.style.display = "block"
                    })
                })
                actionDelete.forEach((element, index) => {
                    element.addEventListener('click', e => {
                        titleContainer.textContent = doc.establishment
                        editContainer.style.display = 'block'
                        deleteChartContainer.style.display = 'block'
                        promoId = doc.promotion_id
                    })
                }) 
            })
        });
    }

    function fillDropDown(item){
        elems.innerHTML += `<option value=${item}>${item}</option>`;
    };

    document.addEventListener('DOMContentLoaded', e => {
        var elements = document.querySelectorAll('select');
        var options = document.querySelectorAll('option')
        M.FormSelect.init(elements);
        elems.selectedIndex = '3'
    });

    function fillEstablishment(name, description){
        establishmentList.innerHTML += 
        `<div class="col l12 m12 s12 establishment-item">
            <div class="col l6 ">
                <div class="company-name">${name}</div>
            </div>
            <div class="col l2 actions-icons">
                <i class="actions-see material-icons" style="height: 15px; line-height:15px; color: teal;">remove_red_eye</i>
            </div>
            <div class="col l2 actions-icons">
                <i class="actions-edit material-icons" style="height: 15px; line-height:15px; color: teal;">create</i>
            </div>
            <div class="col l2 actions-icons">
                <i class="actions-delete material-icons" style="height: 15px; line-height:15px; color: tomato;">clear</i>
            </div> 
            <div class="col l12"><div style="color: green;" class="company-description">${description}</div></div>
        </div>`
    }

    imageSubmit.addEventListener('change', function (e) {
        const reader = new FileReader();
        const file = e.target.files[0]
        globalEstablishment = file
        reader.readAsDataURL(file);
        console.log(globalEstablishment)
    });

    addEstablishment.addEventListener('click', e => {
        if(description.value != '' && direction.value != '' && establishment_name.value != '' && filePath.value != '' && phone_number.value != ''){
            selectedCategory.textContent = elems.value
            selectedEstablishment.textContent = establishment_name.value
            confirmationContainer.style.display = 'block'
            editContainer.style.display = 'block'
        }
        else{
            alertContainer.style.display = 'block'
            editContainer.style.display = 'block'
        }
    })

    function addEstablishmentFun(){
        loader.style.display = 'block'
        loaderBackground.style.display = 'block' 
        const ref = storage.child('alliance-image/logos/' + globalEstablishment.name)
    
        new compressor(globalPromo,{
            quality: 0.6,
            success(compressedImage) {

                ref.put(compressedImage).then((snap) => {
                    console.log("uploaded success");
                    snap.ref.getDownloadURL().then(function (downloadURL) {
                        console.log('File available at', downloadURL);
                        let establishment = {
                            description:document.getElementById("edescription").value,
                            direction: document.getElementById("eaddress").value,
                            establishment:document.getElementById("ename").value,
                            establishment_image: downloadURL,
                            phone_number: document.getElementById("ephone").value,
                        }
            
                        const requestJson = {
                            establishment: establishment,
                            category_id: elems.value,
                            collectionPath:collectionPath,
                            subCollectionPath:subCollectionPath
                        }
                        console.log(establishment);
                        console.log(requestJson);
            
                        var addEstablishment = firebase.functions().httpsCallable('callAddEstablishment');
                        addEstablishment(requestJson).then(function (result) {
                            loader.style.display = 'none'
                            loaderBackground.style.display = 'none'
                            description.value = ""
                            direction.value = ""
                            establishment_name.value = ""
                            filePath.value = ""
                            phone_number.value = ""
                            getEstablisments(elems.value)
                            console.log("function called");
                            alert("El Establecimiento fue agregado exitosamente")
                        })
                        .catch(error =>{
                            alert('UPPS, something went wrong!' + error)
                            loader.style.display = 'none'
                            loaderBackground.style.display = 'none' 
                        })
            
                    });
            
                });
            }});

       
    }

    elems.addEventListener('change', e =>{
        getEstablisments(elems.value)
    })

    closeButton.addEventListener('click', e => {
    editContainer.style.display = 'none'
    editChartContainer.style.display = 'none'
    modificationFilePath.value = ''

    })

    closeDeleteChart.addEventListener('click', e => {
    console.log('click')
    editContainer.style.display = 'none'
    deleteChartContainer.style.display = 'none'
    })

    lockPromo.addEventListener('click', e => {
    console.log(promoId)
    var promRef = db.collection('alliance').doc(elems.value).collection('establishments').doc(establishment.value).collection('promotions').doc(promoId)
    return promRef.update({
        estado: false
    })
    .then(e => {
        console.log('la promocion fue desactivada exitosamente')
        editContainer.style.display = 'none'
        deleteChartContainer.style.display = 'none'
        getPromos(elems.value, establishment.value)
    })
    .catch(error => {
        console.log('something went wrong: ' + error)
    })
    })

    closeAlert.addEventListener('click', e => {
        alertContainer.style.display = 'none'
            editContainer.style.display = 'none'
    })

    closeConfirmationChart.addEventListener('click', e => {
        confirmationContainer.style.display = 'none'
        editContainer.style.display = 'none'
    })

    confirmEstablishment.addEventListener('click', e => {
        addEstablishmentFun()
    })