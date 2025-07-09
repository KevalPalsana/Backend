
import Role from '../models/role.js';



const createRole = async (req, res) => {
    try {
        const { name } = req.body;
        const role = new Role({ name });
        await role.save();
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Error creating role', error });
    }
};

const getRole = async (req, res) => {
    try {
        const roles = await Role.find({});
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export default {createRole, getRole};

