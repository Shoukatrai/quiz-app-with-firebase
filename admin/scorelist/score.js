import { collection, db, doc, getDocs, query, where } from "../../firebase.js";

const optionContainer = document.getElementById("optionContainer")

const scoreTable = document.getElementById("scoreTable")
const container = document.getElementById("container")
const scoreListing = async () => {
    try {
        console.log("scoreListing")
        const user = JSON.parse(localStorage.getItem("user"))
        // console.log(user)
        const snap = await getDocs(collection(db, "scores"))
        snap.forEach((doc) => {
            const data = doc.data()
            const percent = (data.correctAns / data.totalQue) * 100
            console.log("data", data)
            container.innerHTML += `
          <td>01</td>
          <td> ${data.quizTitle} </td>
          <td> ${data.correctAns}  </td>
          <td> ${data.wrongAns}  </td>
          <td> ${data.totalQue}  </td>
          <td>${percent.toFixed(1)}% </td>`
        })
    } catch (error) {
        console.log(error)
    }
}


const getQuizListing = async () => {
    try {
        console.log("getQuizListing")
        const quizSnapShot = await getDocs(collection(db, "quizzes"))
        quizSnapShot.forEach((doc) => {
            const data = doc.data()
            console.log(data)
            const quizObj = { ...data, id: doc.id }
            console.log(quizObj)
            optionContainer.innerHTML += `<option value=${doc.id}> ${data.title} </option>`
        })
    } catch (error) {
        console.log(error)
    }
}


const quizFilter = async (ele) => {
    try {
        console.log(ele.value)
        const q = query(collection(db , "scores") , where("quizId" , "==" , ele.value))
        const score =await getDocs(q)
        score.forEach((doc)=>{
            const data = doc.data()
            const percent = (data.correctAns / data.totalQue) * 100
            console.log(doc.data())
            
            console.log(container)
            container.innerHTML = ''
            container.innerHTML += `
          <td>01</td>
          <td> ${data.quizTitle} </td>
          <td> ${data.correctAns}  </td>
          <td> ${data.wrongAns}  </td>
          <td> ${data.totalQue}  </td>
          <td>${percent.toFixed(1)}% </td>`
        })
    } catch (error) {
        console.log(error)
    }
}


window.quizFilter = quizFilter
window.getQuizListing = getQuizListing
window.scoreListing = scoreListing