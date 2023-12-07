const { db } = require('../db/connect')

const getAdminPanel = async (request, response) =>{
    let [users, _] = await db.query("SELECT * FROM users")
    if (users.length > 0){
        return response.render('admin.ejs', {status: "success", message: "", users: users})
    }
    return response.render('admin.ejs', {status: "error", message: "Something went wrong"})
}

const upgradeToAdmin = async (request, response) => {
    const id = request.params.id
    
    if(!id) return response.render('admin.ejs', {status: "error", message: "Invalid request"})

    try{
        let [user, _] = await db.query('SELECT * FROM users WHERE id = ?', [id])
        if(user.length < 1) return response.render('admin.ejs', {status: "error", message: "Invalid user"})
        if(user[0].isadmin  == true) return response.render('admin.ejs', {status:"error", message:"User is already an admin"})

        var dbResult = await db.query('UPDATE users SET isadmin=true WHERE id= ?', [id])
        return response.render('admin.ejs',{status:"success", message:"Added user to administrators list"})

    }catch(error){
        console.error('Error executing query:', error);
        response.status(500).json({status:"error", message:"Something went wrong"});
    }
    
}

const deleteUser = async(request, response) => {
    const userId = request.params.id; 

    if(!userId)
        return response.send({status:"error", message: "Missing required fields - userId"});

    try {
        var dbResult = await db.query(`SELECT * FROM users WHERE id=?`, [userId]);
        if(dbResult[0].length < 1) 
            return response.status(400).send({status:"error", message:"The user does not exist"});

        var deleteUserNotes = await db.query(`DELETE FROM notes WHERE user_id=?`, [userId]);
        var deleteUser = await db.query("DELETE FROM users WHERE id=?", [userId]);

        return response.render('admin.ejs',{status:"success", message:"Deleted the user"})

    } catch (error) {
        return response.status(500).send({status:"error", message:`${error}`});
    }
}


module.exports = {
    getAdminPanel,
    upgradeToAdmin,
    deleteUser
} 