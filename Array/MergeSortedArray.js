/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  // Khởi tạo các con trỏ
  let p1 = m - 1; // Chỉ số cuối của phần tử hợp lệ trong nums1
  let p2 = n - 1; // Chỉ số cuối của nums2
  let p = m + n - 1; // Chỉ số cuối của nums1 (vị trí để điền)

  // Khi cả hai mảng còn phần tử
  while (p1 >= 0 && p2 >= 0) {
    if (nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1]; // Điền phần tử lớn hơn từ nums1
      p1--; // Giảm chỉ số nums1
    } else {
      nums1[p] = nums2[p2]; // Điền phần tử lớn hơn từ nums2
      p2--; // Giảm chỉ số nums2
    }
    p--; // Giảm chỉ số vị trí điền
  }

  // Nếu nums2 còn phần tử, điền hết vào nums1
  while (p2 >= 0) {
    nums1[p] = nums2[p2];
    p2--;
    p--;
  }
};

// Ví dụ sử dụng
let nums1 = [1, 2, 3, 0, 0, 0];
let m = 3;
let nums2 = [2, 5, 6];
let n = 3;
merge(nums1, m, nums2, n);
console.log(nums1); // Kết quả: [1, 2, 2, 3, 5, 6]

