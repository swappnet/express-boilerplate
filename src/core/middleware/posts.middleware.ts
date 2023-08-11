import httpStatus from "http-status";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  author: z.string().min(1),
});

const postUpdateSchema = z
  .object({
    title: z.string().min(1),
    content: z.string().min(1),
    author: z.string().min(1),
  })
  .partial()
  .refine(
    (data) => !!data.title || !!data.content || !!data.author,
    "Provide details for update."
  );

const validatePost = async (req, res, next) => {
  try {
    if (req.method === "POST") {
      postSchema.parse(req.body);
    } else if (req.method === "PUT") {
      postUpdateSchema.parse(req.body);
    }

    next();
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    res.send({ message: "Invalid post data." });
  }
};

export { validatePost };
