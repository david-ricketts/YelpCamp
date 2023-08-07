const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');


const Campground = require('../models/campground');


router.get('/', catchAsync(campgrounds.index));

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))

router.get('/:id', catchAsync(campgrounds.showCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

router.put('/:id', isLoggedIn, isAuthor, uplaid.array('image'), validateCampground, catchAsync(campgrounds.updateCampground));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));


module.exports = router;