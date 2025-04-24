# Chuyển Đổi Số La Mã Sang Số Nguyên (Roman to Integer)

## Mô Tả Bài Toán

**Input:** Một chuỗi `s` chứa các ký tự La Mã hợp lệ (I, V, X, L, C, D, M), đại diện cho số trong khoảng [1, 3999].

**Output:** Số nguyên tương ứng với chuỗi số La Mã.

## Quy Tắc Số La Mã

Các ký tự La Mã có giá trị:
- I = 1
- V = 5
- X = 10
- L = 50
- C = 100
- D = 500
- M = 1000

Thông thường, số La Mã được viết từ trái sang phải, từ lớn đến nhỏ (ví dụ: XII = X + II = 10 + 2 = 12).

Có 6 trường hợp ngoại lệ khi ký tự nhỏ hơn đứng trước ký tự lớn hơn:
- IV = 5 - 1 = 4
- IX = 10 - 1 = 9
- XL = 50 - 10 = 40
- XC = 100 - 10 = 90
- CD = 500 - 100 = 400
- CM = 1000 - 100 = 900

## Ý Tưởng Giải Pháp

Để chuyển đổi số La Mã thành số nguyên, ta duyệt chuỗi `s` từ trái sang phải:

1. Với mỗi ký tự, ta kiểm tra ký tự hiện tại và ký tự tiếp theo:
   - Nếu giá trị của ký tự hiện tại nhỏ hơn giá trị của ký tự tiếp theo, điều này có nghĩa là ký tự hiện tại thuộc về một cặp trừ (như I trong IV hoặc X trong XC). Ta trừ giá trị của ký tự hiện tại.
   - Ngược lại, nếu giá trị của ký tự hiện tại lớn hơn hoặc bằng giá trị của ký tự tiếp theo (hoặc không có ký tự tiếp theo), ta cộng giá trị của ký tự hiện tại.

2. Để xử lý trường hợp ký tự cuối cùng, ta luôn cộng giá trị của nó (vì không có ký tự tiếp theo để so sánh).

## Giải Thích Chi Tiết Cách Hoạt Động Của Code

### 1. Khởi tạo

- **Map giá trị La Mã**:
  - Tạo một đối tượng `romanMap` để ánh xạ các ký tự La Mã (I, V, X, v.v.) với giá trị tương ứng (1, 5, 10, v.v.).
  - Điều này giúp truy xuất giá trị của ký tự nhanh chóng thay vì dùng nhiều câu lệnh if.

- **Biến kết quả**:
  - `result = 0`: Lưu trữ tổng giá trị số nguyên của chuỗi La Mã.

- **Duyệt chuỗi**:
  - Sử dụng vòng lặp for để duyệt qua từng ký tự của chuỗi s từ chỉ số i = 0 đến s.length - 1.

### 2. Xử lý từng ký tự

Với mỗi ký tự tại chỉ số i:

- **Lấy giá trị hiện tại**: `currentVal = romanMap[s[i]]` (giá trị của ký tự hiện tại, ví dụ: I → 1).

- **Lấy giá trị tiếp theo**:
  - Nếu `i + 1 < s.length`, lấy `nextVal = romanMap[s[i + 1]]` (giá trị của ký tự tiếp theo).
  - Nếu không có ký tự tiếp theo (tức là i là ký tự cuối), gán `nextVal = 0` để đảm bảo ký tự cuối luôn được cộng.

- **Quy tắc xử lý**:
  - Nếu `currentVal < nextVal`:
    - Ký tự hiện tại thuộc về cặp trừ (như I trong IV, X trong XC).
    - Trừ giá trị hiện tại: `result -= currentVal`.
    - Ví dụ: Với IV, khi i=0, currentVal = 1 (I), nextVal = 5 (V), ta trừ 1 → result -= 1.
  
  - Ngược lại (`currentVal >= nextVal` hoặc không có ký tự tiếp theo):
    - Ký tự hiện tại được cộng bình thường.
    - Cộng giá trị hiện tại: `result += currentVal`.
    - Ví dụ: Với IV, khi i=1, currentVal = 5 (V), nextVal = 0 (không có tiếp theo), ta cộng 5 → result += 5.

### 3. Trả về kết quả

- Sau khi duyệt hết chuỗi, `result` chứa giá trị số nguyên của số La Mã.
- Trả về `result`.

## Ví Dụ Minh Họa

**Input**: s = "MCMXCIV"  
**Output mong muốn**: 1994

