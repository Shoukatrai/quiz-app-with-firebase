import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from "../../firebase.js"

const firstName = document.querySelector("#firstName")
const lastName = document.querySelector("#lastName")
const phoneNumber = document.querySelector("#phoneNumber")
const email = document.querySelector("#email")
const password = document.querySelector("#password")

const signUpHandler = async ()=>{
    try {
        const dataOj = {
            firstName:firstName.value,
            lastName:lastName.value,
            phoneNumber:phoneNumber.value,
            email: email.value
        }
    
        console.log(dataOj)

        const user = await createUserWithEmailAndPassword(auth , email.value , password.value)
        console.log(user)
        await setDoc(doc(db , "user", user.user.uid ),{
            ...dataOj,
            uid:user.user.uid,
            userType: "user",
            isDeleted: false,
            isBlock: false
        })
        alert("Sign up Successfully!")
        window.location.assign("../../index.html")
        
    } catch (error) {
        console.log(error)
        alert(error.message)
    }
    
}


window.signUpHandler =  signUpHandler