const compressor = require('compressorjs');
const btnBack = document.querySelector('.btn-back')
const btnEstabelecimientos = document.querySelector('.btn-establecimientos')
const btnPromociones = document.querySelector('.btn-promociones')
const btnLista = document.querySelector('.btn-lista')
const elems = document.querySelector('.drop-down-categories')
var establishment = document.querySelector('.drop-down-establishments')
const db = firebase.firestore()
const storage = firebase.storage().ref();
const promosList = document.querySelector('.promos-list')
const unavailablePromosList = document.querySelector('.unavailable-promos-list')
const alertContainer = document.querySelector('.alert-container')
const editContainer = document.getElementById("edit-container")
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
var filePath = document.querySelector('.file-path')
var description = document.getElementById("promo-description")
var title = document.getElementById("promo-title")
const addPromotion = document.querySelector('.add-promotion')
const imageSubmit = document.querySelector('.image-submit')
let globalPromo;
var unavailableStatement = document.querySelector('.unavailable-statement')
var selectedCategory = document.getElementById("selected-category")
var selectedEstablishment = document.getElementById("selected-establishment")

const confirmPromo = document.querySelector('.confirm-promo')
const closeConfirmationChart = document.querySelector('.close-confirmation-chart')

const confirmationContainer = document.querySelector('.confirmation-container')

const titleContainer = document.querySelector('.title-container')

let promoId;


