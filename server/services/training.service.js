const {Training} = require('../models');

module.exports.createNewTraining = async (reqBody) => {
    try{
        //console.log("video url -> ",reqBody.video);
        const newTraining = new Training(reqBody);
        
        newTraining.save();
        return newTraining;
    }catch(error){
        console.log("Failed to create new training");
        throw new Error("Failed to create new training");
    }
}

module.exports.getAllTraining = async ()=> {
    try{
        const allTraining = await Training.find();
        if(!allTraining){
            throw new Error("Training is not available!");
        }
        return allTraining;
    }catch(error){
        throw new Error(error.message);
    }
}

module.exports.serachTraining = async (searchKey)=> {
    try{
        if(searchKey && searchKey!=""){
            const training = 
                            searchKey && searchKey!=""
                            ?{
                                $or: [
                                    {
                                        title: {$regex: searchKey, $options: "i"}
                                    },
                                    {
                                        description: {$regex: searchKey, $options: "i"}
                                    }
                                ]
                            }:{};
        }
    }catch(error){
        throw new Error(error.message);
    }
}

module.exports.getAllmodulesInTraining = async (id) => {
    try{
        const training = await Training.findById(id);
        if(!training){
            throw new Error("Training Not Found!");
        }
        const modules = training.moduleContent;
        if(!modules){
            throw new Error("there are not any Modules");
        }
        return modules;
    }catch(error){
        throw new Error(error.message);
    }
}

module.exports.updateModule = async (id, reqBody) => {
    try {
        console.log("trainingId -> ", id);
        const { moduleId, isComplete } = reqBody;

        // Use `findById` correctly
        const training = await Training.findById(id);
        if (!training) {
            throw new Error("Training not found");
        }

        // Find the specific module using its ID
        const module = training.modules.id(moduleId);
        if (!module) {
            throw new Error("Module not found");
        }

        // Update the module's completion status
        module.isComplete = isComplete;

        // Save the updated training document
        const updatedTraining = await training.save();
        return updatedTraining;

    } catch (error) {
        console.error('Error updating module completion status:', error);
        throw new Error(error.message);
    }
};
