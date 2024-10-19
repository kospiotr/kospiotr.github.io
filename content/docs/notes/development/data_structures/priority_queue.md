---
Title: PriorityQueue
---

In Java, `PriorityQueue` is a part of the Java Collections Framework and implements a priority heap. It provides an
efficient way to handle elements that need to be processed based on their priority (defined by natural ordering or a
custom comparator). Elements are ordered by priority, where the smallest or highest-priority element is always
accessible at the head of the queue.

The `PriorityQueue` is a great data structure for scenarios where elements need to be processed based on priority, such
as task scheduling, event-driven systems, or anytime you need to efficiently retrieve the smallest or largest element
repeatedly. It provides logarithmic time complexity for insertion and removal, making it efficient for maintaining order
dynamically.

However, it's not suitable for cases where random access or ordering of all elements is needed. In those cases, other
structures like `ArrayList` or `TreeSet` might be more appropriate.

### Advantages

1. **Efficient Priority Management**: The `PriorityQueue` ensures that the highest-priority element (smallest by
   default) is always at the head of the queue, which allows for fast retrieval of the next "most important" element.
2. **Automatic Ordering**: It automatically orders elements based on their priority, either via natural ordering or a
   custom comparator. This is useful in scenarios like task scheduling or handling events based on urgency.
3. **Flexible Ordering**: You can define a custom ordering by providing a comparator when constructing the queue.
4. **Partial Sorting**: You can efficiently access the smallest or largest element without sorting the entire
   collection.

### Disadvantages

1. **No Random Access**: Unlike `ArrayList`, `PriorityQueue` does not support random access to elements. You cannot
   directly access elements by index.
2. **Unsorted Iterator**: Iterating over a `PriorityQueue` does not return elements in sorted order. Only the head of
   the queue is guaranteed to be the highest-priority element.
3. **No Null Values**: `PriorityQueue` does not allow `null` elements, as `null` is used as a sentinel value in queues.
4. **Not Thread-Safe**: `PriorityQueue` is not synchronized. For concurrent access, use `PriorityBlockingQueue`
   from `java.util.concurrent`.

### Time and Space Complexity

| Operation                  | Time Complexity | Space Complexity | Description                                                                                             |
|----------------------------|-----------------|------------------|---------------------------------------------------------------------------------------------------------|
| **Insertion (add/offer)**  | O(log n)        | O(n)             | Insertion takes O(log n) due to heap reordering.                                                        |
| **Access Minimum (peek)**  | O(1)            | O(1)             | Accessing the minimum element is constant time.                                                         |
| **Deletion (poll/remove)** | O(log n)        | O(n)             | Deleting the minimum element involves heap reordering and takes O(log n).                               |
| **Search (contains)**      | O(n)            | O(1)             | Searching for an element takes linear time.                                                             |
| **Iteration**              | O(n)            | O(n)             | Iterating through all elements takes O(n), but the elements are not guaranteed to be in priority order. |
| **Space Complexity**       | O(n)            | O(n)             | The space required grows linearly with the number of elements.                                          |

### Examples

1. **Initialization and Adding Elements:**
    - Time Complexity: O(log n) for each insertion
   ```java
   // Initialize a PriorityQueue (min-heap by default)
   PriorityQueue<Integer> pq = new PriorityQueue<>();
   
   // Add elements
   pq.add(5);   // [5]
   pq.add(1);   // [1, 5] (1 is the smallest, so it's at the head)
   pq.add(3);   // [1, 5, 3] (1 is still the smallest)
   pq.offer(4); // [1, 4, 3, 5]
   ```

2. **Accessing the Minimum Element (peek):**
    - Time Complexity: O(1)
   ```java
   int min = pq.peek();  // Returns 1, the smallest element (but does not remove it)
   ```

3. **Removing the Minimum Element (poll):**
    - Time Complexity: O(log n)
   ```java
   int min = pq.poll();  // Removes and returns 1, the smallest element
   // Now the queue is [3, 4, 5] with 3 as the new smallest
   ```

4. **Using a Custom Comparator:**
    - Time Complexity: O(log n) for adding/removing elements
   ```java
   // Initialize a PriorityQueue with a custom comparator (max-heap)
   PriorityQueue<Integer> maxPQ = new PriorityQueue<>(Comparator.reverseOrder());
   
   maxPQ.add(5);  // [5]
   maxPQ.add(1);  // [5, 1]
   maxPQ.add(3);  // [5, 1, 3]
   
   int max = maxPQ.peek();  // Returns 5, the largest element
   ```

5. **Checking if an Element Exists (contains):**
    - Time Complexity: O(n)
   ```java
   boolean contains = pq.contains(3);  // Returns true if the element 3 is present
   ```

6. **Iterating Over the PriorityQueue:**
    - Time Complexity: O(n)
   ```java
   // Iterate over all elements (not in sorted order)
   for (Integer num : pq) {
       System.out.println(num);
   }
   ```

7. **Handling Objects with Custom Priority (Using Comparable or Comparator):**
    - Time Complexity: O(log n) for insertion/removal
   ```java
   // Define a class that implements Comparable
   class Task implements Comparable<Task> {
       String name;
       int priority;
       
       Task(String name, int priority) {
           this.name = name;
           this.priority = priority;
       }

       // Compare based on priority (lower values have higher priority)
       @Override
       public int compareTo(Task other) {
           return Integer.compare(this.priority, other.priority);
       }
       
       @Override
       public String toString() {
           return name + " (priority: " + priority + ")";
       }
   }
   
   // Initialize PriorityQueue of tasks
   PriorityQueue<Task> taskQueue = new PriorityQueue<>();
   taskQueue.add(new Task("Task A", 3));
   taskQueue.add(new Task("Task B", 1));
   taskQueue.add(new Task("Task C", 2));
   
   // Access tasks by priority
   Task nextTask = taskQueue.poll();  // Returns "Task B (priority: 1)"
   ```
