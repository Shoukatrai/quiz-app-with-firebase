import { collection, db, getDocs } from "../../firebase.js";

const authCheck = () => {
    console.log("auth")
    const user = localStorage.getItem("user");
    if (user === null) {
        window.location.replace("../../index.html")
    }
}

const adminCheck = () => {
    console.log("admincheck")
    const user = localStorage.getItem("user");
    const userData = JSON.parse(user)
    console.log(userData)
    if (userData.userType === "admin") {
        window.location.replace("../../admin/dashboard/dash.html")
    }
}

const parent = document.querySelector(".parent")
console.log(parent)

const quizList = async () => {
    try {
        console.log("quizList")

        const quizlsiting = await getDocs(collection(db, "quizzes"))
        console.log(quizlsiting)
        quizlsiting.forEach((doc) => {
            const quizData = doc.data()
            console.log(quizData)
            if (quizData.isActive == true) {
                console.log("true")
                parent.innerHTML += `
                <div class="card">
                    <h1> ${quizData.title} </h1>
                    <h2> ${quizData.category} </h2>
                    <h3> ${quizData.desc} </h3>
                    <button onclick = "startQuiz('${doc.id}')">Start</button>
                </div>`
            } else {
                console.log("false")
            }
        })
    } catch (error) {
        console.log(error)
        alert(error.message)
    }
}

const startQuiz = (id) => {
    console.log(id)
    sessionStorage.setItem("quizId", id)
    window.location.assign("../quizapp/quizapp.html")
}


const logOut = () => {
    localStorage.clear()
    alert("Log out Successful!")
    window.location.replace("../../index.html")
}

window.logOut = logOut
window.startQuiz = startQuiz
window.quizList = quizList
window.adminCheck = adminCheck
window.authCheck = authCheck 