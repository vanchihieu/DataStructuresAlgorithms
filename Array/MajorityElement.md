# Phần Tử Chiếm Đa Số (Majority Element)

## Đề bài

**Input:** Một mảng `nums` chứa n số nguyên.

**Output:** Phần tử chiếm đa số, tức là phần tử xuất hiện hơn ⌊n/2⌋ lần.

**Ràng buộc:**
- n == nums.length, 1 <= n <= 5 * 10^4.
- -10^9 <= nums[i] <= 10^9.
- Đảm bảo phần tử chiếm đa số luôn tồn tại.

**Follow-up:** Tìm giải pháp với thời gian O(n) và không gian O(1).

## Ý tưởng giải pháp

Để đáp ứng yêu cầu thời gian O(n) và không gian O(1), ta sử dụng thuật toán **Boyer-Moore Voting Algorithm**. Đây là cách tối ưu nhất cho bài toán này.

### Ý tưởng chính:

- Vì phần tử chiếm đa số xuất hiện hơn n/2 lần, nếu ta "loại bỏ" các cặp phần tử khác nhau, phần tử còn lại sẽ là phần tử chiếm đa số.

### Cách hoạt động:
- Duy trì một biến candidate (ứng viên) và một biến count (đếm số phiếu).
- Duyệt qua mảng:
  - Nếu count == 0, chọn phần tử hiện tại làm candidate.
  - Nếu phần tử hiện tại là candidate, tăng count.
  - Nếu không, giảm count.
- Sau khi duyệt, candidate là phần tử chiếm đa số (do bài toán đảm bảo nó tồn tại).

### Tại sao hoạt động?
- Mỗi lần giảm count, ta "loại bỏ" một phần tử không phải chiếm đa số cùng với một phần tử chiếm đa số.
- Vì phần tử chiếm đa số có hơn n/2 lần xuất hiện, nó sẽ luôn "thắng" sau các lần loại bỏ.

