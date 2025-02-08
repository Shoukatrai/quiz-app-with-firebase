import { db, getDoc, doc } from "../../firebase.js"

const adminCheck = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    if (user.userType == "user") {
        window.location.assign("../../user/dashboard/dash.html")
        return
    }
}

const showProfileDetail = async () => {
    try {
        const profileImage = document.getElementById("profileImage")
        console.log(profileImage.src, "profileImage")
        const firstName = document.getElementById("firstName")
        const lastName = document.getElementById("lastName")
        const phoneNumber = document.getElementById("phoneNumber")
        const email = document.getElementById("email")

        const lognUser = JSON.parse(localStorage.getItem("user"))
        const user = await getDoc(doc(db, "user", lognUser.uid))
        const userData = user.data()
        console.log('userData', userData)
        firstName.value = userData.firstName
        lastName.value = userData.lastName
        phoneNumber.value = userData.phoneNumber
        email.value = userData.email
        profileImage.src = userData.imageUrl

    } catch (error) {
        console.log(error.message)
    }
}


const logOut = () => {
    console.log("logOut")
    localStorage.clear()
    window.location.replace("../../index.html")
}


window.logOut = logOut
window.adminCheck = adminCheck
window.showProfileDetail = showProfileDetail