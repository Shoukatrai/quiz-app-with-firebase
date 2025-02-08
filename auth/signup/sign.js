import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from "../../firebase.js"


//create supabase client
const supabaseClient = supabase.createClient('https://amodbmqlajmttgxzqnqz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtb2RibXFsYWptdHRneHpxbnF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5MTQ1ODQsImV4cCI6MjA1NDQ5MDU4NH0.BlSLOoiAXwwHUSnuKeMTYpmdeMU0RgztYnj0KweSjwE')
console.log(supabaseClient)



const firstName = document.querySelector("#firstName")
const lastName = document.querySelector("#lastName")
const phoneNumber = document.querySelector("#phoneNumber")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const profileImage = document.querySelector("#profileImage")


const signUpHandler = async () => {
    try {
        if (firstName.value == "" || lastName.value == "" || email.value == "" || password.value == "") {
            alert("First Name, Email , Password are required!")
            return
        }
        const dataOj = {
            firstName: firstName.value,
            lastName: lastName.value,
            phoneNumber: phoneNumber.value,
            email: email.value
        }

        console.log(dataOj)
        // firebase auth
        const user = await createUserWithEmailAndPassword(auth, email.value, password.value)
        console.log(user)

        //upload user image
        const ImageFile = profileImage.files[0]
        console.log(ImageFile)
        const { data, error } = await supabaseClient
            .storage
            .from('profileImage')
            .upload(ImageFile.name + new Date().getMilliseconds(), ImageFile)

        console.log("data", data.path)
        console.log("error", error)


        const { data: url } = supabaseClient
            .storage
            .from('profileImage')
            .getPublicUrl(data.path)

        console.log("url", url)

        //save user details on database
        await setDoc(doc(db, "user", user.user.uid), {
            ...dataOj,
            uid: user.user.uid,
            userType: "user",
            isDeleted: false,
            isBlock: false,
            imageUrl: url.publicUrl
        })
        alert("Sign up Successfully!")
        window.location.assign("../../index.html")

    } catch (error) {
        console.log(error)
        alert(error.message)
    }

}


window.signUpHandler = signUpHandler