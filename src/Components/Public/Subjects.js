import React, { useEffect, useState } from "react";
import {collection, doc , getDocs} from "firebase/firestore";
import db from "../../firebase";

const Subjects = (props) => {
    const { setSubject, subjects, setSubjects , error, setError} = props;
    const [loading, setLoading] = useState(false);

    const fetchSubjects = async () => {
        try {
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

    const selectSubject = (e) => {
        setSubject(e);
        console.log(e);
    };

 useEffect(() => {
        fetchSubjects();
    }
    , []);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                subjects.map((subject) => (
                    <div className="subject-item" key={subject}>
                        <span  onClick={() => selectSubject(subject)}>{subject}</span>
                    </div>
                    
                ))
            )}


        </div>
    );
};

export default Subjects;