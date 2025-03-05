const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function hashPassword() {
  const email = 'bengur99@gmail.com'; // Replace with the email you used
  const newPassword = 'password123'; // This will be the password you can use to log in
  
  // Hash the password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  // Update the user
  const updatedUser = await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });
  
  console.log('Password updated successfully for user:', updatedUser.name);
  
  await prisma.$disconnect();
}

hashPassword()
  .catch(e => {
    console.error(e);
    process.exit(1);
  });