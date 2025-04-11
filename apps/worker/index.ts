import Anthropic from "@anthropic-ai/sdk";
import { prismaClient } from "@repo/db/client";
import bodyParser from "body-parser";
import express, { type Request, type Response } from "express";
import cors from "cors";
import { systemPrompt } from "./systemPrompt";
import { ArtifactProcessor } from "./parser";
import { onFileContent, onShellCommand } from "./os";
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 6000;
const anthropic = new Anthropic();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "All good 😎",
  });
});

app.post("/prompt", async (req: Request, res: Response) => {
  // get user prompt
  const { prompt, projectId } = req.body;

  if (!projectId || !prompt) {
    res.json({
      success: false,
      message: "Invalid Input",
    });
    return;
  }
  
  // save to dd
  await prismaClient.message.create({
    data: {
      projectId,
      content: prompt,
      role: "USER",
    },
  });
  
  // get all
  // messages for context
  
  const context = await prismaClient.message.findMany({
    where: {
      projectId: projectId,
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      content: true,
      role: true,
    },
  });

  

  // pass to llm

  let finalResponse = "";

  const artifactProcessor = new ArtifactProcessor(
    "",
    onFileContent,
    onShellCommand
  );

  const msg = await anthropic.messages
    .stream({
      model: "claude-3-7-sonnet-20250219",
      max_tokens: 8000,
      temperature: 1,
      system: systemPrompt("REACT_NATIVE"),
      messages: context.map((message) => ({
        role: message.role === "USER" ? "user" : "assistant",
        content: message.content,
      })),
    })
    .on("text", (text) => {
      // parse the response
      artifactProcessor.append(text);
      artifactProcessor.parse();
      // res.write(text);
    })
    .on("finalMessage", async (finalMessage) => {
      //@ts-ignore
      const finalAssistantMessage:string = finalMessage.content[0]?.text;

      await prismaClient.message.create({
        data: {
          role: "AI",
          content: finalAssistantMessage,
          projectId
        },
      });

      // res.end();
      // save to db
    });
  //parser response

    res.json({
      success: true,
      message: "done",
    });
});

app.listen(PORT, () => console.log(`Worker running at ${PORT}🟢`));
