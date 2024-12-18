const prisma = require("../helpers/prisma");
const { postSchema } = require("../helpers/schema");

const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();

    return res.json({
      success: true,
      message: "Get data post success",
      data: posts,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Get data post failed",
    });
  }
};

const createPost = async (req, res) => {
  try {
    const parse = postSchema.safeParse(req.body);

    if (!parse.success) {
      const errorMessages = parse.error.issues.map(
        (err) => `${err.path} - ${err.message}`
      );

      return res.json({
        success: false,
        message: errorMessages,
        data: null,
      });
    }

    const post = await prisma.post.create({
      data: {
        author_name: parse.data.author_name,
        content: parse.data.content,
        title: parse.data.title,
        published: parse.data.published,
      },
    });

    return res.json({
      success: true,
      message: "Create data post success",
      data: post,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Post data post failed",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    const parse = postSchema.safeParse(req.body);

    if (!parse.success) {
      const errorMessages = parse.error.issues.map(
        (err) => `${err.path} - ${err.message}`
      );

      return res.json({
        success: false,
        message: errorMessages,
        data: null,
      });
    }

    const post = await prisma.post.update({
      where: {
        id: Number.parseInt(id),
      },
      data: {
        author_name: parse.data.author_name,
        content: parse.data.content,
        title: parse.data.title,
        published: parse.data.published,
      },
    });

    return res.json({
      success: true,
      message: "Update data post success",
      data: post,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Update data post failed",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findFirst({
      where: {
        id: Number.parseInt(id),
      },
    });

    await prisma.post.delete({
      where: {
        id: Number.parseInt(id),
      },
    });

    return res.json({
      success: true,
      message: "Delete data post success",
      data: post,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Delete data post failed",
    });
  }
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
