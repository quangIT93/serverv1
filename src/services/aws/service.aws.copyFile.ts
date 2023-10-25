import { S3Client, CopyObjectCommand } from "@aws-sdk/client-s3";

import { v4 as uuidv4 } from "uuid";
// import ImageBucket from "../../models/enum/imageBucket.enum";
import logging from "../../utils/logging";
// import ProfilesBucket from "../../models/enum/profileBucket.enum";

// This function will be used to copy file from folder to another folder in aws s3
// example: when user apply for a job, we will copy cv from cv folder to application folder
// so that we can keep track of which cv is used for which application


const copyFileService = async (
    copySource: string,
    key: string,
) => {
    try {
        logging.info("Copy files to aws service start ...");
        const client = new S3Client({ region: process.env.AWS_REGION });
        // console.log("copySource: ", copySource);
        // console.log("key: ", key);
        const param = {
            Bucket: process.env.AWS_BUCKET_NAME , // Bucket name
            Key: key,
            // CopySource: "/" + copySource,
            CopySource: encodeURI(`${process.env.AWS_BUCKET_PREFIX_URL}/${copySource}`),

        };

        const copyObj = new CopyObjectCommand(param);

        // console.log("copyObj: ", copyObj);

        const data = await client.send(copyObj);

        return data;

    } catch (error) {
        console.log("error: ", error);
        logging.error(`Copy files to aws service error: ${error}`);
        throw error;
    }
};

export default copyFileService;