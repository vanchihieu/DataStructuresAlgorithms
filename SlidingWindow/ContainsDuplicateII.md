# Contains Duplicate II

## Đề bài

**Input:**
- Mảng số nguyên `nums`.
- Số nguyên không âm `k` (khoảng cách tối đa giữa hai chỉ số).

**Output:** Trả về `true` nếu tồn tại hai chỉ số khác nhau `i` và `j` sao cho `nums[i] == nums[j]` và `|i - j| <= k`. Nếu không, trả về `false`.

**Ràng buộc:**
- 1 <= nums.length <= 10^5.
- -10^9 <= nums[i] <= 10^9.
- 0 <= k <= 10^5.

**Yêu cầu:**
- Tìm hai phần tử giống nhau (có giá trị bằng nhau) mà khoảng cách giữa các chỉ số của chúng không vượt quá k.

## Ý tưởng giải pháp

Để giải bài toán này hiệu quả, ta sử dụng **hash map** (bảng băm) để lưu trữ giá trị của phần tử cùng với chỉ số gần nhất của nó. Cách tiếp cận này tận dụng việc duyệt mảng một lần và kiểm tra khoảng cách giữa các chỉ số của các phần tử giống nhau.

### Ý tưởng chính:

1. **Duyệt mảng một lần:**
   - Với mỗi phần tử `nums[i]` tại chỉ số `i`, kiểm tra xem nó đã xuất hiện trước đó chưa bằng cách tra cứu trong hash map.

2. **Sử dụng hash map:**
   - Hash map lưu cặp `{giá trị: chỉ số gần nhất}`.
   - Khi gặp `nums[i]`:
     - Nếu `nums[i]` đã có trong hash map, kiểm tra khoảng cách giữa chỉ số hiện tại `i` và chỉ số lưu trong hash map (`map.get(nums[i])`).
     - Nếu `i - map.get(nums[i]) <= k`, trả về `true` (tìm thấy hai phần tử thỏa mãn).
     - Cập nhật chỉ số của `nums[i]` trong hash map thành `i` (chỉ số mới nhất).
   - Nếu `nums[i]` chưa có, thêm `{nums[i]: i}` vào hash map.

3. **Kết thúc:**
   - Nếu duyệt hết mảng mà không tìm thấy cặp nào thỏa mãn, trả về `false`.

