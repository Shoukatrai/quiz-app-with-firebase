import { addDoc, app, collection, db, doc, getDoc } from "../../firebase.js";

// console.log(app)

let questions = [];
let indexNumber = 0;
let score = 0;
let duration = 0;
let quizScore = 0;

const qNumber = document.querySelector(".qNumber");
const timer = document.querySelector(".timer");

let title = ""
const checkQuizId = async () => {
    try {
        const quizId = sessionStorage.getItem("quizId")
        console.log(quizId)

        if (quizId == null) {
            window.location.replace("../quizzes/quiz.html");
            return;
        }


        const quiz = await getDoc(doc(db, "quizzes", quizId))
        const quizData = quiz.data()
        console.log(quizData)
        title = quizData.title
        timer.innerHTML = quizData.duration
        document.getElementById("quizName").innerHTML = quizData.title
        return quizData
    } catch (error) {
        console.log(error)
        alert(error.code)
    }
}

checkQuizId()
    .then((response) => {
        console.log("response", response)
        questions = response.questions
        console.log(questions)
        console.log(response)
        handleQuestion()
    })
    .catch((error) => {
        console.log(error)
    })





const optionContainer = document.getElementById("optionContainer")
const handleQuestion = () => {
    document.getElementById("nextBtn").disabled = true
    optionContainer.innerHTML = ""
    console.log("handleQuestion")
    qNumber.innerHTML = `Questions ${indexNumber + 1} / ${questions.length}`
    const optionObj = questions[indexNumber].options
    console.log(optionObj)
    document.getElementById("questionContainer").innerHTML = questions[indexNumber].question
    for (var i = 0; i < optionObj.length; i++) {
        optionContainer.innerHTML += `<li onclick = "checkAns(this)">${optionObj[i]}</li>`
    }


}

const nextQustion = () => {
    indexNumber++
    if (indexNumber < questions.length) {
        handleQuestion()
    } else {
        onSubmit()
    }
}


const allLiElement = optionContainer.children
const checkAns = (ele) => {
    const correctAns = questions[indexNumber].correctAns
    const answer = ele.innerHTML
    console.log(correctAns)
    console.log(answer)
    if (answer === correctAns) {
        console.log("correct")
        score++
        ele.style.backgroundColor = "green"
    } else {
        console.log("wrong")
        ele.style.backgroundColor = "red"

    }
    console.log(allLiElement)

    for (var i = 0; i < allLiElement.length; i++) {
        if (allLiElement[i].innerHTML == correctAns) {
            allLiElement[i].style.backgroundColor = "green"
            break
        }
    }


    for (var i = 0; i < allLiElement.length; i++) {
        allLiElement[i].style.pointerEvents = "none"
    }

    document.getElementById("nextBtn").disabled = false
}

const onSubmit = async () => {
    try { 
        document.getElementById("quizContainer").style.display = "none" 
        document.getElementById("result").style.display = "block"
        console.log("onSubmit")
        console.log(score)
        const correctAns = document.getElementById("correctAns")
        const wrongAns = document.getElementById("wrongAns")
        const totalQue = document.getElementById("totalQue")
        correctAns.innerHTML = `Correct Answers: ${score}`
        wrongAns.innerHTML = `Wrong Answers: ${questions.length - score}`
        totalQue.innerHTML = `Total Questions: ${questions.length}`

        const user = JSON.parse(localStorage.getItem("user"))
        
        const obj = {
            correctAns: score,
            wrongAns: questions.length - score,
            totalQue: questions.length,
            quizId: sessionStorage.getItem("quizId"),
            userId: user.uid,
            userName: user.firstName,
            quizTitle: title
        }

        console.log(obj)
        const response = await addDoc(collection(db, "scores"), obj)
        console.log("response", response)
        alert("Quiz Submitted")
        sessionStorage.clear()
        window.location.assign("../quizzes/quiz.html")
    } catch (error) {
        console.log(error)
    }
}


window.onSubmit = onSubmit
window.checkAns = checkAns
window.nextQustion = nextQustion 