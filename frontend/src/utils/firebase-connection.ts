import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes} from "firebase/storage";

const firebaseConfig = {

	apiKey: "AIzaSyA3WtADi7oEaz8eVufCVdWD73A6HsNUZJU",

	authDomain: "experimental-se.firebaseapp.com",

	projectId: "experimental-se",

	storageBucket: "experimental-se.appspot.com",

	messagingSenderId: "1012726223084",

	appId: "1:1012726223084:web:62c38c4e3a8887d5c855c9"

};

const fire = initializeApp(firebaseConfig);

// Storage bucket for our files
const storage = getStorage();

function saveImage(image: File, name: string) {
	// TODO: setup name of image
	const imageRef = ref(storage, `profile-pics/${name}`)
	uploadBytes(imageRef, image)
		.then(snap => {console.log("success")})
		.catch(e => {console.log("failure")})
}

export {saveImage}