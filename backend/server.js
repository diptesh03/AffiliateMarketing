//import env file
require('dotenv').config();

//import npm packages
const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('swagger-jsdoc');
const compression = require('compression');

// import project files
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')

const app = express();


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API for CNP1728",
            version: "1.0.0",
        },
        servers: [
            {
                url:"http://localhost:3001"
            }
        ]
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerDocs(options)

app.use(express.json());

app.use(cors());

// Compress all HTTP responses
app.use(compression());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use('/user', userRoutes);
app.use('/product', productRoutes);

app.listen(process.env.PORT, () => {
    console.log(`app is runing on port ${process.env.PORT}`)
});
