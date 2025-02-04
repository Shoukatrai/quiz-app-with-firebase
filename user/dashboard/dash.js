const logOut = ()=>{
    localStorage.clear()
    window.location.replace("../../index.html")
}

const adminCheck = ()=>{
    const user =JSON.parse(localStorage.getItem("user"))
    if(user.userType == "admin"){
        window.location.replace("../../admin/dashboard/dash.html")
        return
    }
}




window.adminCheck = adminCheck
window.logOut = logOut