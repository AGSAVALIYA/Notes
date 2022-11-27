import React, {useEffect, useState} from "react";
import db from "../../firebase";
import {doc, setDoc} from "firebase/firestore";


const AddSubject = () => {

const [subject, setSubject] = useState("");
const [error, setError] = useState(null);

const handleSubmit = async (e) => {
    e.preventDefault();
    if (subject === "") {
        setError("Please enter a subject");
        return;
    }
    try {
        setError(null);
        await setDoc(doc(db, "Subjects", subject), {
            subject: subject,
        });
        setSubject("");
    } catch (e) {
        setError(e.message);
    }
};





 return(
    <div>
        <h1>Add Subject</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter Subject"
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
            />
            <button type="submit">Add</button>
        </form>
        {error ? <p>{error}</p> : null}

    </div>
 );

};


export default AddSubject;

