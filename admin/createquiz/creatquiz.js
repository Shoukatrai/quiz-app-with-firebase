import { addDoc, collection, db } from "../../firebase.js"

const title = document.getElementById("title")
const desc = document.getElementById("desc")
const category = document.getElementById("category")
const duration = document.getElementById("duration")
const score = document.getElementById("score")

const createQuizBtn = document.getElementById("createQuizBtn")



let questArray = [];
let savObject = {}
console.log(savObject, "savObject empty");


const form = document.getElementById("form")
const qustions = document.getElementById("qustions")

const quizHandler = async () => {
    try {
        if (title.value == "" || desc.value == "" || category.value == "" || duration.value == "" || score.value == "") {
            alert("Please Fill the all fields!")
            return
        }


        savObject.title = title.value;
        savObject.desc = desc.value;
        savObject.category = category.value;
        savObject.duration = duration.value;
        savObject.score = score.value;
        console.log(savObject, "savObject no empty");
        form.style.display = "none"
        qustions.style.display = "block"

    } catch (error) {
        console.log(error)
    }
}

const questionHandler = () => {
    console.log(savObject)
    const quest = document.getElementById("quest")
    const option1 = document.getElementById("option1")
    const option2 = document.getElementById("option2")
    const option3 = document.getElementById("option3")
    const option4 = document.getElementById("option4")
    const correctAns = document.getElementById("correctAns")

    if (quest.value == "" || option1.value == "" || option2.value == "" || option3.value == "" || option4.value == "" || correctAns.value == "") {
        alert("Enter all Fields!")
        return
    }


    const obj = {
        qustion: quest.value,
        options: [option1.value, option2.value, option3.value, option4.value],
        correctAns: correctAns.value
    }
    questArray.push(obj)
    console.log(obj)
    console.log(questArray)
    quest.value = ""
    option1.value = ""
    option2.value = ""
    option3.value = ""
    option4.value = ""
    correctAns.value = ""
    createQuizBtn.disabled = false;
}

const createQuiz = async () => {
    try {
        savObject.questions = questArray
        savObject.isActive = false
        console.log(savObject)
        const quizData = await addDoc(collection(db , "quizzes"),savObject)
        console.log(quizData)
        alert("Quiz created successfully!")
        qustions.style.display = "none";
        form.style.display = "block"
        title.value = ""
        desc.value = ""
        category.value = ""
        duration.value = ""
        score.value = ""
    } catch (error) {
        console.log(error)
    }
}



window.createQuiz = createQuiz
window.quizHandler = quizHandler
window.questionHandler = questionHandler