const autCheck =()=>{
    const user = localStorage.getItem("user");
    if(user === null){
        window.location.replace("../../index.html")
    }
}

const adminCheck = ()=>{
    const user = localStorage.getItem("user");
    const userData = JSON.parse(user)
    console.log(userData)
    if(userData.userType ==="user"){
        window.location.replace("../../user/dashboard/dash.html")
    }
}


export{
    autCheck,
    adminCheck
}