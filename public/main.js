

let global_file;
const auth = firebase.auth();

  

function logout(){
    firebase.auth().signOut();
    window.location.href = "index.html";
};

function login(){
    
    document.getElementById("demo-content").style.display = "block";
    const email = document.getElementById("login-email");
    const password = document.getElementById("login-password");

    firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(user=>{
        document.getElementById("demo-content").style.display = "none";
        window.location.href = "prueba.html";
    })
        .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message

        
 
        if (errorCode === 'auth/wrong-password.')
        {
            alert("wrong password");
            document.getElementById("demo-content").style.display = "none";
        }
        else if (errorCode != 'auth/wrong-password.' )
        {
            document.getElementById("demo-content").style.display = "none";
            alert(errorMessage)
        }
        
        
    });
    
};

firebase.auth()

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.location.href = "prueba.html";
    }
  });