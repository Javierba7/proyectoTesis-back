const router = require('express').Router();

const User = require('../../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('../../validate/validateData');

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.get('/user/:id', async(req, res) => {
  try {
      const user = await User.findById({ _id: req.params.id });
      res.send(user);
      console.log(`test`);
  } catch (err) {
      res.status(400).send(err);
  }
});

router.post('/user/:id/update', async(req, res) => {
  const { result } = req.body;
  
  const updatePurchases = await User.findByIdAndUpdate({_id: req.params.id}, { $push : {purchases: result }});
  try {
      const purchasesSaved = await updatePurchases.save();
      res.send(purchasesSaved);
  } catch(err) {
      res.send(err);
  }
  
});

router.post('/register', async (req, res) => {
    const { name, secondName = '', lastName } = req.body;
    const { secondLastName, email, password } = req.body;

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).send({ error: `El correo ya existe` });

    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name,
        secondName,
        lastName,
        secondLastName,
        email,
        password: hashPassword
    });

    try {
        const userSaved = await newUser.save();
        res.send({ user: userSaved });
      } catch (err) {
        res.send(err);
      }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
  
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ error: 'El correo no existe' });
  
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send({ error: 'La contraseña es incorrecta' });
  
    const token = jwt.sign({ _id: user._id }, 'secretkey');
  
    res.send({ token });
});

module.exports = router;

