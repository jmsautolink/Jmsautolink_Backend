const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());


app.use(express.json());


mongoose.connect('mongodb+srv://jmsautolink:llSCsHr1AltsmmZk@cluster0.box3fbw.mongodb.net/mydatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null); 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 500 * 1024 * 1024 } 
});


const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productImage: {
        type: String, 
        required: true
    },
    productCode: {
        type: String,
        required: true,
        unique: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productDescriptions: {
        type: String,
        required: true
    }
});


const Product = mongoose.model('Product', productSchema);


app.post('/products', upload.single('productImage'), async (req, res) => {
    try {
        const product = new Product({
            productName: req.body.productName,
            productImage: req.file.path, 
            productCode: req.body.productCode,
            productPrice: req.body.productPrice,
            productDescriptions: req.body.productDescriptions
        });
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        console.error(error.message);
        res.status(400).send({ message: 'Bad request' });
    }
});


app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
});


app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.send(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
