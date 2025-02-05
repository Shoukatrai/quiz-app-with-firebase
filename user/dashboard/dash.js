import { collection, db, getDocs } from "../../firebase.js"

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

const parent = document.querySelector(".parent")
const showQuizDetail =async ()=>{
    try {
        const quiz = await getDocs(collection(db , "quizzes"))
        quiz.forEach((doc)=>{
            const quizData = doc.data()
            console.log(quizData)
            parent.innerHTML += `<div class="card">
            <h1 id="quizTitle"> ${quizData.title} </h1>
            <h2 id="quizCategory"> ${quizData.category}  </h2>
            <h3 id="quizDesc"> ${quizData.desc}  </h3>
        </div>`
        })
       
    } catch (error) {
        console.log(error)
    }


}



window.showQuizDetail = showQuizDetail
window.adminCheck = adminCheck
window.logOut = logOut