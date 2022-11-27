import React, { useEffect, useState } from "react";
import {collection, doc , getDocs} from "firebase/firestore";
import db from "../../firebase";


const Modules = (props) => {
    const { subject, modules, setModules , setModule, error, setError} = props;
    const [loading, setLoading] = useState(false);

    const fetchModules = async (subject) => {
        //fetch module from SUBJECT -> MODULES
         try {
            setModules([]);
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

    const selectModule = (e) => {
        setModule(e);
    }
 
    useEffect(() => {
        fetchModules(subject);
    }
    , [subject]);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                modules.map((module) => (
                    <div className="module-item" key={module}>
                        <span  onClick={() => selectModule(module)}>{module}</span>
                    </div>
            )))}

        </div>
    );
};

export default Modules;