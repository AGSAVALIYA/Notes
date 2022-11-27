import React, { useEffect, useState } from "react";
import {collection, doc , getDocs} from "firebase/firestore";
import db from "../../firebase";

const Notes = (props) => {
    const { subject, module, setNotes, notes, error, setError} = props;
    const [loading, setLoading] = useState(false);

    const fetchNotes = async (subject, module) => {
       //Subject -> Modules -> Notes
        try {
            console.log("fetching notes");
            setNotes([]);
            setError(null);
            //sample: Subjects/Physics/Modules/1.2/notes
            const sRef = collection(db, "Subjects", subject, "Modules", module, "SubModules");
            const snapshot = await getDocs(sRef);
           //make an array of notes from doc.data() and setNotes
            snapshot.forEach((doc) => {
                setNotes((prev) => [...prev, doc.data()]);
            }
            );
            console.log("done fetching notes");
            console.log(notes);

            
        }
        catch (e) {
            setError(e.message);
        }
    };
    useEffect(() => {
        fetchNotes(subject, module);
    }
    , [subject, module]);

    const NoteClick = (e) => {
        window.open(e);
    }


    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                notes.map((note) => (
                    <div className="note-item" key={note}>
                        
                        <span onClick={() => NoteClick(note.notes)}>{note.subModule}</span>
                        
                        
                     </div>
                )))}       

        </div>
    );
}

export default Notes;