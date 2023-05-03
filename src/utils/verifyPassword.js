/* istanbul ignore file */
import bcrypt from "bcrypt";

const comparePassword = async (password, hashedPassword) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};
export default comparePassword;
