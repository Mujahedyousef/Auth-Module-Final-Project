"use strict";
const express = require('express');
const router = express.Router();
const allModel = require('../models');
const bearer = require('../middleware/bearer')
const acl = require('../middleware/acl')


router.param('model', (req, res, next) => {
    if (allModel[req.params.model]) {
        req.model = allModel[req.params.model]
        next();
    } else {
        next('please input model..')
    }
})

router.get('/:model/:id',bearer,acl("read"), async (req, res) => {
    let id = req.params.id;
    let dataForId = await req.model.readRecord(id);
    res.status(200).json(dataForId);
})


router.get('/:model', bearer,acl("read"),async (req, res) => {
    let allData = await req.model.readRecord();
    res.status(200).json("Done success get data", allData);
})


router.post('/:model', bearer,acl("create"),async (req, res) => {
    let dataToAdd = req.body;
    let add = await req.model.createRecord(dataToAdd);
    res.status(201).json("Done success create data", add);
})


router.delete('/:model/:id', bearer,acl("delete"),async (req, res) => {
    let id = req.params.id;
    let deleteData = await req.model.deleteRecord(id);
    res.status(204).json("Deleted successfully", deleteData);
})


router.put('/:model/:id', bearer,acl("update"),async (req, res) => {
    let id = req.params.id;
    let dataToupdate = req.body;
    let updateData = await req.model.updateRecord(dataToupdate, id);
    res.status(201).json("updated successfully", updateData);
})

module.exports = router;