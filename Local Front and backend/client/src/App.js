//I import App.css so that all the elements dispalyed are styled and in the desired location.
import './App.css';
//I import Axios so that i am able to access the server localhpst and pass and recieve information from it.
import Axios from "axios";
//I import react useState to set and be able to change component quickly and easily.
//I import react useEffect so that a piece of code is run as soon as the program is run.
import React, {useState, useEffect} from "react";

function App() {
  //Here a bunch of component are set using use state.
  //Stores the patients first name.
  const [firstName, setFirstName] = useState("");
  //Stores the patients surname.
  const [surname, setSurname] = useState("");
  //Stores the patients allergie status.
  const [allergies, setAllergies] = useState("");
  //Stores the patients treatment.
  const [treatment, setTreatment] = useState("");
  //Stores the patients perscriptions.
  const [perscriptions, setPerscriptions] = useState("");
  //Stores the highest id(last patient id in the table).
  const [highestID, setHighestID] = useState(0);
  //Stores the raw imported patient data from the server.
  const [patientList, setPatientList] = useState([]);
  //Stores the treatments search for the table.
  const [treatmentSearch, setTreatmentSearch] = useState("");
  //Stores the temperory treatment search while the user is entering it into the field.
  const [treatmentSearchTemp, setTreatmentSearchTemp] = useState("");
  //Stores the value of the window which decides what will be shown.
  const [dataWindow, setDataWindow] = useState(false);
  //Creates a constant and assigns it an arrow funtion that will send data to the server to add a new patient to the database.
  const submitPatient = () => {
    //Calls the LastID constant/arrow function that will find and update the last id of the current table.
    LastID();
    //Sends data to the server local website at http://localhost:3001/api/add with the required information. 
    Axios.post("http://localhost:3001/api/add", {
      //Adds 1 to the highest current ID so that when a new patient is created its ID is 1 higher than the current one eg 12+1=13.
      ID: highestID+1,
      FirstName: firstName, 
      Surname: surname, 
      Allergies: allergies,
      Treatment: treatment,
      Perscriptions: perscriptions
      //After the data is sent it will the execute the .then() and afterit will call the change window componen/arrow function.
      //The arrow function in the .then() is so that if an error ocures you can be able to get it and see
    }).then(() => {})
    changeWindow();
  }
  //UseEffect is used with an arrow function to get information from the local server website and sets it to the setPatientList component when the program starts up.
  useEffect(()=>{
    //Gets information from http://localhost:3001/api/getpatients and assings it.
    Axios.get("http://localhost:3001/api/getpatients").then((response)=>{
      setPatientList(response.data);
    })
  },[])
  //Does the exact same thing as the useEffect above but since this is a component it can be called when needed.
  const refreshPatients = ()=>{
    Axios.get("http://localhost:3001/api/getpatients").then((response)=>{
      setPatientList(response.data);
    })
    //LastID is called to make sure that it is up to date.
    LastID();
  }
  //The Search constant/arrow function sets setTreatmentSearch to the current value of treatmentSearchTemp.
  const search = () => {
    setTreatmentSearch(treatmentSearchTemp);
  }
  //The changeWindow constant/arrow function changes the window state depending on what it currently is.
  const changeWindow = () =>{
    (dataWindow === false)?
      setDataWindow(true):
      setDataWindow(false)
  }
  //The LastID constant/arrow function maps through the entire list of patients and checks if there is a higher ID than currently stored and if so then stores it.
  const LastID = () => {
    patientList.map((val)=>{
      if(highestID<val.ID){
      setHighestID(val.ID)
      }
      return(null)
    })
  };
  //This is what will be rendered on the local website.
  return (
    //This sets the base container in which all sub containers will be set in
    <div className='container' >
        {/*This sets the div to the center-mid container which will just center its contents*/}
        <div className='center-mid'>
          {/*The label creates an element which will be used to display text.
          The hidden element will be used to show and hide the label at will*/}
          <label hidden = {!dataWindow}>First Name</label>
          <label hidden = {!dataWindow}>Surname</label>
          <label hidden = {!dataWindow}>Allergies</label>
          <label hidden = {!dataWindow}>Treatment</label>
          <label hidden = {!dataWindow}>Perscriptions</label>
          </div>
          {/*This sets the div to the center-mid container which will just center its contents*/}
          <div className='center-mid'>
            {/*The input creates an element which will be used for text to be entered into it
            It also has a hidden element which allows it to be hidden at any time
            It also has an onChange element which allows the program to run the arrow function when ever there is a change in the input
            It also has an arrow function which has a value inside of it and can be called to get the data needed
            The arrow function sets the coresponding constant with the inputed data.*/}
            <input hidden = {!dataWindow} onChange={(e)=>{
              setFirstName(e.target.value)}}/>
            <input hidden = {!dataWindow} onChange={(e)=>{
              setSurname(e.target.value)}}/>
            <input hidden = {!dataWindow} onChange={(e)=>{
              setAllergies(e.target.value)}}/>
            <input hidden = {!dataWindow} onChange={(e)=>{
              setTreatment(e.target.value)}}/>
            <input hidden = {!dataWindow} onChange={(e)=>{
              setPerscriptions(e.target.value)}}/>
          </div>
          {/*This sets the div to the center-mid container which will just center its contents*/}
          <div className='center-mid'>
            {/*It has a hidden element which allows it to be hidden at any time
            Here the buttons will call different constants(constant arrow functions) depending on which button is clicked*/}
            <button hidden = {!dataWindow} onClick={submitPatient}>Submit</button>
            <button hidden = {!dataWindow} onClick={changeWindow}>Cancel</button>
          </div>
        {/*This sets the div to apear in the center of its parent container as well as a limited hight and which direction its contents should be loaded in*/}
        <div className="containerTop" >
          {/*It has a hidden element which allows it to be hidden at any time
          Here the buttons will call different constants(constant arrow functions) depending on which button is clicked*/}
          <button hidden = {dataWindow} onClick={changeWindow}>Add Patient</button>
          <button hidden = {dataWindow} onClick={refreshPatients}>Refresh</button>
        </div>
        {/*This Sets the div to the center-mid container which will just center its contents
        It also has a hidden element which allows it to be hidden at any time
        Here the button will call different constants(constant arrow functions) or assign a value to a constant*/}
        <div className='center-mid'><button hidden = {dataWindow} onClick={search}>Search Treatment</button></div>
        <div className="center-mid"><input hidden = {dataWindow} onChange={(e)=>{setTreatmentSearchTemp(e.target.value)}} placeholder="Capital Sensative"></input ></div>
        {/*This sets the div to be containerBottom which will encompass a majority of the displayed content and  render it in its desired positions*/}
        <div className="containerBottom">
          {/*This sets the div to apear in the center of its parent container as well as a limited hight and which direction its contents should be loaded in*/}
          <div className="containerTop">
            {/*It has a hidden element which allows it to be hidden at any time
            The text between the<buttton></button> will be displayed on the button when it is rendered*/}
            <button hidden = {dataWindow}>ID</button>
            <button hidden = {dataWindow}>Name</button>
            <button hidden = {dataWindow}>Surname</button>
            <button hidden = {dataWindow}>Allergies</button>
            <button hidden = {dataWindow}>Treatment</button>
            <button hidden = {dataWindow}>Perscriptions</button>
          </div>
          <div>
            {patientList.filter(item => item.Treatment.includes(treatmentSearch)).map((val)=>{
              return (
                <div className='gridContainer'>
                  {/*The objects in the array are filtered by .filter which sorts the objects by a selected variable in this case the treatment entered by the user
                  After the objects are filtered .map is used to display the properties of the object
                  The Objects displayed inbetweern the divs and are called using a the reference val.ID which loads the ID from the current mapped objects
                  The style element is used to update the look of the text that is being renderd for
                  Inside the style element there is a Conditional (ternary) operator which acts like an if statement so if the it is true statment 1 will execute else statement 2 will execute
                  Here it is first comparing if the patient has alergies and if they do they change the colour to red and font to bold or else it will just skip it
                  Later it checks to see if the patients has any perscriptions if they do it chages the colour to green and font to bold or else it will just skip*/}

                  <div hidden = {dataWindow} className='grid-item' style={(val.Allergies === "T")?({ color: 'red', fontWeight: "bold"}):(null)}>{val.ID}</div>
                  <div hidden = {dataWindow} className='grid-item' style={(val.Allergies === "T")?({ color: 'red', fontWeight: "bold"}):(null)}>{val.FirstName}</div>
                  <div hidden = {dataWindow} className='grid-item' style={(val.Allergies === "T")?({ color: 'red', fontWeight: "bold"}):(null)}>{val.Surname}</div>
                  <div hidden = {dataWindow} className='grid-item' style={(val.Allergies === "T")?({ color: 'red', fontWeight: "bold"}):(null)}>{val.Allergies}</div>
                  <div hidden = {dataWindow} className='grid-item' style={(val.Perscriptions !== "")?({ color: 'green', fontWeight: "bold"}):(null)}>{val.Treatment}</div> 
                  <div hidden = {dataWindow} className='grid-item' style={(val.Perscriptions !== "")?({ color: 'green', fontWeight: "bold"}):(null)}>{val.Perscriptions}</div>
                </div>
              )
            })}
          </div>
        </div>
    </div>
  );
}
//Exports the App function.
export default App;