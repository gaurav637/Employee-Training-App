const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema(
    {
      title: { 
        type: String, 
        required: true 
      },
      description: { 
        type: String, 
        required: true 
      },
      category: { 
        type: String, 
        required: true 
      },
      startDate: { 
        type: Date, 
        required: true 
      },
      endDate: { 
        type: Date, 
        required: true 
      },
      instructor: { 
        type: String, 
        required: true 
      },
      maxParticipants: { 
        type: Number, 
        default: 20 
      },
    //   attendees: [
    //     { 
    //       type: mongoose.Schema.Types.ObjectId, 
    //       ref: 'Employee' 
    //     }
    //   ],
    //   feedback: [
    //     {
    //       employee: { 
    //         type: mongoose.Schema.Types.ObjectId, 
    //         ref: 'Employee' 
    //       },
    //       rating: { 
    //         type: Number, 
    //         min: 1, 
    //         max: 5 
    //       },
    //       comments: { 
    //         type: String 
    //       }
    //     }
    //   ]
}, {timestamps: true});
  
const Training = mongoose.model('Training', trainingSchema);
module.exports = Training;