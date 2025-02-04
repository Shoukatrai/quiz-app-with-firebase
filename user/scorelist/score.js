import { app, collection, db, getDocs, query, where } from "../../firebase.js"

let number = 0
const getScore = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"))
        console.log(user)
        const q = query(collection(db , "scores"), where("userId" , "==" , user.uid))
        const score =await getDocs(q)
        score.forEach((doc)=>{
            console.log(doc.data())
            const percent = (doc.data().correctAns / doc.data().totalQue)*100
            console.log(percent)
            document.getElementById("scoreTable").innerHTML += ` <tr>
                    <td>0</td>
                    <td> ${doc.data().quizTitle} </td>
                    <td> ${doc.data().correctAns} </td>
                    <td> ${doc.data().wrongAns} </td>
                    <td> ${doc.data().totalQue} </td>
                    <td> ${percent.toFixed(1)}% </td>
                </tr>`
        })
        console.log(score)
    } catch (error) {
        console.log(error)
    }
}



const logOut = () => {
    console.log("logOut")
    localStorage.clear()
    window.location.replace("../../index.html")
}

window.getScore = getScore
window.logOut = logOut