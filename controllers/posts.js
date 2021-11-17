const Post = require("../models/post");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();
const { v4: uuidv4 } = require("uuid");

const BUCKET_NAME = process.env.BUCKET_NAME;

module.exports = {
    create,
    index,
};

function create(req, res) {
    console.log(req.body, req.file, req.user);

    // Upload the file to AWS
    const filePath = `${uuidv4()}/${req.file.originalname}`;
    const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer };
    // exactly like signup we did yesterday, so look at the signup function
    s3.upload(params, async function (err, data) {
        console.log(err, " <- error from aws in the post create");

        try {
            const post = await Post.create({
                caption: req.body.caption,
                photoUrl: data.Location,
                user: req.user
            });
            res.status(201).json({ post: post });
        } catch (err) {
            res.status(400).json({ err });
        }
    });
    // after you upload the photo, you'll want to create a Post,
    // make sure you refer to the Post model to see what properties the schema needs
    // respond back to the client with the create post
}

async function index(req, res) {
    try {
        // this populates the user when you find the posts
        // so you'll have access to the users information
        // when you fetch the posts
        const posts = await Post.find({}).populate("user").exec();
        res.status(200).json({ posts: posts });
    } catch (err) {
        res.status(400).json({ err });
    }
}