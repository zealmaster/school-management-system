
export const receipt_reference_no = `FEES-${Math.round(
    Math.random() * 100000,
  )}-${Date.now().toString().slice(0, 7)}-${generateRandomString(2)}`;
  
 export function generateRandomString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  