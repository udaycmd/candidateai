-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Ai');

-- CreateTable
CREATE TABLE "chat" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'New Chat',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "model" TEXT,
    "inputTokens" INTEGER,
    "outputTokens" INTEGER,
    "completionTime" DECIMAL(65,30),

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "source" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT,
    "snippet" TEXT,
    "metadata" JSONB,

    CONSTRAINT "source_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "chat_userId_idx" ON "chat"("userId");

-- CreateIndex
CREATE INDEX "chat_userId_createdAt_idx" ON "chat"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "message_chatId_idx" ON "message"("chatId");

-- CreateIndex
CREATE INDEX "message_chatId_createdAt_idx" ON "message"("chatId", "createdAt");

-- CreateIndex
CREATE INDEX "source_messageId_idx" ON "source"("messageId");

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "source" ADD CONSTRAINT "source_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE CASCADE;
