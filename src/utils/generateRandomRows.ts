export const generateRandomRows = (rowNum: number, charactersPerRow: number) => {
  const characters =
    "0123456789";
  // const characters =
  //   "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':,.<>?/";
  // const characters =
  //   'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?/';

  const result = [];
  for (let i = 0; i < rowNum; i++) {
    let row = "";
    for (let j = 0; j < charactersPerRow; j++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const generatedChar = Math.random() > 0.2 ? characters[randomIndex] : " ";
      row += generatedChar;
    }
    result.push(row);
  }
  
  return result;
};
