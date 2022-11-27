// import React, { useEffect, useState } from "react";





// const SubjectList = () => {

//  const [subjects, setSubjects] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [query, setQuery] = useState("");

//     const fetchSubjects = async () => {
//         try {

//             setError(null);
//             setLoading(true);
//             console.log("fetchSubjects");
//             const response = await db.collection("Subjects").get();
//             console.log(response, "aaa");
//             console.log("aaaaa");
//             const data = response.docs.map((doc) => ({
//                 ...doc.data(),
//                 id: doc.id,
//             }));

//             setSubjects(data);
//             setLoading(false);
//         } catch (e) {
//             setError(e);
//         }
//     };

//     useEffect(() => {
//         console.log("useEffect");
//         fetchSubjects();
//     }, []);



//     return (
//         <div>
//         <h1>Subject List</h1>
//         {subjects.map((subject) => (
//             <div key={subject.id}>
//                 <h3>{subject.id}</h3>
//                 <p>{subject.id}</p>
//                 </div>
//         ))}

//         </div>
//     );
// };

// export default SubjectList;