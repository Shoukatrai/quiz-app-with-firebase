import { auth, db, doc, getDoc, signInWithEmailAndPassword } from "../../firebase.js";

const email = document.querySelector("#email")
const password = document.querySelector("#password")

const loginCheck =()=>{
    console.log("loginCheck")
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    if(user){
        if(user.userType == "admin"){
            window.location.assign("../../admin/dashboard/dash.html")
           
        }else{
            window.location.assign("../../user/dashboard/dash.html")
        }
    }
}


const loginHnadler = async () => {
    try {
        const loginUser = await signInWithEmailAndPassword(auth, email.value, password.value)
        console.log(loginUser)
        const loginId = loginUser.user.uid
        const user =  await getDoc(doc(db ,"user" , loginId))
        const userData = user.data()
        console.log("userData" , userData)
        
        localStorage.setItem("user" , JSON.stringify(userData))
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




window.loginCheck = loginCheck
window.loginHnadler = loginHnadler