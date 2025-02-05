import { db, doc, getDoc } from "../../firebase.js"

const adminCheck = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    if (user.userType == "admin") {
        window.location.replace("../../admin/dashboard/dash.html")
        return
    }
}


console.log("firstName" , firstName)

const showProfileDetail = async () => {
    try {
        const firstName = document.getElementById("firstName")
        const lastName = document.getElementById("lastName")
        const phoneNumber = document.getElementById("phoneNumber")
        const email = document.getElementById("email")

        const lognUser = JSON.parse(localStorage.getItem("user"))
        const user = await getDoc(doc(db , "user" ,lognUser.uid ))
        const userData = user.data()
        console.log('userData' , userData)
        firstName.value = userData.firstName
        lastName.value = userData.lastName
        phoneNumber.value = userData.phoneNumber
        email.value = userData.email


    } catch (error) {
        console.log(error.message)
    }

}

const editDetail = (ele) => {
    ele.parentNode.children[1].disabled = false;
    console.log(ele.parentNode.children[1].value)
}

const logOut = ()=>{
    console.log("logOut")
    localStorage.clear()
    alert("Log out Successful!")
    window.location.replace("../../index.html")
}

window.logOut = logOut
window.showProfileDetail = showProfileDetail
window.adminCheck = adminCheck
window.editDetail = editDetail