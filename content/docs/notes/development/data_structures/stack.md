---
Title: Stack
---

In Java, `Stack` is a class that extends `Vector` and implements a standard **Last In First Out (LIFO)** stack data
structure. It inherits the synchronization properties of `Vector`, making it thread-safe but with similar performance
drawbacks due to synchronization overhead.

# Advantages

1. **LIFO Behavior**: The stack operates with a Last In First Out order, which is useful in many algorithms and
   processes, such as parsing expressions, backtracking, or implementing recursive algorithms iteratively.
2. **Thread-Safe**: Since `Stack` extends `Vector`, it is synchronized, making it thread-safe by default. This can be
   useful when multiple threads need to share the same stack.
3. **Easy-to-Use API**: `Stack` provides simple methods like `push()`, `pop()`, `peek()`, which directly support typical
   stack operations.

# Disadvantages

1. **Performance Overhead**: Since `Stack` inherits from `Vector`, it inherits its synchronized nature, which can lead
   to performance issues when synchronization is not required. This makes it slower compared to modern, non-synchronized
   alternatives like `ArrayDeque`.
2. **Legacy Class**: `Stack` is considered a legacy class, and modern alternatives such as `ArrayDeque` or `LinkedList`
   are preferred for stack operations in non-threaded applications due to better performance and flexibility.
3. **Unnecessary Synchronization**: If the stack is only used by one thread, the inherent synchronization is unnecessary
   and can degrade performance.

# Comparison with Deque (ArrayDeque or LinkedList)
In modern Java development, Deque (like ArrayDeque or LinkedList) is preferred for stack implementations. Here’s why:

- Non-Synchronized: Deque is not synchronized by default, leading to better performance in non-concurrent scenarios.
- More Flexibility: Deque can be used as both a stack and a queue, providing greater flexibility.
- Better Performance: ArrayDeque in particular offers O(1) performance for push, pop, and peek operations without synchronization overhead.

# Time and Space Complexity

| Operation             | Time Complexity | Space Complexity | Description                                                     |
|-----------------------|-----------------|------------------|-----------------------------------------------------------------|
| **push (insert)**     | O(1)            | O(n)             | Inserting an element at the top of the stack is constant time.  |
| **pop (remove)**      | O(1)            | O(n)             | Removing an element from the top of the stack is constant time. |
| **peek (access top)** | O(1)            | O(1)             | Accessing the top element without removing it is constant time. |
| **search (search)**   | O(n)            | O(1)             | Searching for an element requires scanning the stack.           |
| **Iteration**         | O(n)            | O(1)             | Iterating through the stack takes linear time.                  |

# Examples

1. **Initialization and Pushing Elements**:
    - Time Complexity: O(1) for each push
   ```java
   // Initialize a Stack
   Stack<Integer> stack = new Stack<>();
   
   // Push elements onto the stack
   stack.push(1);   // [1]
   stack.push(2);   // [1, 2]
   stack.push(3);   // [1, 2, 3]
   ```

2. **Accessing the Top Element (peek)**:
    - Time Complexity: O(1)
   ```java
   int topElement = stack.peek();  // Returns 3, the element at the top
   ```

3. **Popping an Element**:
    - Time Complexity: O(1)
   ```java
   int poppedElement = stack.pop();  // Removes and returns 3, stack becomes [1, 2]
   ```

4. **Searching for an Element**:
    - Time Complexity: O(n)
   ```java
   int position = stack.search(2);  // Returns the 1-based position of the element (2nd from top)
   ```

5. **Checking if the Stack is Empty**:
    - Time Complexity: O(1)
   ```java
   boolean isEmpty = stack.isEmpty();  // Returns false if the stack has elements
   ```

6. **Iterating Over the Stack**:
    - Time Complexity: O(n)
   ```java
   // Iterating through the stack (from bottom to top)
   for (Integer item : stack) {
       System.out.println(item);
   }
   ```

7. **Thread-Safe Access**:
    - Time Complexity: O(1) for push and pop operations
   ```java
   // Stack is thread-safe for concurrent use
   synchronized (stack) {
       stack.push(5);
       int value = stack.pop();
   }
   ```

8. **Reversing a String Using Stack**:
   ```java
   public class StringReverser {
       public static String reverse(String str) {
           Stack<Character> stack = new Stack<>();
           
           // Push all characters onto the stack
           for (char c : str.toCharArray()) {
               stack.push(c);
           }
           
           // Pop all characters from the stack and append to result
           StringBuilder reversed = new StringBuilder();
           while (!stack.isEmpty()) {
               reversed.append(stack.pop());
           }
           return reversed.toString();
       }

       public static void main(String[] args) {
           String result = reverse("hello");
           System.out.println(result);  // Output: "olleh"
       }
   }
   ```

9. **Balanced Parentheses Checker Using Stack**:
   ```java
   public class ParenthesesChecker {
       public static boolean isBalanced(String expression) {
           Stack<Character> stack = new Stack<>();
           
           for (char c : expression.toCharArray()) {
               if (c == '(' || c == '{' || c == '[') {
                   stack.push(c);
               } else if (c == ')' || c == '}' || c == ']') {
                   if (stack.isEmpty()) {
                       return false;
                   }
                   char top = stack.pop();
                   if ((c == ')' && top != '(') ||
                       (c == '}' && top != '{') ||
                       (c == ']' && top != '[')) {
                       return false;
                   }
               }
           }
           return stack.isEmpty();
       }

       public static void main(String[] args) {
           String expression = "{[()]}";
           System.out.println(isBalanced(expression));  // Output: true
       }
   }
   ```

# Conclusion:

- `Stack` in Java provides a thread-safe, synchronized implementation of a LIFO (Last In, First Out) data structure. It
  is simple to use and provides convenient methods for typical stack operations such as `push`, `pop`, and `peek`.
- **Advantages**: It is thread-safe, easy to use, and provides fast access for stack-related operations.
- **Disadvantages**: `Stack` is a legacy class, and the synchronized methods introduce unnecessary overhead in
  single-threaded contexts. Modern alternatives such as `ArrayDeque` or `LinkedList` (when used as a stack) are usually
  preferred due to better performance in non-threaded environments.