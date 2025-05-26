# Kỹ thuật Sliding Window

## 1. Sliding Window là gì?

Sliding Window (Cửa sổ trượt) là một kỹ thuật thuật toán sử dụng một "cửa sổ" (một đoạn liên tiếp của mảng hoặc chuỗi) để duyệt qua dữ liệu đầu vào. Cửa sổ này di chuyển qua mảng/chuỗi, và tại mỗi bước, ta chỉ xử lý các phần tử trong cửa sổ thay vì toàn bộ dữ liệu. Mục tiêu là tìm hoặc tối ưu một đoạn con (subarray/substring) thỏa mãn một điều kiện cụ thể.

### Cách hoạt động cơ bản:

- **Cửa sổ**: Là một đoạn liên tiếp của mảng/chuỗi, được xác định bởi hai chỉ số:
  - `left`: Chỉ số bắt đầu của cửa sổ.
  - `right`: Chỉ số kết thúc của cửa sổ.
- **Di chuyển cửa sổ**:
  - **Mở rộng**: Tăng `right` để thêm phần tử mới vào cửa sổ.
  - **Thu hẹp**: Tăng `left` để loại bỏ phần tử cũ khỏi cửa sổ.
- **Mục tiêu**: Tìm đoạn con thỏa mãn điều kiện (ví dụ: tổng lớn nhất, độ dài nhỏ nhất, không có phần tử lặp, v.v.).
- **Tối ưu hóa**: Thay vì kiểm tra tất cả các đoạn con (O(n²)), Sliding Window chỉ cập nhật thông tin khi cửa sổ di chuyển, đạt O(n) hoặc O(n log n).

### Hai loại Sliding Window:

1. **Fixed Size Window (Cửa sổ kích thước cố định)**:
   - Cửa sổ có độ dài cố định (ví dụ: k phần tử).
   - Di chuyển cửa sổ bằng cách tăng cả `left` và `right` cùng lúc để giữ kích thước.
   - Ví dụ: Tìm đoạn con độ dài k có tổng lớn nhất.

2. **Variable Size Window (Cửa sổ kích thước thay đổi)**:
   - Kích thước cửa sổ thay đổi tùy theo điều kiện bài toán.
   - Mở rộng bằng cách tăng `right`, thu hẹp bằng cách tăng `left` khi cửa sổ không thỏa mãn điều kiện.
   - Ví dụ: Tìm đoạn con ngắn nhất có tổng lớn hơn hoặc bằng một giá trị.

## 2. Khi nào sử dụng Sliding Window?

Sliding Window được sử dụng khi bài toán có các đặc điểm sau:

- **Dữ liệu đầu vào là mảng hoặc chuỗi**: Bài toán liên quan đến các đoạn con liên tiếp (subarray/substring).
- **Yêu cầu tìm đoạn con thỏa mãn điều kiện**: Điều kiện có thể liên quan đến tổng, số lượng phần tử, tần suất, hoặc tính chất đặc biệt (như không lặp, chứa ký tự cụ thể).
- **Cần tối ưu hóa từ brute force**: Cách tiếp cận kiểm tra tất cả đoạn con (O(n²)) quá chậm, cần giảm xuống O(n).
- **Tính chất cộng gộp**: Kết quả của cửa sổ có thể được cập nhật nhanh chóng khi thêm/xóa phần tử (ví dụ: tổng, tần suất).

### Các tình huống cụ thể:

- **Fixed Size Window**:
  - Khi bài toán yêu cầu đoạn con có độ dài cố định hoặc khoảng cách cố định.
  - Ví dụ: Tìm đoạn con độ dài k có trung bình lớn nhất, hoặc kiểm tra trùng lặp trong khoảng cách k.

- **Variable Size Window**:
  - Khi cần tìm đoạn con dài nhất/ngắn nhất thỏa mãn điều kiện (như tổng, số ký tự khác nhau, v.v.).
  - Ví dụ: Tìm chuỗi con dài nhất không có ký tự lặp, hoặc đoạn con ngắn nhất có tổng >= target.

## 3. Cách nhận biết bài toán Sliding Window

Để nhận biết bài toán phù hợp với Sliding Window, hãy chú ý các dấu hiệu sau trong đề bài:

### Từ khóa và mô tả:

- **Từ khóa**: "subarray", "substring", "consecutive", "maximum/minimum", "at most", "at least", "within k", "length k".
- **Mô tả**:
  - Tìm đoạn con liên tiếp thỏa mãn một điều kiện (tổng, số phần tử, không lặp, v.v.).
  - Xác định độ dài hoặc giá trị tối ưu của đoạn con (lớn nhất, nhỏ nhất).
  - Có ràng buộc về khoảng cách hoặc kích thước (như k bước, độ dài cố định).

### Điều kiện toán học:

