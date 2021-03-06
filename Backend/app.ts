import express from "express";
import {listEntries, addEntry, deleteEntry, editEntry, listEntriesForSpeficDate, selectEntryById} from "./diaryService";
import {listCategories, listCategoriesForSpeficDate} from "./categoryService";
import cors from "cors";
import path from"path";

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use((req, res, next)=>{
  console.log(req.url);
  next();
})

app.use(express.static(path.join(__dirname, "public")));


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/list', async(req, res) =>{
  res.json(await listEntries())
})

app.post('/add-entry', async(req, res) => {
  const entry = req.body
  const passBack = await addEntry(entry)
  res.json(passBack)
})

app.delete('/delete-entry', async(req, res) => {
  const id = req.body.id
  const comingBack = await deleteEntry(id)
  res.json(comingBack)
})

app.put('/edit-entry', async(req, res) => {
  const entry = req.body
  const passBack = await editEntry(entry)
  res.json(passBack)
})

app.get('/list-categories', async(req, res) => {
  res.json(await listCategories())
})

app.get('/list-entries-by-date', async(req, res) => {
  const dateComingInStart = req.query.dateComingInStart as string
  const dateComingInEnd = req.query.dateComingInEnd as string
  const incomingUserId = req.query.incomingUserId as string
  const passBack = await listEntriesForSpeficDate(dateComingInStart, dateComingInEnd, incomingUserId)
  res.json(passBack)
})

app.get('/list-categories-by-date', async(req, res) => {
  const dateComingInStart = req.query.dateComingInStart as string
  const dateComingInEnd = req.query.dateComingInEnd as string
  const incomingUserId = req.query.incomingUserId as string
  const passBack = await listCategoriesForSpeficDate(dateComingInStart, dateComingInEnd, incomingUserId)
  res.json(passBack)
})

app.get('/list-entry-by-id', async(req, res) => {
  const id = parseInt(req.query.id as string, 10)
  const incomingUserId = req.query.incomingUserId as string
  const passBack = await selectEntryById(id, incomingUserId)
  res.json(passBack)
})


app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

export default app;
