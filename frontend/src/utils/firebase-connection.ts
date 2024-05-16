import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes, UploadResult} from "firebase/storage";

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

function saveImage(image: File, name: string): Promise<UploadResult> {
	// TODO: setup name of image
	const imageRef = ref(storage, `profile-pics/${name}`);
	return uploadBytes(imageRef, image);
}

async function getImageUrl(image_name: string): Promise<string> {
	const imgRef = ref(storage, `profile-pics/${image_name}`);
	//const imgRef = ref(storage, `profile-pics/test.png`);
	return await getDownloadURL(imgRef);
}

export {getImageUrl, saveImage}