- **Tổng hoặc tần suất**:
  - Tìm đoạn con có tổng lớn hơn, nhỏ hơn hoặc bằng một giá trị.
  - Ví dụ: "Tìm đoạn con có tổng lớn hơn hoặc bằng S."
- **Số lượng phần tử**:
  - Đếm số đoạn con thỏa mãn hoặc tìm đoạn con có đúng/số lượng phần tử cụ thể.
  - Ví dụ: "Tìm chuỗi con chứa tất cả ký tự của chuỗi T."
- **Khoảng cách**:
  - Yêu cầu hai phần tử cách nhau không quá k.
  - Ví dụ: "Tìm hai phần tử trùng lặp với |i - j| ≤ k."

### Ràng buộc:

- **Ràng buộc lớn**:
  - n ≤ 10^5 hoặc n ≤ 10^6: Cách brute force O(n²) không khả thi, cần O(n).
  - k lớn (như k ≤ 10^5): Gợi ý dùng cửa sổ để giới hạn phạm vi kiểm tra.

## 4. Minh họa với ví dụ cụ thể

Để làm rõ cách nhận diện và sử dụng Sliding Window, tôi sẽ lấy hai bài toán LeetCode làm ví dụ: một bài Fixed Size Window và một bài Variable Size Window.

### Ví dụ 1: Fixed Size Window - LeetCode 219 (Contains Duplicate II)

- **Bài toán**: Kiểm tra xem có hai chỉ số i, j sao cho nums[i] == nums[j] và |i - j| ≤ k.
- **Nhận diện**:
  - Từ khóa: "within k", "duplicate".
  - Yêu cầu: Tìm cặp phần tử giống nhau trong khoảng cách k.
  - Cửa sổ: Fixed size (kích thước tối đa k+1).

- **Code JavaScript**:

```javascript
var containsNearbyDuplicate = function(nums, k) {
    const set = new Set();
    for (let i = 0; i < nums.length; i++) {
        if (set.has(nums[i])) return true; // Tìm thấy trùng lặp trong cửa sổ
        set.add(nums[i]); // Thêm vào cửa sổ
        if (set.size > k) set.delete(nums[i - k]); // Thu hẹp cửa sổ
    }
    return false;
};
```

- **Giải thích**:
  - Cửa sổ: Hash set lưu các phần tử trong khoảng từ i-k đến i.
  - Di chuyển: Thêm nums[i], xóa nums[i-k] nếu cửa sổ lớn hơn k.
  - Kiểm tra: Nếu nums[i] đã có trong set, trả về true.
- **Độ phức tạp**:
  - Thời gian: O(n).
  - Không gian: O(min(n, k)).

### Ví dụ 2: Variable Size Window - LeetCode 3 (Longest Substring Without Repeating Characters)

- **Bài toán**: Tìm chuỗi con dài nhất không có ký tự lặp lại.
- **Nhận diện**:
  - Từ khóa: "substring", "without repeating", "longest".
  - Yêu cầu: Tìm đoạn con dài nhất thỏa mãn điều kiện không lặp.
  - Cửa sổ: Variable size (thu hẹp khi gặp ký tự lặp).

- **Code JavaScript**:

```javascript
var lengthOfLongestSubstring = function(s) {
    const map = new Map(); // Lưu {ký tự: chỉ số gần nhất}
    let left = 0, maxLength = 0;
    for (let right = 0; right < s.length; right++) {
        if (map.has(s[right]) && map.get(s[right]) >= left) {
            // Ký tự lặp, thu hẹp cửa sổ
            left = map.get(s[right]) + 1;
        }
        map.set(s[right], right); // Cập nhật chỉ số
        maxLength = Math.max(maxLength, right - left + 1); // Cập nhật độ dài
    }
    return maxLength;
};
```

- **Giải thích**:
  - Cửa sổ: Từ left đến right, không chứa ký tự lặp.
  - Mở rộng: Tăng right, thêm ký tự s[right].
  - Thu hẹp: Nếu s[right] lặp và nằm trong cửa sổ, di chuyển left đến sau vị trí lặp.
  - Kết quả: Theo dõi độ dài cửa sổ tối đa (right - left + 1).
- **Độ phức tạp**:
  - Thời gian: O(n).
  - Không gian: O(min(n, m)), với m là kích thước bảng chữ cái.

## 5. Khi nào KHÔNG sử dụng Sliding Window?

- **Dữ liệu không liên tiếp**: Nếu bài toán yêu cầu đoạn con không cần liên tiếp (ví dụ: chọn các phần tử bất kỳ), Sliding Window không phù hợp (dùng DP hoặc backtracking).
- **Cấu trúc phức tạp**: Với cây, đồ thị, hoặc ma trận, Sliding Window ít được dùng (trừ trường hợp đặc biệt như ma trận 1D hóa).
- **Không có tính chất cộng gộp**: Nếu không thể cập nhật thông tin cửa sổ nhanh chóng (như tính tổng, tần suất), Sliding Window không hiệu quả.

