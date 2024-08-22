const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: {
        type: String,
        require: true,
        unique: true,
    },
    trainingsEnrolled: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Training' 
    }],
    progress: [{
        training: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Training' 
        },
        completionPercentage: { 
            type: Number, 
            default: 0 
        },
        status: { 
            type: String, 
            enum: ['Not Started', 'In Progress', 'Completed'], 
            default: 'Not Started' 
        },
    }],
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;