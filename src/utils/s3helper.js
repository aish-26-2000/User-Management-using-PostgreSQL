const AWS = require('aws-sdk');
const { CONSTANTS } = require('../config');

// initialize S3 instance
const s3Config = {
    apiVersion: '2006-03-01',
    accessKeyId: CONSTANTS.S3.S3_ACCESS_KEY_ID,
    secretAccessKey: CONSTANTS.S3.S3_SECRET_ACCESS_KEY,
    region: CONSTANTS.S3.S3_REGION,
};

const s3 = new AWS.S3(s3Config);

// upload file
exports.upload = async (file, key) => {
    try {
        // setting s3 parameters
        const params = {
            Bucket: CONSTANTS.S3.S3_BUCKET,
            Key: key,
            Body: file.data,
            ContentType: 'image/jpeg',
        };

        // uploading files to bucket
        const data = await s3.upload(params).promise();
        return data.Location;
    } catch (err) {
        err;
    }
};

// access the private object
exports.getAccessURL = async (key) => {
    try {
        const params = {
            Bucket: CONSTANTS.S3.S3_BUCKET,
            Key: key,
        };
        // check if obj exists in the bucket
        await s3.headObject(params).promise();
        const url = await s3.getSignedUrlPromise('getObject', {
            Bucket: CONSTANTS.S3.S3_BUCKET,
            Key: key,
            Expires: 60,
        });
        if (url) {
            return url;
        }
    } catch (err) {
        if (err.name === 'NotFound') {
            return null;
        }
    }
};

// delete the image
exports.delete = (key) => {
    s3.deleteObject({
        Bucket: CONSTANTS.S3.S3_BUCKET,
        Key: key,
    });
};
