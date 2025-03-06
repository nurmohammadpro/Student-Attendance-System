import { useEffect, useState } from "react";
import Button from "./Button";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const Dashboard = () => {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableStudent, setEditableStudent] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "students"), (snapshot) => {
      const studentList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentList);
    });
    return () => unsubscribe();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (studentName.trim() === "") {
      return alert("Please provide a valid name");
    }

    editMode ? updateHandler() : createHandler();
  };

  const changeNameHandler = (e) => {
    setStudentName(e.target.value);
  };

  const createHandler = async () => {
    try {
      await addDoc(collection(db, "students"), {
        name: studentName,
        isPresent: null,
      });
      setStudentName("");
    } catch (error) {
      console.error("Error adding doc: ", error);
    }
  };

  const editHandler = (student) => {
    setEditMode(true);
    setEditableStudent(student);
    setStudentName(student.name);
  };

  const updateHandler = async () => {
    try {
      await updateDoc(doc(db, "students", editableStudent.id), {
        name: studentName,
      });
      setEditMode(false);
      setEditableStudent(null);
      setStudentName("");
    } catch (error) {
      console.log("Error updating doc: ", error);
    }
  };

  const removeHandler = async (studentId) => {
    try {
      await deleteDoc(doc(db, "students", studentId));
    } catch (error) {
      console.log("Error deleting doc: ", error);
    }
  };

  const makePresentHandler = async (student) => {
    if (student.isPresent === true || student.isPresent === false) {
      alert(
        `This student is already in ${
          student.isPresent ? "Present List" : "Absent List"
        }`
      );
      return;
    }
    try {
      await updateDoc(doc(db, "students", student.id), {
        isPresent: true,
      });
    } catch (error) {
      console.log("Error updating doc: ", error);
    }
  };

  const makeAbsentHandler = async (student) => {
    if (student.isPresent === true || student.isPresent === false) {
      alert(
        `This student is already in ${
          student.isPresent ? "Present List" : "Absent List"
        }`
      );
      return;
    }
    try {
      await updateDoc(doc(db, "students", student.id), {
        isPresent: false,
      });
    } catch (error) {
      console.log("Error updating doc: ", error);
    }
  };

  const toggleList = async (student) => {
    try {
      await updateDoc(doc(db, "students", student.id), {
        isPresent: !student.isPresent,
      });
    } catch (error) {
      console.log("Error updaing  doc: ", error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-start w-full max-w-[1280px] mx-auto h-screen
             "
    >
      <div className="flex flex-col w-full gap-2 justify-between mt-8">
        <form className="flex flex-grow py-4" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter Student Name"
            className="justify-center items-center flex-grow p-2 rounded-tl-md rounded-bl-md border ring-gray-100 focus:ring-1 focus:ring-gray-400 focus:outline-none"
            value={studentName}
            onChange={changeNameHandler}
          />
          <button
            className="bg-gray-700 hover:bg-gray-950 transition-all ease-in-out duration-200 text-white px-4 py-2 rounded-br-md rounded-tr-md cursor-pointer 
                  "
          >
            {editMode ? "Update Student" : "Add Student"}
          </button>
        </form>
        <div className="studentSection flex flex-col gap-2">
          <div className="allStudents rounded-md border border-gray-400 p-4">
            <h2 className="text-xl font-bold">All Students</h2>
            <ul className="flex flex-col gap-2">
              {students.map((student) => (
                <li key={student.id} className="flex gap-2 items-center">
                  <span className="flex-grow text-md">{student.name}</span>
                  <Button
                    title="Edit Student"
                    onClick={() => editHandler(student)}
                  />
                  <Button
                    title="Delete Student"
                    onClick={() => removeHandler(student.id)}
                  />
                  <Button
                    title="Make Present"
                    onClick={() => makePresentHandler(student)}
                  />
                  <Button
                    title="Make Absent"
                    onClick={() => makeAbsentHandler(student)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="presentStudents rounded-md border border-gray-400 p-4">
            <h2 className="text-xl font-bold">Present Students</h2>
            <ul className="flex flex-col gap-2">
              {students
                .filter((item) => item.isPresent === true)
                .map((student) => (
                  <li key={student.id} className="flex items-center">
                    <span className="flex-grow text-md">{student.name}</span>{" "}
                    <Button
                      title="Accidentally Added"
                      onClick={() => toggleList(student)}
                    />
                  </li>
                ))}
            </ul>
          </div>
          <div className="absentStudents rounded-md border border-gray-400 p-4">
            <h2 className="text-xl font-bold">Absent Students</h2>
            <ul className="flex flex-col gap-2">
              {students
                .filter((item) => item.isPresent === false)
                .map((student) => (
                  <li key={student.id} className="flex items-center">
                    <span className="flex-grow text-md">{student.name}</span>
                    <Button
                      title="Accidentally Added"
                      onClick={() => toggleList(student)}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
