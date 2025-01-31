import { collection, db, doc, getDocs, updateDoc } from "../../firebase.js"


const quizContainer = document.getElementById("quizContainer")
const showQuiz = async () => {
    const quizzes = await getDocs(collection(db, "quizzes"))
    quizzes.forEach((doc) => {
        quizContainer.innerHTML = ""
        const quizData = doc.data()
        console.log(quizData)
        quizContainer.innerHTML += `<div class="card">
      <h1> ${quizData.title} </h1>
      <h2> ${quizData.category} </h2>
      <p> ${quizData.desc} </p>
      ${quizData.isActive == true ? ` <button id = ${doc.id} class="active" onclick = "statusCheck(this , 'active')">Active</button>` : ` <button id = ${doc.id} class="inactive" onclick = "statusCheck(this , 'inactive')">In Active</button>`}
        
    </div>`
    })
}

const statusCheck = async (ele, status) => {
    try {
        console.log(status)
        console.log(ele.id)
        const quizId = ele.id
        await updateDoc(doc(db, "quizzes", quizId), {
            isActive: status === "active" ? false : true
        })
        showQuiz()
    } catch (error) {
        console.log(error)
        alert(error.message)
    }

}


window.statusCheck = statusCheck
window.showQuiz = showQuiz