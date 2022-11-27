import React, {useState, useEffect} from "react";
import {addDoc, collection, doc , getDocs, setDoc} from "firebase/firestore";
import db from "../../firebase";

const AddNotes = () => {
    const [Subjects, setSubjects] = useState([]);
    const [subject, setSubject] = useState("");
    const [Modules, setModules] = useState("");
    const [module, setModule] = useState("");
    const [error, setError] = useState(null);
    const [subModule, setSubModule] = useState("");
    const [notes, setNotes] = useState("");

    //fetch list of Subjects
    const fetchSubjects = async () => {
        try {
            setError(null);
            const sRef = collection(db, "Subjects");
            const snapshot = await getDocs(sRef);
            snapshot.forEach((doc) => {
                setSubjects((prev) => [...prev, doc.id]);
            }
            );
        }
        catch (e) {
            setError(e.message);
        }
    };

   
    const fetchModules = async (subject) => {
       //fetch module from SUBJECT -> MODULES
        try {
            setError(null);
            const sRef = collection(db, "Subjects", subject, "Modules");
            const snapshot = await getDocs(sRef);
            snapshot.forEach((doc) => {
                setModules((prev) => [...prev, doc.id]);
            }
            );
        }
        catch (e) {
            setError(e.message);
        }
    };






    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
        setModules([]);
        fetchModules(e.target.value);
    };

    useEffect(() => {
        fetchSubjects();
    }
    , []);

    const handleSubmit = async (e) => {
        //add sub module id and notes link to module collection
        e.preventDefault();
        if (subject === "" || module === "" || subModule === "" || notes === "") {
            setError("Please enter a subject, module, submodule and notes link");
            return;
        }
        try {
            setError(null);
            await setDoc(doc(db, "Subjects", subject, "Modules", module, "SubModules", subModule), {
                subModule: subModule,
                notes: notes
            });
            setSubject("");
            setModule("");
            setSubModule("");
            setNotes("");
        } catch (e) {
            setError(e.message);
        }
    }
        

    return (
        <div className="add-notes">
            <h2>Add Notes</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <select value={subject} onChange={handleSubjectChange}>
                    <option value="">Select Subject</option>
                    {Subjects.map((subject) => (
                        <option key={subject} value={subject}>{subject}</option>
                    ))}
                </select>
                <select value={module} onChange={(e) => setModule(e.target.value)}>
                    <option value="">Select Module</option>
                    {Modules && Modules.map((module) => (
                        <option key={module} value={module}>{module}</option>
                    ))}
                </select>
                <input placeholder="Enter Sub Module" type="text" value={subModule} onChange={(e) => setSubModule(e.target.value)} />
                <input type="text" placeholder="Enter Link" value={notes} onChange={(e) => setNotes(e.target.value)} />
                <button type="submit">Add Notes</button>
            </form>
        </div>
    );
};

export default AddNotes;
