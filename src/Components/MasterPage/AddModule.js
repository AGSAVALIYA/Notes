import React, {useEffect, useState} from "react";
import {addDoc, collection, doc , getDocs, setDoc} from "firebase/firestore";
import db from "../../firebase";

const AddModule = () => {
    const [Subjects, setSubjects] = useState([]);
    const [subject, setSubject] = useState("");
    const [module, setModule] = useState("");
    const [error, setError] = useState(null);

    //fetch list of Subjects
    const fetchSubjects = async () => {
        try {
            setSubjects([]);
            setError(null);
            const sRef = collection(db, "Subjects");
            const snapshot = await getDocs(sRef);
            snapshot.forEach((doc) => {
                setSubjects((prev) => [...prev, doc.id]);
            }
            );
        } catch (e) {
            setError(e.message);
        }
    };



    useEffect(() => {
        fetchSubjects();
    }
    , []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (subject === "" || module === "") {
            setError("Please enter a subject and module");
            return;
        }
        try {
            setError(null);
            await setDoc(doc(db, "Subjects", subject, "Modules", module), {
                module: module,
            });
            setSubject("");
            
            setModule("");
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div>
            <h1>Add Module</h1>
            <form onSubmit={handleSubmit}>
                <select
                    onChange={(e) => setSubject(e.target.value)}
                    value={subject}
                >
                    <option value="">Select Subject</option>
                    {Subjects.map((subject) => (
                        <option key={subject} value={subject}>
                            {subject}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Enter Module"
                    onChange={(e) => setModule(e.target.value)}
                    value={module}
                />
                <button type="submit">Add</button>
            </form>
            {error ? <p>{error}</p> : null}
        </div>
    );
}

export default AddModule;
