import React from "react";
import AddModule from "./Components/MasterPage/AddModule";
import AddNotes from "./Components/MasterPage/AddNotes";
import AddSubject from "./Components/MasterPage/AddSubject";
import "./Components/MasterPage/MasterPage.css";

const MasterPage = () => {
    return (
        <div className="master-page">
            <h1>Master Page</h1>
            <div className="add-card">
                <AddSubject />
            </div>
            <div className="add-card">
                <AddModule />
            </div>
            <div className="add-card">
                <AddNotes />
            </div>
        </div>
    );
};

export default MasterPage;