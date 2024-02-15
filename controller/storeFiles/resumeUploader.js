import { config } from 'dotenv';
import fs from 'fs';
import { createResume, getEmployeeResumes } from '../../dbOperation/resumeOperation.js';
config();
export const uploadResume = async (req, res) => {
    try {
        const { resume, name } = req.body;
        const currentDate = new Date();
        const uniqueFileName = `resume_${currentDate.getTime()}_${name}`;
        const decodedResume = Buffer.from(resume, 'base64');
        const filePath = `./public/uploads/${uniqueFileName}`;
        fs.writeFileSync(filePath, decodedResume);
        const resumeUploaded = await createResume(uniqueFileName, req.user._id, name)
        res.status(200).send(resumeUploaded);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


export const getAllResumesWithUserId = async (req, res) => {
    try {
        const resumes = await getEmployeeResumes(req.user._id)
        res.status(200).send(resumes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}