## Code giải pháp bằng JavaScript:

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let candidate = nums[0]; // Ứng viên ban đầu
    let count = 1; // Đếm số phiếu
    
    // Duyệt qua mảng
    for (let i = 1; i < nums.length; i++) {
        if (count === 0) {
            // Nếu count = 0, chọn phần tử hiện tại làm candidate
            candidate = nums[i];
            count = 1;
        } else if (nums[i] === candidate) {
            // Nếu phần tử giống candidate, tăng count
            count++;
        } else {
            // Nếu phần tử khác candidate, giảm count
            count--;
        }
    }
    
    return candidate;
};
```

## Giải thích chi tiết cách hoạt động của code:

### 1. Khởi tạo:
- **Biến candidate**:
  - `let candidate = nums[0];`: Chọn phần tử đầu tiên làm ứng viên ban đầu.
  - Ứng viên này có thể thay đổi trong quá trình duyệt nếu count về 0.
- **Biến count**:
  - `let count = 1;`: Ban đầu, candidate (phần tử đầu tiên) có 1 phiếu.
  - Vì bài toán đảm bảo phần tử chiếm đa số tồn tại, ta không cần kiểm tra trường hợp mảng rỗng (n >= 1).

### 2. Duyệt mảng (Boyer-Moore Voting Algorithm):
- **Vòng lặp**: `for (let i = 1; i < nums.length; i++)`:
  - Bắt đầu từ chỉ số 1 (vì nums[0] đã được chọn làm candidate).
  - Với mỗi phần tử nums[i], thực hiện:
    - **Nếu count === 0**:
      - candidate hiện tại không còn đủ phiếu (các phần tử trước đã triệt tiêu nhau).
      - Chọn nums[i] làm candidate mới: `candidate = nums[i]`.
      - Đặt count = 1 (phần tử mới có 1 phiếu).
    - **Nếu nums[i] === candidate**:
      - Phần tử hiện tại giống candidate, tăng số phiếu: `count++`.
    - **Nếu nums[i] !== candidate**:
      - Phần tử hiện tại khác candidate, giảm số phiếu: `count--`.
      - Điều này tương đương với "loại bỏ" một cặp phần tử (candidate và nums[i]).

### 3. Trả về kết quả:
- Dòng: `return candidate;`
- Sau khi duyệt hết mảng, candidate là phần tử chiếm đa số.
- Vì bài toán đảm bảo phần tử chiếm đa số tồn tại, ta không cần kiểm tra lại.

## Ví dụ minh họa

### Example 1:
- **Input**: nums = [3,2,3]
- **Output mong muốn**: 3
- **Bước thực hiện**:
  - Khởi tạo:
    - candidate = 3, count = 1.
  - Duyệt mảng:
    - i = 1: nums[1] = 2.
      - 2 !== 3 → count-- → count = 0.
    - i = 2: nums[2] = 3.
      - count === 0 → Chọn candidate = 3, count = 1.
  - Kết quả:
    - candidate = 3.
    - (Giải thích: Phần tử 3 xuất hiện 2 lần, hơn ⌊3/2⌋ = 1, nên là chiếm đa số).

### Example 2:
- **Input**: nums = [2,2,1,1,1,2,2]
- **Output mong muốn**: 2
- **Bước thực hiện**:
  - Khởi tạo:
    - candidate = 2, count = 1.
  - Duyệt mảng:
    - i = 1: nums[1] = 2, 2 === candidate → count++ → count = 2.
    - i = 2: nums[2] = 1, 1 !== candidate → count-- → count = 1.
    - i = 3: nums[3] = 1, 1 !== candidate → count-- → count = 0.
    - i = 4: nums[4] = 1, count === 0 → candidate = 1, count = 1.
    - i = 5: nums[5] = 2, 2 !== candidate → count-- → count = 0.
    - i = 6: nums[6] = 2, count === 0 → candidate = 2, count = 1.
  - Kết quả:
    - candidate = 2.
    - (Giải thích: 2 xuất hiện 4 lần, hơn ⌊7/2⌋ = 3, nên là chiếm đa số).

## Độ phức tạp
- **Thời gian**: O(n), với n là độ dài mảng nums.
  - Duyệt qua mảng đúng một lần, mỗi thao tác (so sánh, tăng/giảm count) là O(1).
- **Không gian**: O(1).
  - Chỉ sử dụng hai biến candidate và count, không phụ thuộc vào kích thước mảng.

## Ưu điểm và nhược điểm

### Ưu điểm:
- **Hiệu quả tối ưu**: Đạt yêu cầu follow-up với O(n) thời gian và O(1) không gian.
- **Đơn giản**: Code ngắn gọn, dễ triển khai.
- **Không cần kiểm tra lại**: Vì bài toán đảm bảo phần tử chiếm đa số tồn tại, không cần đếm lại tần suất.

### Nhược điểm:
- **Không trực quan**: Thuật toán Boyer-Moore dựa trên ý tưởng triệt tiêu, có thể khó hiểu lúc đầu.
- **Giới hạn**: Nếu bài toán không đảm bảo phần tử chiếm đa số tồn tại, cần thêm bước kiểm tra tần suất của candidate.

## Cách trình bày trong phỏng vấn

### Giới thiệu ý tưởng:
"Để tìm phần tử chiếm đa số, tôi sẽ dùng thuật toán Boyer-Moore Voting Algorithm. Vì phần tử chiếm đa số xuất hiện hơn n/2 lần, ta có thể duy trì một ứng viên và đếm phiếu. Nếu phiếu về 0, chọn ứng viên mới. Phần tử cuối cùng sẽ là kết quả."

### Giải thích quy tắc:
"Ý tưởng là 'loại bỏ' các cặp phần tử khác nhau. Vì phần tử chiếm đa số có hơn nửa số lần xuất hiện, nó sẽ luôn 'thắng' sau các lần loại bỏ."

"Ví dụ, với [2,2,1,1,1,2,2]:
- Bắt đầu với candidate = 2, count = 1.
- Gặp 2 → tăng count.
- Gặp 1 → giảm count, v.v.
- Cuối cùng, candidate = 2, vì 2 xuất hiện 4 lần, hơn ⌊7/2⌋ = 3."

### Viết code:
```javascript
var majorityElement = function(nums) {
    let candidate = nums[0];
    let count = 1;
    for (let i = 1; i < nums.length; i++) {
        if (count === 0) {
            candidate = nums[i];
            count = 1;
        } else if (nums[i] === candidate) {
            count++;
        } else {
            count--;
        }
    }
    return candidate;
};
```

### Phân tích độ phức tạp:
"Thời gian là O(n), vì duyệt mảng một lần. Không gian là O(1), vì chỉ dùng hai biến. Đây là giải pháp tối ưu theo yêu cầu follow-up."

## Cách giải khác

Để thể hiện tư duy đa chiều, bạn có thể nhắc đến cách dùng hash map:

### Ý tưởng:
- Dùng hash map để đếm tần suất mỗi phần tử.
- Trả về phần tử có tần suất lớn hơn ⌊n/2⌋.

### Code:
```javascript
var majorityElement = function(nums) {
    const map = new Map();
    const n = nums.length;
    for (let num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
        if (map.get(num) > Math.floor(n / 2)) return num;
    }
    return nums[0]; // Không cần do bài toán đảm bảo tồn tại
};
```

### So sánh:
- **Thời gian**: O(n), vì duyệt mảng một lần.
- **Không gian**: O(n), do hash map lưu tối đa n phần tử.
- **Nhược điểm**: Không đáp ứng yêu cầu O(1) không gian.
- **Khi nào đề cập**: Trình bày như cách đơn giản, trực quan, nhưng nhấn mạnh rằng Boyer-Moore tốt hơn vì O(1) không gian.

## Tóm tắt

- Code JavaScript sử dụng thuật toán Boyer-Moore Voting để tìm phần tử chiếm đa số trong O(n) thời gian và O(1) không gian, đáp ứng yêu cầu follow-up.
- Cách hoạt động dựa trên triệt tiêu cặp phần tử khác nhau, đảm bảo candidate cuối cùng là phần tử chiếm đa số (ví dụ: [2,2,1,1,1,2,2] → 2).
- Trong phỏng vấn, trình bày thuật toán Boyer-Moore, giải thích ý tưởng triệt tiêu, và đề cập cách hash map để thể hiện tư duy đa chiều.
