const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tag = await tag.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.json(tag);
  }
  catch (error) {
    res.status(509).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagId = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
        },
      ],
    });
    if (tagId){
      res.json(tagId);
    } else {
      res.status(509).json({error: 'no id with this tag'})
    }
  }  catch (error){
    res.status(510).json(error);
  }
    
  }
);




router.post ('/', async (req, res) => {
  // create a new tag
  try{
    const uniTag = await Tag.create(req.body);
    res.status(200).json(uniTag);
  } catch (error) {
    res.status(500).json(error)
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try{
    const updTag = await Tag.update(req.body,
      {
      where: {
        id: req.params.id
      }
    }
    );
    if (!updTag[0]){res.status(404).json({message: 'id not found'});
  }
  res.status(200).json(updTag);

    } catch (error){
      res.status(500).json(error)
    }
  
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value

const delProd = Product.findByPk(req.params.id);
Product.destroy({
  where:{id:req.params.id,},
})
.then((delProd) => {
  res.json(`$(delProd) was removed`);
})
.catch(error) 
  res.json(err);
});

module.exports = router;