**Bước thực hiện**:

1. Khởi tạo: `result = 0`, `romanMap = {I:1, V:5, X:10, L:50, C:100, D:500, M:1000}`.
2. Duyệt chuỗi s = "MCMXCIV":
   - i=0: s[0] = M, currentVal = 1000, nextVal = romanMap[C] = 100.  
     1000 > 100 → Cộng: result += 1000 = 1000.
   - i=1: s[1] = C, currentVal = 100, nextVal = romanMap[M] = 1000.  
     100 < 1000 → Trừ: result -= 100 = 1000 - 100 = 900 (xử lý CM = 1000 - 100).
   - i=2: s[2] = M, currentVal = 1000, nextVal = romanMap[X] = 10.  
     1000 > 10 → Cộng: result += 1000 = 900 + 1000 = 1900.
   - i=3: s[3] = X, currentVal = 10, nextVal = romanMap[C] = 100.  
     10 < 100 → Trừ: result -= 10 = 1900 - 10 = 1890 (xử lý XC = 100 - 10).
   - i=4: s[4] = C, currentVal = 100, nextVal = romanMap[I] = 1.  
     100 > 1 → Cộng: result += 100 = 1890 + 100 = 1990.
   - i=5: s[5] = I, currentVal = 1, nextVal = romanMap[V] = 5.  
     1 < 5 → Trừ: result -= 1 = 1990 - 1 = 1989 (xử lý IV = 5 - 1).
   - i=6: s[6] = V, currentVal = 5, nextVal = 0 (không có ký tự tiếp theo).  
     5 > 0 → Cộng: result += 5 = 1989 + 5 = 1994.

**Kết quả**: result = 1994.

## Độ Phức Tạp

- **Thời gian**: O(n), trong đó n là độ dài chuỗi s.
  - Ta duyệt qua chuỗi s đúng một lần, mỗi lần thực hiện các thao tác hằng số (truy cập map, so sánh, cộng/trừ).

- **Không gian**: O(1).
  - `romanMap` có kích thước cố định (7 cặp key-value), không phụ thuộc vào n.
  - Chỉ sử dụng một biến `result` và các biến tạm `currentVal`, `nextVal`.

## Ưu Nhược Điểm

### Ưu điểm:
- Đơn giản và dễ hiểu: Chỉ cần duyệt chuỗi một lần và áp dụng quy tắc so sánh.
- Hiệu quả: Thời gian tuyến tính O(n) và không gian hằng số O(1).
- Xử lý mọi trường hợp: Bao gồm cả các cặp trừ như IV, IX, CM, v.v.

### Nhược điểm:
- Cần cẩn thận với logic so sánh để không bỏ sót trường hợp ký tự cuối.

## Code Mẫu

```javascript
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
      
      // Lấy giá trị của ký tự tiếp theo (nếu có)
      const nextVal = i + 1 < s.length ? romanMap[s[i + 1]] : 0;
      
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
```

## Cách Trình Bày Trong Phỏng Vấn

### Giới Thiệu Ý Tưởng

"Để chuyển số La Mã thành số nguyên, tôi sẽ duyệt chuỗi từ trái sang phải. Với mỗi ký tự, tôi so sánh giá trị của nó với ký tự tiếp theo. Nếu giá trị hiện tại nhỏ hơn giá trị tiếp theo, tôi trừ nó (như I trong IV); ngược lại, tôi cộng nó."

### Giải Thích Quy Tắc

"Ví dụ, với MCMXCIV, ta xử lý M = 1000 (cộng), C < M (trừ, cho CM = 900), M (cộng), X < C (trừ, cho XC = 90), C (cộng), I < V (trừ, cho IV = 4), và V (cộng)."

### Code Ngắn Gọn

Viết code như đã trình bày, nhấn mạnh việc dùng romanMap để truy xuất giá trị nhanh.

### Phân Tích Độ Phức Tạp

"Thời gian là O(n) vì duyệt chuỗi một lần, không gian là O(1) vì chỉ dùng map cố định và vài biến."

### Xử Lý Trường Hợp Đặc Biệt

Nhắc đến các trường hợp như s = "III" (chỉ cộng), s = "IV" (có trừ), hoặc s = "MCMXCIV" (phức tạp hơn).

"Code này xử lý mọi trường hợp vì luôn kiểm tra ký tự tiếp theo, và gán nextVal = 0 cho ký tự cuối để đảm bảo cộng."

