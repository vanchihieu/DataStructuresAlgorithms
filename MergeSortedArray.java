public class MergeSortedArray {
    /*
        - Ý tưởng giải bài toán
        1. Bắt đầu từ cuối của mảng nums1 (phần tử hợp nhất cuối cùng).
        2. So sánh các phần tử từ cuối của nums1 và nums2.
        3. Chèn phần tử lớn hơn vào cuối nums1.
        4. Tiếp tục giảm chỉ số và lặp lại quá trình đến khi duyệt hết các phần tử.
     */
    public static void merge(int[] a, int m, int[] b, int n) {
        int i = m - 1;
        int j = n - 1;
        int k = m + n - 1;

        while (i >= 0 || j >= 0) {
            if (i >= 0 && j >= 0) {
                if (a[i] >= b[j]) {
                    a[k--] = a[i--];
                } else {
                    a[k--] = b[j--];
                }
            } else if (i >= 0) {
                a[k--] = a[i--];
            } else {
                a[k--] = b[j--];
            }
        }
    }

    public static void main(String[] args) {
        int[] a = {1, 2, 3, 4, 0, 0, 0, 0};
        int m = 4;
        int[] b = {2, 5, 6, 9};
        int n = 4;
        merge(a, m, b, n);
        for (int i = 0; i < a.length; i++) {
            System.out.print(a[i] + " ");
        }
    }
}