## 6. Mẹo nhận biết và giải bài Sliding Window

- **Đọc đề bài cẩn thận**:
  - Tìm từ khóa như "subarray", "substring", "within k".
  - Xác định cửa sổ cố định (có k cụ thể) hay thay đổi (tìm max/min).
- **Phân tích điều kiện**:
  - Điều kiện là gì? (Tổng, không lặp, số phần tử).
  - Có thể cập nhật khi thêm/xóa phần tử không? (Dùng biến, hash map/set).
- **Triển khai**:
  - Fixed Size: Duy trì cửa sổ độ dài k, di chuyển đồng bộ left và right.
  - Variable Size: Mở rộng đến khi thỏa mãn, thu hẹp khi vi phạm, ghi nhận kết quả.
- **Cấu trúc dữ liệu hỗ trợ**:
  - Hash map/set: Theo dõi tần suất hoặc sự xuất hiện.
  - Biến: Lưu tổng, độ dài, hoặc giá trị tối ưu.
- **Xử lý trường hợp đặc biệt**:
  - Mảng/chuỗi rỗng, k=0, điều kiện không khả thi.

## 7. Cách trình bày trong phỏng vấn

Khi giải bài Sliding Window trong phỏng vấn, bạn có thể làm như sau:

- **Nhận diện kỹ thuật**:
  - "Bài toán yêu cầu tìm đoạn con liên tiếp thỏa mãn điều kiện, nên tôi sẽ dùng Sliding Window để duyệt hiệu quả với O(n) thời gian."
- **Xác định loại cửa sổ**:
  - "Vì bài toán có khoảng cách tối đa k, tôi sẽ dùng cửa sổ kích thước cố định k+1" hoặc "Vì cần tìm đoạn con dài nhất/ngắn nhất, tôi sẽ dùng cửa sổ kích thước thay đổi."
- **Giải thích logic**:
  - "Tôi sẽ duy trì một cửa sổ từ left đến right. Khi thêm phần tử mới, tôi kiểm tra điều kiện. Nếu cửa sổ không thỏa mãn, tôi thu hẹp bằng cách tăng left."
- **Viết code**:
  - Viết code rõ ràng, chú thích các bước (mở rộng, thu hẹp, cập nhật).
  - Ví dụ cho Contains Duplicate II:

```javascript
var containsNearbyDuplicate = function(nums, k) {
    const set = new Set(); // Cửa sổ lưu phần tử
    for (let i = 0; i < nums.length; i++) {
        if (set.has(nums[i])) return true; // Trùng lặp trong cửa sổ
        set.add(nums[i]); // Mở rộng cửa sổ
        if (set.size > k) set.delete(nums[i - k]); // Thu hẹp cửa sổ
    }
    return false;
};
```

- **Phân tích độ phức tạp**:
  - "Thời gian là O(n), vì duyệt mảng một lần. Không gian là O(min(n, k)) do set lưu tối đa k+1 phần tử."
- **Thảo luận cách khác**:
  - "Cách brute force kiểm tra mọi cặp tốn O(n²). Hash map toàn cục tốn O(n) không gian nhưng đơn giản hơn. Sliding Window với set tối ưu khi k nhỏ."

## 8. Các bài toán Sliding Window phổ biến trên LeetCode

### Fixed Size Window:
- **LeetCode 643** - Maximum Average Subarray I: Tìm đoạn con độ dài k có trung bình lớn nhất.
- **LeetCode 1456** - Maximum Number of Vowels in a Substring: Tìm số nguyên âm tối đa trong chuỗi con độ dài k.

### Variable Size Window:
- **LeetCode 3** - Longest Substring Without Repeating Characters: Tìm chuỗi con dài nhất không lặp.
- **LeetCode 76** - Minimum Window Substring: Tìm chuỗi con nhỏ nhất chứa tất cả ký tự của chuỗi khác.
- **LeetCode 209** - Minimum Size Subarray Sum: Tìm đoạn con ngắn nhất có tổng >= target.

## 9. Tóm tắt

- **Sliding Window** là kỹ thuật dùng cửa sổ di chuyển để tìm đoạn con thỏa mãn điều kiện, tối ưu từ O(n²) xuống O(n).
- **Khi sử dụng**: Bài toán liên quan đến subarray/substring, có điều kiện về tổng, tần suất, hoặc khoảng cách, và cần tối ưu thời gian.
- **Nhận biết**: Tìm từ khóa "subarray", "substring", "within k", "maximum/minimum", hoặc điều kiện về đoạn con liên tiếp.
- **Loại cửa sổ**: Fixed Size (độ dài cố định) hoặc Variable Size (tùy điều kiện).
- **Ví dụ**: Contains Duplicate II dùng Fixed Size Window với hash set để tìm trùng lặp trong khoảng k.