const modificationPromoSubmit = document.querySelector('.modification-promo-submit')
var collectionPath = "alliance"
var subCollectionPath = "promotions"



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

    document.addEventListener('DOMContentLoaded', e => {
        var elements = document.querySelectorAll('select');
        var options = document.querySelectorAll('option')
        M.FormSelect.init(elements);
    });

    db.collection("alliance").get().then((query) =>{
        query.forEach((element) => {
            console.log(element.id)
            fillDropDown(element.id)
            var elements = document.querySelectorAll('select');
            var options = document.querySelectorAll('option')
            M.FormSelect.init(elements, options);
        });
    });

    getEstablishment('Belleza')

    function getEstablishment(category){
        establishment.innerHTML = ''
        db.collection("alliance").doc(category).collection("establishments").get().then(query => {
            query.forEach(element =>{
                var obj = element.data()
                fillDropDownEstablishment(obj.establishment, element.id)
                var elements = document.querySelectorAll('select');
                var options = document.querySelectorAll('option')
                M.FormSelect.init(elements, options);
            })
        })

    }

    getPromos('Belleza','3qsOjW4YxMCwDn1hDpso')

    function getPromos(category, establishmentId){
        db.collection('alliance').doc(category).collection('establishments').doc(establishmentId).collection('promotions').get().then(query =>{
            promosList.innerHTML = ""
            unavailablePromosList.innerHTML = ""
            unavailableStatement.style.display = 'block'
            query.forEach(element =>{
                var doc = element.data();
                if(doc.estado){
                    var description = doc.description.substring(0, 230) + '...'
                    fillPromos(doc.promotion_name, description)
                    promoTitle = document.querySelectorAll('.promo-title');
                    actionEdit = document.querySelectorAll('.actions-edit')
                    actionDelete = document.querySelectorAll('.actions-delete')
                    actionEdit.forEach((element, index) => {
                        element.addEventListener('click', e => {    
                            promoId = doc.promotion_id       
                            console.log(promoTitle[index])
                            console.log('edit: '+ promoTitle[index].textContent)
                            promoTitle2.value = doc.promotion_name
                            promoDescription.value = doc.description
                            editContainer.style.display = "block"
                            editChartContainer.style.display = "block"
                        })
                    })
                    actionDelete.forEach((element, index) => {
                        element.addEventListener('click', e => {
                            console.log('delete: ' + promoTitle[index].textContent)
                            titleContainer.textContent = promoTitle[index].textContent
                            editContainer.style.display = 'block'
                            deleteChartContainer.style.display = 'block'
                            promoId = doc.promotion_id
                        })
                    }) 
                }
                else{
                    unavailableStatement.style.display = 'none'
                    var description = doc.description.substring(0, 230) + '...'
                    fillUnavailablePromos(doc.promotion_name, description)
                }
            })
        });
    }

    function fillPromos(name, description){
        promosList.innerHTML += 
        `<div class="col l12 m12 s12 establishment-item">
            <div class="col l6 ">
                <div class="promo-title" style="color: green;">${name}</div>
            </div>
            <div class="col l2 offset-l2 actions-icons">
                <i class="actions-edit material-icons" style="height: 15px; line-height:15px; color: teal;">create</i>
            </div>
            <div class="col l2 actions-icons">
                <i class="actions-delete material-icons" style="height: 15px; line-height:15px; color: tomato;">clear</i>
            </div> 
            <div class="col l12"><div style="color: gray;">${description}</div></div>
        </div>`
    }

    function fillUnavailablePromos(name, description){
        unavailablePromosList.innerHTML += 
        `<div class="col l12 m12 s12 establishment-item">
            <div class="col l6 ">
                <div class="promo-title" style="color: gray;">${name}</div>
            </div>
            <div class="offset-l2 col l2 actions-icons">
                <i class="actions-delete material-icons" style="height: 15px; line-height:15px; color: black;">lock_open</i>
            </div> 
            <div class="col l12"><div style="color: teal;">${description}</div></div>
        </div>`
    }

 

    function fillDropDown(item){
        elems.innerHTML += `<option value=${item}>${item}</option>`;
    };

    function fillDropDownEstablishment(item, id){
        establishment.innerHTML += `<option value=${id}>${item}</option>`;
        console.log(elems.value)
        console.log(establishment.value)
        getPromos(elems.value, establishment.value)
    };

    elems.addEventListener('change', e=>{
        console.log(elems.value)
        getEstablishment(elems.value)
        console.log(elems.value)
        console.log(establishment.value)
    });

    establishment.addEventListener('change', e => {
        getPromos(elems.value, establishment.value)
    });

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

    modificationPromoSubmit.addEventListener('change', e => {
        const reader = new FileReader();
        const file = e.target.files[0]
        globalPromo = file
        reader.readAsDataURL(file);
        console.log(globalPromo)
        console.log(reader)
    })

    
    modifyButton.addEventListener('click', e => {
        if(modificationFilePath == ''){
            loader.style.display = 'block'
            loaderBackground.style.display = 'block' 
            var newTitle = document.getElementById('new-promo-title')
            var newDescription = document.getElementById('new-promo-description')
            console.log(globalPromo)
            console.log(elems.value)
            console.log(establishment.value)
            console.log(promoId)
            const ref = storage.child('alliance-image/promotions/' + globalPromo.name)
            ref.put(globalPromo).then((snap) => {
                console.log("uploaded success");
                snap.ref.getDownloadURL().then(imageUrl =>{
                console.log(imageUrl)
                var promRef = db.collection('alliance').doc(elems.value).collection('establishments').doc(establishment.value).collection('promotions').doc(promoId)
                return promRef.update({
                    description: newDescription.value,
                    promotion_name: newTitle.value,
                    image:imageUrl
                })
                .then(e =>{
                    modificationFilePath = ''
                    loader.style.display = 'none'
                    loaderBackground.style.display = 'none'
                    console.log('the element was succesfully modified')
                    editContainer.style.display = 'none'
                    editChartContainer.style.display = 'none'
                    modificationFilePath.value = ''
                    alert('Actualizacion exitosa')
                    getPromos(elems.value, establishment.value)

                })
                .catch(error => {
                    modificationFilePath = ''
                    loader.style.display = 'none'
                    loaderBackground.style.display = 'none'
                    alert('UPSSS, something went wrong!' + error)
                })
            })
        })
        }
        else{
            loader.style.display = 'block'
            loaderBackground.style.display = 'block' 
            var newTitle = document.getElementById('new-promo-title')
            var newDescription = document.getElementById('new-promo-description')
            var promRef = db.collection('alliance').doc(elems.value).collection('establishments').doc(establishment.value).collection('promotions').doc(promoId)
            return promRef.update({
                description: newDescription.value,
                promotion_name: newTitle.value, 
            })
            .then(e =>{
                loader.style.display = 'none'
                loaderBackground.style.display = 'none'
                console.log('the element was succesfully modified')
                editContainer.style.display = 'none'
                editChartContainer.style.display = 'none'
                modificationFilePath.value = ''
                alert('Actualizacion exitosa')
                getPromos(elems.value, establishment.value)

            })
            .catch(error => {
                loader.style.display = 'none'
                loaderBackground.style.display = 'none'
                alert('UPSSS, something went wrong!' + error)
            })
        }
    });

    
   imageSubmit.addEventListener('change', e => {
        const reader = new FileReader();
        const file = e.target.files[0]
        globalPromo = file
        reader.readAsDataURL(file);
        console.log(globalPromo)
        console.log(reader)

       
    })

    

    addPromotion.addEventListener('click', e => {
        console.log(title.value)
        console.log(description.value)
        console.log(filePath.value)
        if(title.value != '' && description.value != '' && filePath.value != ''){
            selectedCategory.textContent = elems.value
            selectedEstablishment.textContent = establishment.value
            confirmationContainer.style.display = 'block'
            editContainer.style.display = 'block'
        }
        else{
            alertContainer.style.display = 'block'
            editContainer.style.display = 'block'
        }
    });

    closeAlert.addEventListener('click', e => {
        alertContainer.style.display = 'none'
            editContainer.style.display = 'none'
    })

    function addPromo(){

        loader.style.display = 'block'
        loaderBackground.style.display = 'block'
        const rating = {
            five: 0,
            four: 0,
            three: 0,
            two: 0,
            one: 0
        }
        const ref = storage.child('alliance-image/promotions/' + globalPromo.name)

        new compressor(globalPromo,{
            quality: 0.6,
            success(compressedImage) {
                console.log(`the result is -> ${JSON.stringify( compressedImage)}`);
                console.log(`the result size is -> ${compressedImage.size}`);
                ref.put(compressedImage).then((snap) => {
                    console.log("uploaded success");
                    snap.ref.getDownloadURL().then(function (downloadURL) {
                        console.log('File available at', downloadURL);
                        let promotion = {
                            estado: true,
                            date: new Date(),
                            description: description,
                            image: downloadURL,
                            rating: rating,
                            promotion_name: title,
                            rating_avg: 0
                        }
                        const requestJson = {
                            promotion: promotion,
                            category: elems.value,
                            establishment_id: establishment.value,
                            collectionPath:collectionPath,
                            subCollectionPath:subCollectionPath
                        }
                        console.log(promotion);
                        console.log(requestJson);
        
                        var addPromotion = firebase.functions().httpsCallable('callAddPromotion');
                        addPromotion(requestJson)
                        .then(function (result) {
                            loader.style.display = 'none'
                            loaderBackground.style.display = 'none'    
                            getPromos(elems.value, establishment.value)
                            description.value = ''
                            title.value = ''
                            filePath.value = ''
                            // Read result of the Cloud Function.
                            console.log("function called");
                            
                            alert("La Promocion fue agregada exitosamente")
                            // ...
                        })
                        .catch(error =>{
                            description = ''
                            title = ''
                            filePath = ''
                            alert('something went wrong: ' + error)
                            loader.style.display = 'none'
                            loaderBackground.style.display = 'none'
                        });
                    });
                });
             
            }

        });
   
    }

    closeConfirmationChart.addEventListener('click', e => {
        confirmationContainer.style.display = 'none'
        editContainer.style.display = 'none'
    })

    confirmPromo.addEventListener('click', e => {
      addPromo()
    })
  const loader = document.querySelector('.loader')
  const loaderBackground = document.querySelector('.loader-background')