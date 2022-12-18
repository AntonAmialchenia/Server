import express from 'express';

const app = express();
const port = 3000;

const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204:204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
}

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

const db = {
  courses: [
    { id: 1, title: 'front-end' },
    { id: 2, title: 'back-end' },
    { id: 3, title: 'automation qa' },
    { id: 4, title: 'devops' },
  ],
};

app.get('/corses', (req, res) => {
  let foundCourses = db.courses;
  if (req.query.title) {
    foundCourses = foundCourses.filter(
      (c) => c.title.indexOf(req.query.title as string) > -1
    );
  }

  res.json(foundCourses);
});

app.post('/corses', (req, res) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  const createdCourse = {
    id: +new Date(),
    title: req.body.title,
  };
  db.courses.push(createdCourse);
  res.status(HTTP_STATUSES.CREATED_201).json(createdCourse);
});
app.get('/corses/:id', (req, res) => {
  const foundCorse = db.courses.find((c) => c.id === +req.params.id);

  if (!foundCorse) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  res.json(foundCorse);
});

app.delete('/corses/:id', (req, res) => {
  db.courses = db.courses.filter(c => c.id !== +req.params.id);

  
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.put('/corses/:id', (req, res) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    return;
  }
  const foundCorse = db.courses.find(c => c.id === +req.params.id);

  if (!foundCorse) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  foundCorse.title = req.body.title;

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.get('/samurai', (req, res) => {
  res.send('Hello Anton!');
});

app.post('/samurai', (req, res) => {
  res.send('we have created samurai');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
