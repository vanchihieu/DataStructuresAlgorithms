# Độ Dài Của Từ Cuối Cùng (Length of Last Word)

## Mô Tả Bài Toán

**Input:** Một chuỗi `s` bao gồm các từ và khoảng trắng.

**Output:** Độ dài của từ cuối cùng trong chuỗi.

_Lưu ý:_ Từ được định nghĩa là một chuỗi các ký tự không chứa khoảng trắng.

## Ý Tưởng Giải Pháp

Để tìm độ dài của từ cuối cùng trong chuỗi, cách tiếp cận hiệu quả nhất là duyệt chuỗi từ phải sang trái (từ cuối về đầu):

1. Bỏ qua các khoảng trắng ở cuối chuỗi (nếu có)
2. Đếm số ký tự liên tiếp không phải khoảng trắng
3. Dừng lại khi gặp khoảng trắng sau khi đã bắt đầu đếm ký tự

## Giải Thích Chi Tiết Cách Hoạt Động Của Code

### 1. Khởi tạo

- **Biến đếm**:

  - `length = 0`: Để lưu trữ độ dài của từ cuối cùng.

- **Duyệt chuỗi**:
  - Sử dụng vòng lặp for để duyệt chuỗi từ cuối về đầu, từ chỉ số `s.length - 1` đến `0`.

### 2. Xử lý từng ký tự

Với mỗi ký tự tại chỉ số i:

- **Nếu ký tự không phải khoảng trắng** (`s[i] != " "`):

  - Tăng biến đếm `length++` để đếm độ dài của từ.

- **Nếu ký tự là khoảng trắng** (`s[i] == " "`) **và đã đếm được ít nhất một ký tự** (`length > 0`):

  - Dừng vòng lặp bằng lệnh `break` vì đã tìm thấy từ cuối cùng và đếm xong độ dài.

- **Nếu ký tự là khoảng trắng và chưa đếm ký tự nào** (`length == 0`):
  - Tiếp tục bỏ qua các khoảng trắng này.

### 3. Trả về kết quả

- Sau khi duyệt hết hoặc dừng vòng lặp, biến `length` chứa độ dài của từ cuối cùng.
- Trả về `length`.

## Ví Dụ Minh Họa

**Input**: s = "Hello World"  
**Output mong đợi**: 5

**Bước thực hiện**:

1. Khởi tạo: `length = 0`.
2. Duyệt chuỗi s = "Hello World" từ cuối:
   - i=10: s[10] = "d", không phải khoảng trắng → length = 1
   - i=9: s[9] = "l", không phải khoảng trắng → length = 2
   - i=8: s[8] = "r", không phải khoảng trắng → length = 3
   - i=7: s[7] = "o", không phải khoảng trắng → length = 4
   - i=6: s[6] = "W", không phải khoảng trắng → length = 5
   - i=5: s[5] = " ", là khoảng trắng và length > 0 → break

**Kết quả**: length = 5 (độ dài của từ "World").

**Ví dụ khác**:

- s = " fly me to the moon " → Output: 4 (từ "moon")
- s = "luffy is still joyboy" → Output: 6 (từ "joyboy")

## Độ Phức Tạp

- **Thời gian**: O(n), trong đó n là độ dài chuỗi s.
  - Trong trường hợp xấu nhất, ta duyệt toàn bộ chuỗi một lần.
- **Không gian**: O(1).
  - Chỉ sử dụng một biến `length` và các biến vòng lặp.

## Code Mẫu

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  let length = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] != " ") {
      length++;
    } else if (length > 0) {
      break;
    }
  }

  return length;
};

// Ví dụ sử dụng
console.log(lengthOfLastWord("Hello World")); // Output: 5
console.log(lengthOfLastWord("   fly me   to   the moon  ")); // Output: 4
console.log(lengthOfLastWord("luffy is still joyboy")); // Output: 6
```

## Cách Trình Bày Trong Phỏng Vấn

### Giới Thiệu Ý Tưởng

"Để tìm độ dài của từ cuối cùng trong chuỗi, tôi sẽ duyệt chuỗi từ cuối về đầu. Trước tiên, tôi bỏ qua các khoảng trắng ở cuối chuỗi, sau đó đếm các ký tự liên tiếp cho đến khi gặp khoảng trắng hoặc đến đầu chuỗi."

### Phân Tích Độ Phức Tạp

"Thuật toán có độ phức tạp thời gian O(n) vì trong trường hợp xấu nhất, tôi cần duyệt qua tất cả các ký tự của chuỗi. Độ phức tạp không gian là O(1) vì tôi chỉ sử dụng một biến đếm và không cần cấu trúc dữ liệu bổ sung."

### Xử Lý Trường Hợp Đặc Biệt

"Tôi cần xử lý các trường hợp như chuỗi chỉ có khoảng trắng, chuỗi có nhiều khoảng trắng ở cuối, hoặc không có khoảng trắng. Thuật toán của tôi đã tính đến tất cả các trường hợp này bằng cách bỏ qua khoảng trắng ở cuối trước khi bắt đầu đếm."
