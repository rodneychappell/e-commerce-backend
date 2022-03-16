const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const data = await Tag.findAll({
      include: { model: Product },
    });

    res.status(200).json(data);
  }
  catch (err) {

    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try {
    const data = await Tag.findByPk(req.params.id, { include: [{ model: Product, through: ProductTag }] });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }


});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const data = await Tag.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    let tagUpdate = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!tagUpdate) {
      res.status(404).json({ message: 'No tag with that ID' });
      return;
    }

    res.status(200).json(tagUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const destroyTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!destroyTag) {
      res.status(404).json({ message: 'No tag with this ID' });
      return;
    }

    res.status(200).json(destroyTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
