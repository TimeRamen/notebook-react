const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send(noteArray);
});

app.post('/api/save', (req, res) => {
  console.log(req.body);
  newNote(req.body);
  res.send(noteArray);
});

app.post('/api/delete', (req, res) => {
  deleteNote(false);
  res.send(noteArray);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

//=========


function deleteNote(file){
  if(!file){
    console.log('HELP THIS SHIT DONT WORK kid.');
    return;
  }
  fs.unlinkSync(file);
  console.log(file+' deleted!'); 
}

function newNote(obj){
    var stringToWrite = convertObjToString(obj);
    var fileName = 'notes/'+getFileName(obj); 
    if (fs.existsSync(fileName)) {
      console.log(fileName + ' already exists! Making copy.\n');
      fileName = 'notes/'+getNewFileName(obj); 
    }
    fs.writeFile(fileName,stringToWrite, function (err) {
        if (err) throw err;
        console.log('Saved!');
      }); 
  
}

function updateNote(obj,file){
  var stringToWrite = convertObjToString(obj);
  fs.writeFile(file,stringToWrite, function (err) {
    if (err) throw err;
    console.log('Saved!');
  }); 
}

//======Converting object to file

function getFileName(obj){
  if(obj.markdown){
    return obj.title + '.md';
  }else{
    return obj.title + '.txt';
  }
}

function getNewFileName(obj){
  if(obj.markdown){
    return obj.title + ' - Copy' + '.md';
  }else{
    return obj.title + ' - Copy' +'.txt';
  }
}

function convertObjToString(note){
  //this note is supposed to be recieved from the react app itself, so it wont have the date.
  //instead, we will be updating the date to the date when it was updated, aka today
  //and to do this we use the convertNoteObj function
  var temp = convertNoteObj(note);
  var str = '';
  str = "Title: " + temp.title +
  "\n"+ "Date: " + moment(temp.Date).format('DD/MM/YYYY') +
  "\n"+ "Categories: [" + printCat(temp.catList) + "]" + "\n"+"\n"+temp.contents;

  return str;
}

function convertNoteObj(noteObj){
  var noteObject = {
    title:noteObj.title,
    date:new Date(),
    contents:noteObj.contents,
    catList:noteObj.catList,
    markdown: noteObj.markdown
  }
  return noteObject;
}

function printCat(arr){
  //prints string from array that looks like arr, arr,arr,arr etc. use join.
  return arr.join(", ");
}
//=========Reading file system and files

const noteFolder = 'notes/';
const noteArray =  [];
fs.readdirSync(noteFolder).forEach(file => {
  noteArray.push(returnNoteObjectFromFile(noteFolder+file));
});


function returnNoteObjectFromFile(file){
    var data = fs.readFileSync(file, 'utf8');
    var markdown = false;
    if(path.extname(file).toLowerCase()==='.md'){
      markdown = true;
    }else if(path.extname(file).toLowerCase()!=='.txt'){
      return; //invalid file if not md or txt.
    }
    var lines = data.split(/\r?\n/);
    var returnNote =  returnNoteFromArr(lines,markdown);
    return returnNote;
}



function returnCatList(str){
  var subString = str.substring(
    str.lastIndexOf("[") + 1, 
    str.lastIndexOf("]")
  );
  return subString.split(',');
}

function returnNoteFromArr(arr, markdown){
  var noteTitle = returnRightSide(arr[0]);
  var str = returnRightSide(arr[1]);
  var noteDate = moment(str, 'DD/MM/YYYY').toDate();
  var noteCatList = returnCatList(returnRightSide(arr[2]));
  var copyArr = arr;
  for(var i=0;i<4;i++){
    copyArr.shift();
  }
  var noteContents = copyArr.join();
  var noteObject = {
    title:noteTitle,
    date:noteDate,
    contents:noteContents,
    catList:noteCatList,
    markdown: markdown
  }
  return noteObject;
}

function returnRightSide(str){
  var res = str.split(": ");
  res.shift();
  res = res.join(":");
  return res;
}