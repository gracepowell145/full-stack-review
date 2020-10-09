const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req,res) =>{
        const {user_name, email, password, profile_picture} = req.body,
            db = req.app.get('db');
// ^bring in what the function needs first
        const foundUser = await db.users.check_user({email}); 
        // ^this is using dot notation to get into the db files. 
        if(foundUser[0]){
            return res.status(400).send('Email already in use.');
            // maybe user forgot that they made a profile and they need to be reminded. This is necissary with the return statement
        }
        let salt = bcrypy.genSaltSync(10),
        hash= bcrypt.hashSync(password, salt);

        const newUser = await db.users.register_user({username, email, hash, profile_picture});
            req.session.user = newUser[0];
            res.status(201).send(req.session.user);
    },
    login: async(req,res)=>{
        const {email, password} = req.body,
        db = req.app.get('db');

        const foundUser = await db.users.check_user({email});
        if(!foundUser[0]){
            return res.status(400).send('Email is not found')
        }
        const authenticated = bcrypt.compareSync(password, foundUser[0].password)
            // ^dot notation foundUser[@object 0 index]and accesses the password w dot notation bish
            if(!authenticated){
            return res.status(401).send('Password is incorrect')
            }

            delete foundUser[0].password;
            req.session.user = foundUser[0]; 
            // ^ puts user on session
            res.status(202).send(req.session.user);
    },

    logout:(req,res)=>{
        req.session.destroy();
        res.sendStatus(200);

    }
}