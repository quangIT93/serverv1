import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import logging from "../../utils/logging";

const uploadImages = async (
        files, 
        postsId: number | null = null
) => {
    try {
        logging.info("Upload files  to aws service start ...");
        const client = new S3Client({ region: process.env.AWS_REGION });
        const params = files.map((file) => ({
            Bucket: process.env.AWS_BUCKET_NAME + (postsId ? `/posts-image/${postsId}` : ""),
            Key: `${Date.now()}-${uuidv4()}.jpg`,
            Body: file.buffer,
        }));

        await Promise.all(
            params.map((param) => client.send(new PutObjectCommand(param)))
        );

        return params.map(
            (param) =>
                `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${param.Key}`
        );
    } catch (error) {
        logging.error(`Upload files to aws service error: ${error}`);
        throw error;
    }
};

export default uploadImages;
