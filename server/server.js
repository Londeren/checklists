import express from 'express';

const app = express();

app.get('/api', function (req, res) {
  res.send('API is running');
});

app.listen(3001, function(){
  console.log('Express server listening on port 3001');
});