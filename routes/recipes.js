const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

//? SHOW ALL RECIPES
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

//? SHOW SINGLE RECIPE
router.get('/:id', getRecipe , (req, res) => {
    res.json(res.recipe);
});

//? CREATE RECIPE
router.post('/', async (req, res) => {
    const recipe = new Recipe({ 
        name: req.body.name,
        ingridients: req.body.ingridients,
    });

    try {
        const newRecipe = await recipe.save();
        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(400).json({message: err.message});
    }

});

//? UPDATE RECIPE
router.patch('/:id', (req, res) => {
    
});

//? DELETE RECIPE
router.get('/:id', getRecipe, async (req, res) => {
    try {
        await req.recipe.remove();
        res.json({ message: 'Deleted recipe' });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});


//? MIDDLEWEAR FUNCTION
async function getRecipe(req, res, next) {

    let recipe;

    try {
        recipe = await Recipe.findById(req.params.id)
        if (recipe == null) {
            return res.status(404).json({ message: 'Recipe not found' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.recipe = recipe;
    next();
}


module.exports = router;