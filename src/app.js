const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(process.cwd(), 'dist')));
console.log(process.env.PORT || 5000);
app.listen(process.env.PORT || 5000);
