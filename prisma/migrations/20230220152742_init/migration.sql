-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "profileUrl" STRING NOT NULL DEFAULT 'https://cdn0.iconfinder.com/data/icons/education-2-27/32/user_staff_person_man_profile_boss_circle-512.png',
    "password" STRING NOT NULL,
    "roles" STRING[],
    "name" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" STRING NOT NULL,
    "takeOff" TIMESTAMP(3) NOT NULL,
    "landing" TIMESTAMP(3) NOT NULL,
    "shipType" STRING NOT NULL,
    "astronautId" STRING NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_astronautId_fkey" FOREIGN KEY ("astronautId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
