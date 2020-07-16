const establishmentSubmit = document.getElementById("establishmentSubmit");
const promoSubmit = document.getElementById("promoSubmit");
let globalEstablishment;
const imageButton = document.getElementById("fileButton");
const storage = firebase.storage().ref();
const db = firebase.firestore();
const functions = firebase.functions();
const docRef = db.collection("users");
let global_file;
let emailAddress;
var collectionPath;
var subCollectionPath;
    const UNICOMER_PATH = "alliance_unicomer";
    const CREDICOMER_PATH = "alliance";
    const UNICOMER_PROMOTION_PATH = "promotions_unicomer";
    const CREDICOMER_PROMOTION_PATH = "promotions";

    function logout(){
        firebase.auth().signOut();
        window.location.href = "index.html";
    };

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            userId = $("#userId").text(user.email);
            emailAddress = user.email;
            console.log(emailAddress)
            if(emailAddress.includes("credicomer")){
                collectionPath="alliance";
                subCollectionPath="promotions";
                console.log(`${collectionPath}`)
                document.getElementById("logo_company").className = "logoCredicomer";
    
                db.collection(collectionPath).get().then((querySnapshot) => {
                    let html_select = '<option value="">Seleccione Categoria</option>'
                    querySnapshot.forEach((doc) => {
                        console.log(`${doc.id} => ${doc.data().category_id} => ${JSON.stringify(doc.data())}`);
                        html_select += '<option value="' + doc.data().category_id + '">' + doc.data().category_id + '</option>'
                    });
                    $('#select-categories').html(html_select);
                    $('#select-categories-2').html(html_select);
                });
    
                db.collection(collectionPath).get().then((querySnapshot) => {
                    let html_select = '<option value="">Seleccione Categoria</option>'
                    querySnapshot.forEach((doc) => {
                        console.log(`${doc.id} => ${doc.data().category_id} => ${JSON.stringify(doc.data())}`);
                        html_select += '<option value="' + doc.data().category_id + '">' + doc.data().category_id + '</option>'
                    });
                    $('#select-categories').html(html_select);
                    $('#select-categories-2').html(html_select);
                });
                
                
                
                $('#select-categories').on('change', function () {
                    const id_category = this.value;
                    let html_select = '<option value="">Seleccione Establecimiento</option>'
                    db.collection(collectionPath).doc(id_category).collection("establishments").get().then((snap) => {
                        snap.forEach((doc) => {
                            html_select += '<option value="' + doc.data().establishment_id + '">' + doc.data().establishment + '</option>'
                        });
                        $('#select-establishments').html(html_select)
                    });
                });
            }
            else{
                collectionPath=UNICOMER_PATH;
                subCollectionPath=UNICOMER_PROMOTION_PATH;
                console.log(`${collectionPath}`)
                document.getElementById("logo_company").className = "logoUnicomer";
    
                db.collection(collectionPath).get().then((querySnapshot) => {
                    let html_select = '<option value="">Seleccione Categoria</option>'
                    querySnapshot.forEach((doc) => {
                        console.log(`${doc.id} => ${doc.data().category_id} => ${JSON.stringify(doc.data())}`);
                        html_select += '<option value="' + doc.data().category_id + '">' + doc.data().category_id + '</option>'
                    });
                    $('#select-categories').html(html_select);
                    $('#select-categories-2').html(html_select);
                });
    
                db.collection(collectionPath).get().then((querySnapshot) => {
                    let html_select = '<option value="">Seleccione Categoria</option>'
                    querySnapshot.forEach((doc) => {
                        console.log(`${doc.id} => ${doc.data().category_id} => ${JSON.stringify(doc.data())}`);
                        html_select += '<option value="' + doc.data().category_id + '">' + doc.data().category_id + '</option>'
                    });
                    $('#select-categories').html(html_select);
                    $('#select-categories-2').html(html_select);
                });
                
                $('#select-categories').on('change', function () {
                    const id_category = this.value;
                    let html_select = '<option value="">Seleccione Establecimiento</option>'
                    db.collection(collectionPath).doc(id_category).collection("establishments").get().then((snap) => {
                        snap.forEach((doc) => {
                            html_select += '<option value="' + doc.data().establishment_id + '">' + doc.data().establishment + '</option>'
                        });
                        $('#select-establishments').html(html_select)
                    });
                });
                document.getElementById("logo_company").className = "logoUnicomer";
            }
        }
        else{
            window.location.href = "index.html";
        }
      });

      ///////////////////////////////////////
      $('#addPromotion').on('click', function () {
          document.getElementById("demo-content").style.display = "block";
        const rating = {
            five: 0,
            four: 0,
            three: 0,
            two: 0,
            one: 0
        }
    
    
        const ref = storage.child('alliance-image/promotions/' + globalPromo.name)
    
        ref.put(globalPromo).then((snap) => {
            console.log("uploaded success");
            snap.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
                let promotion = {
                    date: new Date(),
                    description: document.getElementById("pdescription").value,
                    image: downloadURL,
                    rating: rating,
                    promotion_name: document.getElementById("ptitle").value,
                    rating_avg: 0
                }
    
                const requestJson = {
    
                    promotion: promotion,
                    category: document.getElementById("select-categories").value,
                    establishment_id: document.getElementById("select-establishments").value,
                    collectionPath:collectionPath,
                    subCollectionPath:subCollectionPath
                }
                console.log(promotion);
                console.log(requestJson);
    
                var addPromotion = firebase.functions().httpsCallable('callAddPromotion');
                addPromotion(requestJson).then(function (result) {
                    window.location.href = "succes_upload.html";
                    // Read result of the Cloud Function.
                   console.log("function called");
                   alert("La Promocion fue agregada exitosamente")
                   window.location.href = "succes_upload.html";
                    // ...
                });
            });
        });
    });

    /////////////////////////////////////////

    $('#addEstablishment').on('click', function () {

   
        const ref = storage.child('alliance-image/logos/' + globalEstablishment.name)
    
        ref.put(globalEstablishment).then((snap) => {
            window.location.href = "succes_upload.html";
    
            console.log("uploaded success");
            snap.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
                let establishment = {
                    description:" ",
                    direction: document.getElementById("eaddress").value,
                    establishment:document.getElementById("ename").value,
                    establishment_image: downloadURL,
                    phone_number: document.getElementById("ephone").value,
                }
    
                const requestJson = {
                    establishment: establishment,
                    category_id: document.getElementById("select-categories-2").value,
                    collectionPath:collectionPath,
                    subCollectionPath:subCollectionPath
                 
                }
                console.log(establishment);
                console.log(requestJson);
    
                var addEstablishment = firebase.functions().httpsCallable('callAddEstablishment');
                addEstablishment(requestJson).then(function (result) {
                    window.location.href = "succes_upload.html";
                    // Read result of the Cloud Function.
                   console.log("function called");
                   alert("El Establecimiento fue agregado exitosamente")
                  
                   
                    // ...
                });
    
            });
    
        });
    
    
    })

      //////////////////////////////////////

      establishmentSubmit.addEventListener('change', function (e) {
        const reader = new FileReader();
        const file = e.target.files[0]
        globalEstablishment = file
        reader.onload = function (e) {
            $('#imageEstablishment').attr('src', e.target.result);
    
        }
        reader.readAsDataURL(file);
    });

    promoSubmit.addEventListener('change', function (e) {
        const reader = new FileReader();
        const file = e.target.files[0]
        globalPromo = file
        reader.onload = function (e) {
            $('#imagePromo').attr('src', e.target.result);
    
        }
        reader.readAsDataURL(file);
    
    
    });


    /////////////////////////////////////////////

      function openTab(evt, TabId){
  
        var i, tabs, tablinks;
      tabs = document.getElementsByClassName("tabs");
      for (i = 0; i < tabs.length; i++) {
        if(tabs[i]==2){
          tabs[i].style.display = "active";
        }
        tabs[i].style.display = "none";
      }
    
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
      }
    
      document.getElementById(TabId).style.display = "block";
        evt.currentTarget.className += "active";
       }

       ////////////

       