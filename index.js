let addbutton = document.getElementById("add-btn");
let addTitle = document.getElementById("note-title");
let description = document.getElementById("note-text");
let dates=new Date();
// let newnote=document.querySelector(".notes");
addbutton.addEventListener("click",(e)=>{
    if (addTitle.value == "" || description.value == "") {
        return alert("please add note title and description ")
    }
    let notes = localStorage.getItem("notes");
    if(notes==null){
      notesObj=[];
    }
    else{
      notesObj=JSON.parse(notes);
    }
    let myObj={
      title:addTitle.value,
      text: description.value,
      date:dates.getDate()+'/'+(dates.getMonth()+1)+'/'+dates.getFullYear()+ " at "+dates.getHours()+':'+dates.getMinutes()
    }
    notesObj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTitle.value="";
    description.value="";

  displayNotes();
})
//display Notes on the page
function displayNotes(){
  let notes= localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }
  let html="";
  notesObj.forEach(function(element,index){
    html += `
    <div class="card bg-black mb-3">
      <div class="card-body text-center">
        <h5 class="text-light">${element.title}</h5>
        <p class="text-light">${element.text}</p>
       <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
        <button  id="${index}" onclick="editNote(this.id)"class="btn btn-success">Edit Note</button>
        <div class="text-light p-4">${element.date}</div>
        </div>
        </div>
        `;
  });
  let noteElement=document.getElementById("notes");
  if(notesObj.length!=0){
    noteElement.innerHTML=html;
  }
  else{
    noteElement.innerHTML="<h1>Nothing to show ! Use 'Add Note' Section for creating your notes.<h1>";
  }
}
//function to delete notes
function deleteNote(index){
  let confirmdel=confirm("Are you sure deleting this note!!");
  if (confirmdel == true){
  let notes=localStorage.getItem("notes");
  if(notes== null){
    notesObj=[];
  }
  else{
    notesObj=JSON.parse(notes);
  }
   notesObj.splice(index,1);
   localStorage.setItem("notes",JSON.stringify(notesObj));
    displayNotes();
}
}
//function to edit notes
function editNote(index) {
  let notes = localStorage.getItem("notes");
  if (addTitle.value !== "" || description.value!==""){
    return alert("Please clear the form before editing a note")
  }
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }
  //console.log(notesObj)
  notesObj.findIndex((element,index)=>{
    addTitle.value=element.title;
    description.value=element.text;
  })
  notesObj.splice(index,1);
  localStorage.setItem("notes",JSON.stringify(notesObj));
  displayNotes();
}
displayNotes();
    