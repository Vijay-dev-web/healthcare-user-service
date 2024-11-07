import express from 'express';

const router = express.Router();

router.get('/api/users/signout', (req, res) => {
    res.send('New Route Handler');
})

export { router as signoutRouter };