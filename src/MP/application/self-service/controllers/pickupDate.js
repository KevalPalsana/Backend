import DateModel from '../models/pickupDate.js';

function parseDate(input) {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!regex.test(input)) {
        throw new Error('Invalid date format. Please use mm/dd/yyyy format.');
    }

    const [month, day, year] = input.split('/').map(Number);

    const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const date = new Date(dateString);

    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        throw new Error('Invalid date value. Please ensure the date is correct.');
    }

    return date;
}

const createDate = async (req, res) => {
    try {
        const { pickupDate, eventName, pickupTime } = req.body;

        const parsedDate = parseDate(pickupDate);

        const newDate = new DateModel({ pickupDate: parsedDate, eventName, pickupTime });
        await newDate.save();

        res.status(201).json({ message: 'Date entry created successfully', data: newDate });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create date entry', error: error.message });
    }
};


const getAllDates = async (req, res) => {
    try {
        const dates = await DateModel.find();
        res.status(200).json({ data: dates });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve date entries', error: error.message });
    }
};

const getDateById = async (req, res) => {
    try {
        const dateId = req.params.id;
        const dateEntry = await DateModel.findById(dateId);
        if (!dateEntry) {
            return res.status(404).json({ message: 'Date entry not found' });
        }
        res.status(200).json({ data: dateEntry });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve date entry', error: error.message });
    }
};



const updateDateById = async (req, res) => {
    try {
        const dateId = req.params.id;
        const { pickupDate, eventName } = req.body;

        let updatedData = {};
        if (pickupDate) {
            updatedData.pickupDate = parseDate(pickupDate);
        }
        if (eventName) {
            updatedData.eventName = eventName;
        }

        const updatedDate = await DateModel.findByIdAndUpdate(dateId, updatedData, { new: true });

        if (!updatedDate) {
            return res.status(404).json({ message: 'Date entry not found' });
        }
        res.status(200).json({ message: 'Date entry updated successfully', data: updatedDate });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update date entry', error: error.message });
    }
};



const deleteDateById = async (req, res) => {
    try {
        const dateId = req.params.id;
        const deletedDate = await DateModel.findByIdAndDelete(dateId);
        if (!deletedDate) {
            return res.status(404).json({ message: 'Date entry not found' });
        }
        res.status(200).json({ message: 'Date entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete date entry', error: error.message });
    }
};

export default {createDate, getAllDates, getDateById, updateDateById, deleteDateById}