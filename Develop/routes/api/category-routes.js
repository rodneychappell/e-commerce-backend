const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const data = await Category.findAll({
      include: { model: Product },
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  
    try {
      const data = await Category.findByPk(req.params.id, {
        include: { model: Product },
      });

      if (!data) {
        res.status(404).json({ message: 'No category found with specified ID' });
        return;
      }

      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
  // create a new category
 
  try {
    const categoryNew = await Category.create(req.body);
    res.status(200).json(categoryNew);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  
    try {
      let categoryUpdate = await Category.update(
        { category_name: req.body.category_name },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      if (!categoryUpdate) {
        res.status(404).json({ message: 'No category found with specified ID' });
        return;
      }

      res.status(200).json(categoryUpdate);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  
    try {
      let destroyCategory = await Category.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!destroyCategory) {
        res.status(404).json({ message: 'No category found with specified ID' });
        return;
      }

      res.status(200).json(destroyCategory);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;