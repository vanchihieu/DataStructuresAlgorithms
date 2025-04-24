/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
  // Tạo map để ánh xạ ký tự La Mã với giá trị
  const romanMap = {
      'I': 1,
      'V': 5,
      'X': 10,
      'L': 50,
      'C': 100,
      'D': 500,
      'M': 1000
  };
  
  let result = 0; // Kết quả số nguyên
  
  // Duyệt qua chuỗi từ trái sang phải
  for (let i = 0; i < s.length; i++) {
      // Lấy giá trị của ký tự hiện tại
      const currentVal = romanMap[s[i]];
      console.log("🚀 ~ romanToInt ~ currentVal:", currentVal);
      
      // Lấy giá trị của ký tự tiếp theo (nếu có)
      const nextVal = i + 1 < s.length ? romanMap[s[i + 1]] : 0;
      console.log("🚀 ~ romanToInt ~ nextVal:", nextVal);


      
      // Nếu giá trị hiện tại nhỏ hơn giá trị tiếp theo, trừ nó
      if (currentVal < nextVal) {
          result -= currentVal;
      } else {
          // Ngược lại, cộng nó
          result += currentVal;
      }
  }
  
  return result;
};

// Ví dụ sử dụng
let romanNumeral = "MCMXCIV"; // 1994
let integerValue = romanToInt(romanNumeral);
console.log(`Giá trị số nguyên của ${romanNumeral} là: ${integerValue}`); // Kết quả: 1994
