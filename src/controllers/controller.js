// const fs = require("fs");
// const mongoose = require("mongoose");
// const { GridFsStorage } = require("multer-gridfs-storage");
// const multer = require("multer");
// import Product from '../models/jmsproduct';

// // Initialize GridFS storage engine
// const storage = new GridFsStorage({
//     options: { useNewUrlParser: true, useUnifiedTopology: true },
//     file: (req, file) => ({
//         filename: file.originalname,
//         bucketName: "uploads" // Name of the MongoDB collection
//     })
// });

// const upload = multer({ storage }).single("file");

// const saveProduct = async (req, res, productImage) => {
//     const { productName, productCode, productPrice } = req.body;
//     try {
//         const newProduct = new Product({
//             productName,
//             productImage,
//             productCode,
//             productPrice
//         });
//         await newProduct.save();
//         res.status(200).send({
//             message: 'Uploaded the file and created the product successfully: ' + req.file.originalname,
//         });
//     } catch (err) {
//         res.status(500).send({ message: 'Error saving product: ' + err.message });
//     }
// };

// const uploadAndSave = (req, res) => {
//     upload(req, res, async function (err) {
//         if (err instanceof multer.MulterError) {
//             return res.status(500).send({
//                 message: "File size cannot be larger than 2MB!",
//             });
//         } else if (err) {
//             const fileName = req.file ? req.file.originalname : 'Unknown File';
//             return res.status(500).send({
//                 message: `Could not upload the file: ${fileName}. ${err}`,
//             });
//         }
//         try {
//             if (!req.file) {
//                 return res.status(400).send({ message: "Please upload a file!" });
//             }
//             await saveProduct(req, res, req.file.filename);
//         } catch (error) {
//             console.log(error);
//             res.status(500).send({ message: 'Error saving product: ' + error.message });
//         }
//     });
// };




// const getListFiles = (req, res) => {
//     const directoryPath = "./uploads/";

//     fs.readdir(directoryPath, function (err, files) {
//         if (err) {
//             res.status(500).send({
//                 message: "Unable to scan files!",
//             });
//         }

//         let fileInfos = [];

//         files.forEach((file) => {
//             fileInfos.push({
//                 name: file,
//             });
//         });

//         res.status(200).send(fileInfos);
//     });
// };


// const remove = (req, res) => {
//     const fileName = req.params.name;
//     const directoryPath = "./uploads/";
//     const filePath = directoryPath + fileName;
//     fs.access(filePath, fs.constants.F_OK, (err) => {
//         if (err) {
//             return res.status(404).send({
//                 message: "File not found.",
//             });
//         }
//         fs.unlink(filePath, (err) => {
//             if (err) {
//                 console.error("Error deleting file:", err); 
//                 return res.status(500).send({
//                     message: "Could not delete the file. " + err,
//                 });
//             }
//             res.status(200).send({
//                 message: "File is deleted.",
//             });
//         });
//     });
// };


// module.exports = {
//     upload,
//     getListFiles,
//     remove,
//     uploadAndSave
// };
