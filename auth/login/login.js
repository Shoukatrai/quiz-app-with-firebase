import { auth, db, doc, getDoc, signInWithEmailAndPassword } from "../../firebase.js";

const email = document.querySelector("#email")
const password = document.querySelector("#password")

const loginHnadler = async () => {
    try {
        const loginUser = await signInWithEmailAndPassword(auth, email.value, password.value)
        console.log(loginUser)
        const loginId = loginUser.user.uid
        const user =  await getDoc(doc(db ,"user" , loginId))
        console.log(user.data())
        localStorage.setItem("user" , JSON.stringify(user.data()))
        alert("Login Successful!")
        if(user.data().userType === "admin"){
            window.location.replace("../../admin/dashboard/dash.html")
        }else{
            window.location.replace("../../user/dashboard/dash.html")
        }
    } catch (error) {
        console.log(error)
        alert(error.message)
    }

}

window.loginHnadler = loginHnadler