const {TrainingService} = require('../services');
const {Training} = require('../models');

module.exports.createTraining = async (req,res) =>{
    try{
        const training = await TrainingService.createNewTraining(req.body);
        if(!training){
            return res.status(500).json({
                message: "failed to create ",
                success: false,
                error: true,
            })
        }
        return res.status(201).json({
            message: "create",
            success: true,
            training: training,
        });
    }catch(error){
        return res.status(500).json({
            message: error.message,
            success: false,
            error: true,
        });
    }
}

module.exports.getAllTraining = async (req,res) =>{
    try{
        const trainings = await TrainingService.getAllTraining();
        if(!trainings){
            return res.status(500).json({
                message: "failed to create ",
                success: false,
                error: true,
            })
        }
        return res.status(200).json({
            message: "get all Trainings",
            success: true,
            training: trainings,
        });

    }catch(error){
        return res.status(500).json({
            message: error.message,
            success: false,
            error: true,
        });
    }
}

module.exports.searchTrainings = async (req,res) =>{
    try{
        const searchTrainings = await TrainingService.serachTraining(req.body);
        if(!searchTrainings){
            return res.status(204).json({
                message: "Not Data ",
                success: false,
                error: true,
            })
        }
        return res.status(200).json({
            message: "get Trainings",
            success: true,
            training: searchTrainings,
        });
    }catch(error){
        return res.status(500).json({
            message: error.message,
            success: false,
            error: true,
        });
    }
}

module.exports.getTrainingModules = async (req,res) =>{
    try{
        const getModules = await TrainingService.getAllmodulesInTraining(req.params.id);
       // console.log("get module -> ",getModules);
        if(!getModules){
            return res.status(204).json({
                message: "Not Module ",
                success: false,
                error: true,
            })
        }
        return res.status(200).json({
            message: "get Modules",
            success: true,
            module: getModules,
        });
    }catch(error){
        return res.status(500).json({
            message: error.message,
            success: false,
            error: true,
        });
    }
}

// module.exports.updateTrainingModule = async (req,res) =>{
//     try{
//         const id = req.params;
//         const message = await TrainingService.updateModule(id,req.body);
//         res.status(200).json({
//             message: message,
//             success: true,
//         });
//     }catch(error){
//         res.status(500).json({
//             message: error.message,
//             error: true,
//         })
//     }
// }


module.exports.updateTrainingModule = async (req, res) => {
    try {
        const { id } = req.params;
        const { moduleId, isComplete } = req.body;
        console.log("trainingId ->", id);

        // Find the training document by ID
        const training = await Training.findById(id);
        if (!training) {
            return res.status(404).json({ error: "Training not found" });
        }
console.log("line 130");
        // Ensure modules exist before accessing them
        if (!training.moduleContent || training.moduleContent.length === 0) {
            return res.status(404).json({ error: "Modules not found in the training document" });
        }
        const module = training.moduleContent.id(moduleId);
        if (!module) {
            return res.status(404).json({ error: "Module not found" });
        }
        module.isComplete = isComplete;
        const updatedTraining = await training.save();
        return res.json(updatedTraining);

    } catch (error) {
        console.error('Error updating module completion status:', error);
        return res.status(500).json({ error: error.message });
    }
};

