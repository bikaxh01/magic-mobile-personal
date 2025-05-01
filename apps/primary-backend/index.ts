import { prismaClient } from "@repo/db/client";
import { redisClient } from "@repo/redis/redis";
import express, { type Request, type Response } from "express";
import cors from "cors";
import { authMiddleware } from "./middleware";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "All good 😎 ",
  });
});

app.post(
  "/create-project",
  authMiddleware,
  async (req: Request, res: Response) => {
   try {
     const userId = req.userId;
     console.log("🚀 ~ userId:", userId)
 
     const { prompt } = req.body;
 
     const createProject = await prismaClient.project.create({
       data: {
         userId,
         description: prompt,
       },
     });
 
     res.json({
       success: true,
       data: createProject,
     });
   } catch (error) {
    console.log("🚀 ~ error:", error)
    res.json({
      success: false,
      data: "ERROR",
    });
   }
  }
);

app.get(
  "/get-projects",
  authMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.userId;

    const projects = await prismaClient.project.findMany({
      where: {
        userId,
      },
    });
    res.json({
      success: true,
      data: projects,
    });
  }
);

app.get(
  "/get-messages",
  authMiddleware,
  async (req: Request, res: Response) => {
    const { userId,projectId } = req.body;

    const messages = await prismaClient.message.findMany({
      where:{
        projectId
      },orderBy:{
        createdAt:'desc'
      }
    })

    res.json({
      success: true,
      data: messages,
    });
   
  }
);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Running at ${PORT} 🟢🟢`);
});
