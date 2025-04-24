# Sáp Nhập Hai Mảng Đã Sắp Xếp

## Mô Tả Bài Toán

Cho hai mảng đã sắp xếp `nums1` và `nums2`, sáp nhập `nums2` vào `nums1` để tạo thành một mảng đã sắp xếp.

Số lượng phần tử ban đầu trong `nums1` và `nums2` lần lượt là `m` và `n`. Bạn có thể giả định rằng `nums1` có kích thước bằng `m + n` để có đủ không gian chứa các phần tử bổ sung từ `nums2`.

## Ý Tưởng Giải Pháp

Vì cả hai mảng đã được sắp xếp, ta có thể sử dụng phương pháp hợp nhất từ cuối về đầu (merge from the end) để tránh việc phải dịch chuyển phần tử trong `nums1`.

- Thay vì bắt đầu từ đầu mảng và phải chèn phần tử (gây tốn thời gian), ta bắt đầu từ cuối mảng `nums1` (vị trí `m + n - 1`) và điền các phần tử lớn nhất vào đó.
- So sánh phần tử lớn nhất của `nums1` (tại vị trí `m-1`) và `nums2` (tại vị trí `n-1`), chọn phần tử lớn hơn để đặt vào vị trí cuối của `nums1`, sau đó giảm chỉ số tương ứng.
- Lặp lại cho đến khi một trong hai mảng hết phần tử, sau đó điền nốt phần tử còn lại (nếu có).

## Cách Thực Hiện Chi Tiết

1. **Khởi tạo các con trỏ**:

   - `p1 = m - 1`: Chỉ số của phần tử cuối cùng hợp lệ trong `nums1` (phần tử cần hợp nhất).
   - `p2 = n - 1`: Chỉ số của phần tử cuối cùng trong `nums2`.
   - `p = m + n - 1`: Chỉ số của vị trí cuối cùng trong `nums1`, nơi ta sẽ điền các phần tử đã hợp nhất.

2. **Vòng lặp chính** (`while (p1 >= 0 && p2 >= 0)`):

   - Khi cả hai mảng còn phần tử hợp lệ (`p1 >= 0` và `p2 >= 0`), ta so sánh:
     - Nếu `nums1[p1] > nums2[p2]`:
       - Đặt `nums1[p] = nums1[p1]` (phần tử lớn hơn từ `nums1`).
       - Giảm `p1` để chuyển sang phần tử tiếp theo của `nums1`.
     - Ngược lại (nếu `nums1[p1] <= nums2[p2]`):
       - Đặt `nums1[p] = nums2[p2]` (phần tử lớn hơn từ `nums2`).
       - Giảm `p2` để chuyển sang phần tử tiếp theo của `nums2`.
     - Sau mỗi lần điền, giảm `p` để chuyển sang vị trí tiếp theo trong `nums1`.

3. **Xử lý phần còn lại của `nums2`** (`while (p2 >= 0)`):
   - Nếu `nums1` đã hết phần tử (`p1 < 0`) nhưng `nums2` vẫn còn phần tử, ta chỉ cần sao chép các phần tử còn lại của `nums2` vào `nums1`.
   - Lưu ý: Không cần xử lý phần còn lại của `nums1` vì các phần tử của `nums1` đã nằm đúng vị trí trong mảng (nếu `p2 < 0` trước).

## Phân Tích Độ Phức Tạp

- **Độ phức tạp thời gian**: O(m + n) - Chúng ta duyệt qua tất cả các phần tử của `nums1` và `nums2` chỉ một lần.
- **Độ phức tạp không gian**: O(1) - Ta chỉ sử dụng các con trỏ và không cần mảng phụ.

## Ví Dụ Minh Họa

```
Đầu vào:
nums1 = [1, 2, 3, 0, 0, 0], m = 3
nums2 = [2, 5, 6], n = 3

Các bước thực hiện:
1. Khởi tạo: p1 = 2 (chỉ số của 3 trong nums1), p2 = 2 (chỉ số của 6 trong nums2), p = 5 (chỉ số cuối của nums1).

2. So sánh: nums1[2] = 3 vs nums2[2] = 6 → 6 > 3
   - Điền nums1[5] = 6
   - Giảm p2 = 1, p = 4
   - nums1 = [1, 2, 3, 0, 0, 6]

3. So sánh: nums1[2] = 3 vs nums2[1] = 5 → 5 > 3
   - Điền nums1[4] = 5
   - Giảm p2 = 0, p = 3
   - nums1 = [1, 2, 3, 0, 5, 6]

4. So sánh: nums1[2] = 3 vs nums2[0] = 2 → 3 > 2
   - Điền nums1[3] = 3
   - Giảm p1 = 1, p = 2
   - nums1 = [1, 2, 3, 3, 5, 6]

5. So sánh: nums1[1] = 2 vs nums2[0] = 2 → bằng nhau
   - Điền nums1[2] = 2
   - Giảm p2 = -1, p = 1
   - nums1 = [1, 2, 2, 3, 5, 6]

6. p2 < 0, dừng vòng lặp chính.
   - Sao chép các phần tử còn lại của nums1 (nếu có), nhưng ở đây p1 = 1 và các phần tử 1, 2 đã đúng vị trí.

Đầu ra:
nums1 = [1, 2, 2, 3, 5, 6]
```
