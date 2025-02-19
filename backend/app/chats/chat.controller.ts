import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { IsNull } from "typeorm";
import { User } from "../user/user.schema";
import { Message } from "./chat.schema";
import { Group } from "../group-chat/group.schema";
import { IUser } from "../user/user.dto";
import { AppDataSource } from "../common/services/database.service";

const userRepo = AppDataSource.getRepository(User);
const chatRepo = AppDataSource.getRepository(Message);
const groupRepo = AppDataSource.getRepository(Group);

/**
 * Send messages in personal chat
 */
export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
  const { receiverId, message } = req.body;
  const senderId = (req.user as IUser).id;

  const sender = await userRepo.findOne({
    where: { id: senderId },
  });
  const receiver = await userRepo.findOne({
    where: { id: receiverId },
  });

  if (!sender || !receiver) {
    res.status(404).json({ message: "User not found", success: false });
    return;
  }

  const messages = await chatRepo.save({
    sender,
    receiver,
    content: message,
  });

  await chatRepo.save(messages);
  res.status(201).json({
    message: "Message sent successfully",
    data: messages,
    success: true,
  });
});

/**
 * Send messages in a group
 */
export const sendGroupMessage = asyncHandler(
  async (req: Request, res: Response) => {
    const { groupId, message } = req.body;
    const group = await groupRepo.findOne({
      where: { id: groupId },
      relations: ["members"],
    });

    if (!group) {
      res.status(404).json({ message: "Group not found", success: false });
      return;
    }

    const userId = (req.user as IUser).id;

    console.log(group.members);
    const isMember = group.members.some((member) => member.id === userId);
    if (!isMember) {
      res.status(403).json({
        success: false,
        message: "You are not a member of this group",
      });
      return;
    }

    const newMessage = chatRepo.create({
      sender: { id: userId },
      group,
      content: message,
    });

    await chatRepo.save(newMessage);
    res.status(201).json({
      message: "Message sent successfully",
      success: true,
      data: {
        id: newMessage.id,
        senderId: userId,
        content: newMessage.content,
        groupId,
        timestamp: new Date(),
        members: group.members.map((member) => ({
          id: member.id,
          email: member.email,
          role: member.role,
        })),
      },
    });
    return;
  }
);

// get messages;
export const getPrivateMessages = asyncHandler(async (req: Request, res: Response) => {
  const senderId = (req.user as IUser).id; // Authenticated user
  const { receiverId } = req.params;

  const messages = await chatRepo.find({
    where: [
      { sender: { id: senderId }, group: IsNull() }, // Sent messages
      { sender: { id: receiverId }, group: IsNull() }, // Received messages
    ],
    relations: ["sender"],
    order: { id: "ASC" },
  });

  res.status(200).json({
    success: true,
    messages,
  });
});

// get group messages
export const getGroupMessages = asyncHandler(async (req: Request, res: Response) => {
  const { groupId } = req.params;

  const messages = await chatRepo.find({
    where: { group: { id: groupId } },
    relations: ["sender"],
    order: { id: "ASC" },
  });

  res.status(200).json({
    success: true,
    messages,
  });
});


