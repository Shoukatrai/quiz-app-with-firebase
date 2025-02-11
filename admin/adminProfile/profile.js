import { db, getDoc, doc, updateDoc } from "../../firebase.js"

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


const saveBtn = document.querySelector(".Savebtn")

let editElement;
const editDetail = (ele) => {
    ele.parentNode.children[1].disabled = false;
    console.log(saveBtn)
    saveBtn.style.display = "block"
    console.log(ele.parentNode.children[1].value)
    return editElement = ele
}



const saveEditValue = async () => {
    try {
        console.log("editElement" , editElement)
        console.log("saveEditValue")
        const user = JSON.parse(localStorage.getItem("user"))

        const userData = await getDoc(doc(db, "user", user.uid))
        console.log(userData.data())

        const updateDocument = doc(db, "user", user.uid);

        // Set the "capital" field of the city 'DC'
        await updateDoc(updateDocument, {
            firstName: firstName.value,
            lastName: lastName.value,
            phoneNumber: phoneNumber.value,
            email: email.value
        });
        alert("Updated Successfully!")
        saveBtn.style.display = "none"
        editElement.parentNode.children[1].disabled = true;
        
        window.location.reload()
    } catch (error) {
        console.log(error)
        alert(error.message)
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
window.saveEditValue = saveEditValue
window.editDetail = editDetail