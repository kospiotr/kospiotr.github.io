---
Title: LinkedList
---

In Java, `LinkedList` is a part of the Java Collections Framework and implements both the `List` and `Deque` interfaces.
It is a doubly-linked list, where each element (node) contains references to both the next and previous nodes. This
structure makes it well-suited for scenarios where you frequently insert or delete elements from the beginning or middle
of the list.

`LinkedList` in Java is ideal for scenarios where frequent insertions and deletions are needed, especially at the start
or middle of the list. It provides O(1) insertion and deletion for these operations, unlike `ArrayList` which requires
O(n) due to shifting. However, it sacrifices performance when it comes to random access and searching since these
operations take O(n) due to the need for traversal.

If you need fast access by index or are working with a large dataset where random access is important, `ArrayList` may
be a better choice. On the other hand, if your use case involves many insertions or deletions and sequential
access, `LinkedList` is a better fit.

# Advantages

1. **Efficient Insertions/Deletions**: Insertions and deletions at the beginning or in the middle of the list are more
   efficient (O(1)) compared to `ArrayList`, which requires shifting elements (O(n)).
2. **No Resizing Cost**: Unlike `ArrayList`, a `LinkedList` doesn’t need to resize itself since its elements are linked
   using pointers, allowing dynamic growth without reallocation.
3. **Flexibility**: It can act as both a `List` and a `Deque` (double-ended queue), making it suitable for implementing
   stacks, queues, or deques.
4. **Bi-Directional Navigation**: Since it's a doubly linked list, it allows traversing in both forward and backward
   directions efficiently.

# Disadvantages

1. **Memory Overhead**: Each node in a `LinkedList` stores a reference to both the next and previous nodes, consuming
   more memory compared to `ArrayList`, which uses a contiguous block of memory.
2. **Slow Random Access**: Unlike `ArrayList`, accessing an element by index takes O(n) time because you need to
   traverse the list from the beginning or end to the desired index.
3. **Less Cache-Friendly**: Elements in a `LinkedList` are scattered across memory rather than being stored contiguously
   like in an array, so it does not benefit from CPU cache locality as `ArrayList` does.

# Time and Space Complexity

| Operation             | Time Complexity | Space Complexity | Description                                                                     |
|-----------------------|-----------------|------------------|---------------------------------------------------------------------------------|
| **Access (get/set)**  | O(n)            | O(1)             | Accessing elements by index takes O(n) because traversal is needed.             |
| **Search**            | O(n)            | O(1)             | Linear search is O(n) as you may need to traverse the entire list.              |
| **Insertion (add)**   | O(1)            | O(1)             | Insertion at the start or end is O(1); insertion at an arbitrary index is O(n). |
| **Deletion (remove)** | O(1)            | O(1)             | Removing the first or last element is O(1); removing by index is O(n).          |
| **Iteration**         | O(n)            | O(1)             | Iterating over all elements takes linear time.                                  |
| **Memory Overhead**   | -               | O(n)             | Due to extra references (previous/next pointers) in each node.                  |

# Examples

1. **Initialization and Adding Elements**:
    - Time Complexity: O(1) (for adding to the start/end)
   ```java
   // Initialize a LinkedList
   LinkedList<Integer> list = new LinkedList<>();
   
   // Add elements to the list
   list.add(1);  // [1]
   list.add(2);  // [1, 2]
   list.addFirst(0);  // [0, 1, 2]
   list.addLast(3);  // [0, 1, 2, 3]
   ```

2. **Accessing Elements by Index**:
    - Time Complexity: O(n)
   ```java
   // Access an element by index (traverses the list)
   int element = list.get(2);  // Returns 2 (the element at index 2)
   ```

3. **Inserting at a Specific Index**:
    - Time Complexity: O(n) (due to traversal)
   ```java
   // Insert element at index 1
   list.add(1, 10);  // [0, 10, 1, 2, 3]
   ```

4. **Removing an Element**:
    - Time Complexity: O(1) for removing the first/last element, O(n) for removing by index
   ```java
   // Remove the first element
   list.removeFirst();  // [10, 1, 2, 3]
   
   // Remove an element by index
   list.remove(1);  // [10, 2, 3] (removes element at index 1)
   ```

5. **Iterating Over a LinkedList**:
    - Time Complexity: O(n)
   ```java
   // Iterate over the LinkedList
   for (Integer num : list) {
       System.out.println(num);
   }
   ```

6. **Using LinkedList as a Queue/Deque**:
    - Time Complexity: O(1) for adding/removing at the beginning/end
   ```java
   // Queue behavior: Add elements at the end, remove from the front
   LinkedList<Integer> queue = new LinkedList<>();
   queue.addLast(1);  // Enqueue
   queue.addLast(2);
   int dequeued = queue.removeFirst();  // Dequeue (returns 1)
   
   // Stack behavior: Add and remove from the same end (LIFO)
   LinkedList<Integer> stack = new LinkedList<>();
   stack.push(1);  // Push
   stack.push(2);
   int popped = stack.pop();  // Pop (returns 2)
   ```

7. **Searching for an Element**:
    - Time Complexity: O(n)
   ```java
   boolean exists = list.contains(10);  // Returns true if 10 exists in the list
   ```
