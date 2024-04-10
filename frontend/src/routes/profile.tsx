import ProtectedRoute from '../components/protectedRoute';
import {React, useState} from "react"
import {saveImage } from '../utils/firebase-connection';

export default function Profile() {
    function upload() {
        const imgInput = (document.getElementById("fupload") as HTMLInputElement);
        if (imgInput && imgInput.files) {
            const img = imgInput.files[0];
            saveImage(img, "test.png");
        }
    }

    return (
        <>
        <h1>firebase example</h1>
        <input type="file" accept="image/png" id="fupload" />
        <button onClick={upload}>change!</button>
        </>
    )
}
