import Path from 'path';
import axios from 'axios';
import { executeQuery } from './../../../configs/database';
import { Request, Response } from 'express';
import fs from 'fs';
import uploadImages from '../../../services/aws/service.aws.uploadImages';

const downloadImage = async (imageName: string) => {  

    console.log(imageName);

    if (imageName === null) {
        return;
    }
    
    const url = `https://gig-app-upload.s3.${process.env.AWS_REGION}.amazonaws.com/${imageName}`;
    
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })
    
    // console.log(imageName);

    if (imageName.startsWith('images/')) {
        imageName = imageName.split('/')[2];
    }
    const path = Path.resolve("_images/avatar", imageName)
    const writer = fs.createWriteStream(path)
    await response.data.pipe(writer)
  }
  
const getImageFromS3 = async (req: Request, res: Response) => {
    
    // READ ALL IMAGE OF POSTS IN DATABASE
    // GET IMAGE BY URL FROM S3

    let imageLists = await executeQuery('SELECT * FROM profiles');

    // console.log(imageLists);

    // DOWNLOAD IMAGE FROM S3
    // const isSuccess = await Promise.all(imageLists.map(async (image) => {
    //     await downloadImage(image.avatar).then(() => {
    //         console.log('Download image success');
    //     }
    //     ).catch((err) => {
    //         // console.log(err);
    //         console.log('Download image error');
    //     })

    // }))

    // // READ IMAGE DOWNLOADED
    // const image = fs.readFileSync(`_images/${imageLists[0].image}`);

    await Promise.all(imageLists.map(async (image) => {
        // const postsId = image.post_id;
        if (image.avatar !== null) {
            let imageName = image.avatar;
            if (imageName.startsWith('images/')) {
                imageName = imageName.split('/')[2];
            }
            const files = fs.readFileSync(`_images/avatar/${imageName}`);
            const imageNameToUpload = `images/avatar/${imageName}`;

            // UPLOAD IMAGE TO NEW S3
            const isSuccess = await uploadImages([files], null, null, imageNameToUpload);

            console.log(isSuccess);

            // await uploadImages([files], image.post_id, null, 'test');
        } else {
            console.log('Image is null');
        }

    }))

    // console.log(image.buffer);
    console.log('Done');

    // // UPLOAD IMAGE TO NEW S3
    // const isSuccess = await uploadImages([image], null, null, 'test');


    return res.status(200).json({
        success: true,
    });


    
}

export default getImageFromS3;