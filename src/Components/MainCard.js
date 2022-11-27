import React, { useState } from "react";
import './MainCard.css';
import Modules from "./Public/Modules";
import Notes from "./Public/Notes";
import Subjects from "./Public/Subjects";


const MainCard = () => {
    const [subjects, setSubjects] = useState([]);
    const [subject, setSubject] = useState("");
    const [modules, setModules] = useState([]);
    const [module, setModule] = useState("");
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    return (
        <div className="main-card">
            <div className="main-box">
                <h3>Subject</h3>
                <Subjects subjects={subjects} setSubjects={setSubjects} setSubject={setSubject} loading={loading} setLoading={setLoading} error={error} setError={setError} />
                <div className="module-box">
                    <h4>Module</h4>
                    {!subject ? (
                        <div>Select a subject</div>
                    ) : (<Modules subject={subject} modules={modules} setModules={setModules} setModule={setModule} error={error} setError={setError} />)}
                    <div className="sub-module-box">
                        <h5>Notes</h5>
                        {!module ? (
                            <div>Select a module</div>
                        ) : (<Notes subject={subject} module={module} setNotes={setNotes} notes={notes} error={error} setError={setError} />)}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainCard;
