public class RemoveDuplicatesFromSortedArrayII {
    public static int removeDuplicates(int[] nums) {
       int n = nums.length;
       int current = 2;
       int previous = 1;

       while(current < n){
           if(nums[current] == nums[previous] && nums[current] == nums[previous - 1]){
               ++current;
           } else {
               ++previous;
               nums[previous] = nums[current];
               current++;
           }
       }

       return previous + 1;
    }

    public static void main(String[] args) {
        int[] nums = {0,0,1,1,1,1,2,3,3}; // 0 0 1 1 2 3 3
        System.out.println(removeDuplicates(nums));
    }

}