## Code giải pháp bằng JavaScript:

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    // Tạo hash map để lưu {giá trị: chỉ số gần nhất}
    const map = new Map();
    
    // Duyệt qua mảng
    for (let i = 0; i < nums.length; i++) {
        // Nếu nums[i] đã có trong map
        if (map.has(nums[i])) {
            // Kiểm tra khoảng cách giữa chỉ số hiện tại và chỉ số trước đó
            if (i - map.get(nums[i]) <= k) {
                return true; // Tìm thấy cặp thỏa mãn
            }
        }
        // Cập nhật chỉ số của nums[i]
        map.set(nums[i], i);
    }
    
    // Không tìm thấy cặp nào thỏa mãn
    return false;
};
```

## Giải thích chi tiết cách hoạt động của code:

### 1. Khởi tạo:
- **Dòng:** `const map = new Map();`
- Tạo một hash map để lưu trữ các cặp `{giá trị: chỉ số gần nhất}`.
  - **Key:** Giá trị của phần tử (`nums[i]`).
  - **Value:** Chỉ số gần nhất mà giá trị đó xuất hiện.
- Ví dụ: Nếu `nums[2] = 3`, ta lưu `map.set(3, 2)`.

### 2. Duyệt mảng:
- **Vòng lặp:** `for (let i = 0; i < nums.length; i++)`
- Duyệt từng phần tử `nums[i]` tại chỉ số `i`.
- Với mỗi phần tử, thực hiện:
  - **Kiểm tra xem `nums[i]` đã xuất hiện chưa:**
    - Dòng: `if (map.has(nums[i]))`
    - Sử dụng `map.has(nums[i])` để kiểm tra xem `nums[i]` đã có trong hash map chưa.
    - Nếu có, nghĩa là đã gặp giá trị này trước đó tại chỉ số `map.get(nums[i])`.
  - **Kiểm tra khoảng cách:**
    - Dòng: `if (i - map.get(nums[i]) <= k)`
    - Tính khoảng cách giữa chỉ số hiện tại `i` và chỉ số trước đó của cùng giá trị (`map.get(nums[i])`).
    - Nếu `i - map.get(nums[i]) <= k`, hai chỉ số này thỏa mãn điều kiện (`nums[i] == nums[j]` và `|i - j| <= k`).
    - Trả về `true`.
  - **Cập nhật hash map:**
    - Dòng: `map.set(nums[i], i);`
    - Cập nhật chỉ số của `nums[i]` thành `i` (chỉ số mới nhất).
    - Điều này đảm bảo hash map luôn lưu chỉ số gần nhất của giá trị, giúp kiểm tra khoảng cách chính xác.

### 3. Kết thúc:
- **Dòng:** `return false;`
- Nếu duyệt hết mảng mà không tìm thấy cặp nào thỏa mãn, trả về `false`.

## Ví dụ minh họa

### Example 1:
- **Input:** nums = [1,2,3,1], k = 3
- **Output mong muốn:** true
- **Bước thực hiện:**
  - Khởi tạo: map = new Map().
  - Duyệt mảng:
    - i = 0: nums[0] = 1.
      - map.has(1) → false (chưa có).
      - map.set(1, 0) → map = {1: 0}.
    - i = 1: nums[1] = 2.
      - map.has(2) → false.
      - map.set(2, 1) → map = {1: 0, 2: 1}.
    - i = 2: nums[2] = 3.
      - map.has(3) → false.
      - map.set(3, 2) → map = {1: 0, 2: 1, 3: 2}.
    - i = 3: nums[3] = 1.
      - map.has(1) → true (đã có tại map.get(1) = 0).
      - Kiểm tra: i - map.get(1) = 3 - 0 = 3 <= k = 3 → true.
      - Trả về true.
  - Kết quả: true (vì nums[0] = nums[3] = 1, khoảng cách 3 - 0 = 3 <= k).

### Example 2:
- **Input:** nums = [1,0,1,1], k = 1
- **Output mong muốn:** true
- **Bước thực hiện:**
  - Khởi tạo: map = new Map().
  - Duyệt mảng:
    - i = 0: nums[0] = 1, map.set(1, 0) → map = {1: 0}.
    - i = 1: nums[1] = 0, map.set(0, 1) → map = {1: 0, 0: 1}.
    - i = 2: nums[2] = 1.
      - map.has(1) → true, map.get(1) = 0.
      - i - map.get(1) = 2 - 0 = 2 > k = 1 → Không thỏa mãn.
      - map.set(1, 2) → map = {1: 2, 0: 1}.
    - i = 3: nums[3] = 1.
      - map.has(1) → true, map.get(1) = 2.
      - i - map.get(1) = 3 - 2 = 1 <= k = 1 → true.
      - Trả về true.
  - Kết quả: true (vì nums[2] = nums[3] = 1, khoảng cách 3 - 2 = 1 <= k).

### Example 3:
- **Input:** nums = [1,2,3,1,2,3], k = 2
- **Output mong muốn:** false
- **Bước thực hiện:**
  - Khởi tạo: map = new Map().
  - Duyệt mảng:
    - i = 0: nums[0] = 1, map.set(1, 0) → map = {1: 0}.
    - i = 1: nums[1] = 2, map.set(2, 1) → map = {1: 0, 2: 1}.
    - i = 2: nums[2] = 3, map.set(3, 2) → map = {1: 0, 2: 1, 3: 2}.
    - i = 3: nums[3] = 1.
      - map.has(1) → true, map.get(1) = 0.
      - 3 - 0 = 3 > k = 2 → Không thỏa mãn.
      - map.set(1, 3) → map = {1: 3, 2: 1, 3: 2}.
    - i = 4: nums[4] = 2.
      - map.has(2) → true, map.get(2) = 1.
      - 4 - 1 = 3 > k = 2 → Không thỏa mãn.
      - map.set(2, 4) → map = {1: 3, 2: 4, 3: 2}.
    - i = 5: nums[5] = 3.
      - map.has(3) → true, map.get(3) = 2.
      - 5 - 2 = 3 > k = 2 → Không thỏa mãn.
      - map.set(3, 5) → map = {1: 3, 2: 4, 3: 5}.
  - Kết quả: false (không có cặp nào thỏa mãn |i - j| <= k).

## Độ phức tạp

- **Thời gian:** O(n), với n là độ dài mảng nums.
  - Duyệt mảng một lần, mỗi thao tác (tra cứu, cập nhật hash map) là O(1) trung bình.
- **Không gian:** O(n).
  - Hash map lưu tối đa n cặp {giá trị: chỉ số} trong trường hợp tất cả phần tử khác nhau.

## Ưu điểm và nhược điểm

### Ưu điểm:
- **Hiệu quả:** O(n) thời gian, phù hợp với ràng buộc n <= 10^5.
- **Đơn giản:** Logic rõ ràng, dễ triển khai với hash map.
- **Xử lý mọi trường hợp:** Bao gồm k=0, mảng một phần tử, hoặc giá trị âm.

### Nhược điểm:
- **Không gian O(n):** Hash map có thể tốn bộ nhớ nếu mảng lớn.
- **Không đạt O(1) không gian**, nhưng đây là cách tối ưu nhất về thời gian.

## Cách tiếp cận khác: Sliding Window với Hash Set

Để thể hiện tư duy đa chiều, bạn có thể sử dụng phương pháp Sliding Window với Hash Set:

### Ý tưởng:
- Duy trì một cửa sổ kích thước k (hoặc nhỏ hơn) bằng hash set.
- Với mỗi chỉ số i, thêm nums[i] vào set. Nếu nums[i] đã có trong set, trả về true.
- Xóa phần tử ngoài cửa sổ (nums[i-k-1]) để giữ kích thước cửa sổ.

### Code:
```javascript
var containsNearbyDuplicate = function(nums, k) {
    const set = new Set();
    for (let i = 0; i < nums.length; i++) {
        if (set.has(nums[i])) return true;
        set.add(nums[i]);
        if (set.size > k) set.delete(nums[i - k]);
    }
    return false;
};
```

### Đánh giá:
- **Độ phức tạp:**
  - Thời gian: O(n).
  - Không gian: O(min(n, k)), vì set lưu tối đa k+1 phần tử.
- **Ưu điểm:** Tốn ít không gian hơn hash map nếu k nhỏ.
- **Nhược điểm:** Logic hơi phức tạp hơn khi quản lý cửa sổ.
- **Khi nào đề cập:** Nếu muốn thể hiện cách tối ưu không gian khi k nhỏ.

## Cách trình bày trong phỏng vấn

### Giới thiệu ý tưởng:
"Để kiểm tra xem có hai phần tử giống nhau với khoảng cách chỉ số không quá k, tôi sẽ dùng hash map để lưu chỉ số gần nhất của mỗi giá trị. Khi gặp một giá trị đã có, tôi kiểm tra khoảng cách chỉ số. Cách này đạt O(n) thời gian."

### Giải thích quy tắc:
"Ví dụ, với [1,2,3,1], k=3:
- Tại i=0, lưu 1:0.
- Tại i=3, thấy 1 đã có tại chỉ số 0, khoảng cách 3-0=3 <= k, trả về true."

### Viết code:
```javascript
var containsNearbyDuplicate = function(nums, k) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            if (i - map.get(nums[i]) <= k) {
                return true;
            }
        }
        map.set(nums[i], i);
    }
    return false;
};
```

### Phân tích độ phức tạp:
"Thời gian là O(n), vì duyệt mảng một lần, thao tác hash map là O(1) trung bình. Không gian là O(n) do hash map lưu tối đa n phần tử."

### Thảo luận cách khác:
"Tôi cũng cân nhắc dùng sliding window với hash set, giữ cửa sổ kích thước k. Cách này tốn O(min(n, k)) không gian, tốt hơn nếu k nhỏ, nhưng logic phức tạp hơn."

## Tóm tắt

- Code JavaScript sử dụng hash map để kiểm tra xem có hai phần tử giống nhau với khoảng cách chỉ số không quá k, đạt O(n) thời gian và O(n) không gian (ví dụ: [1,2,3,1], k=3 → true).
- Cách này hiệu quả, dễ hiểu, và phù hợp với ràng buộc bài toán.
- Cách tiếp cận sliding window với hash set là một phương pháp thay thế tốt, đặc biệt khi k nhỏ.