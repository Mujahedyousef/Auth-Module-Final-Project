"use strict";
const express = require('express');
const router = express.Router();
const allModel = require('../models');

router.param('model', (req, res, next) => {
    if (allModel[req.params.model]) {
        req.model = allModel[req.params.model]
        next();
    } else {
        next('please input model..')
    }
})


router.get('/:model/:id', async (req, res) => {
    let id = req.params.id;
    let dataForId = await req.model.readRecord(id);
    res.status(200).json(dataForId);
})


router.get('/:model', async (req, res) => {
    let allData = await req.model.readRecord();
    res.status(200).json("Done success get data", allData);
})


router.post('/:model', async (req, res) => {
    let dataToAdd = req.body;
    let add = await req.model.createRecord(dataToAdd);
    res.status(201).json("Done success create data", add);
})


router.delete('/:model/:id', async (req, res) => {
    let id = req.params.id;
    let deleteData = await req.model.deleteRecord(id);
    res.status(204).json("Deleted successfully", deleteData);
})


router.put('/:model/:id', async (req, res) => {
    let id = req.params.id;
    let dataToupdate = req.body;
    let updateData = await req.model.updateRecord(dataToupdate, id);
    res.status(201).json("updated successfully", updateData);
})

module.exports = router;