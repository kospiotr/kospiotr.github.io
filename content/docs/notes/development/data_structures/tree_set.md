---
Title: TreeSet
---

In Java, a `TreeSet` is a part of the `java.util` package and implements the `NavigableSet` interface, which
extends `SortedSet`. Internally, it uses a **Red-Black Tree** (a self-balancing binary search tree), which ensures that
the elements are always stored in sorted order. A `TreeSet` does not allow duplicate elements and does not permit `null`
values. It is commonly used when you need to maintain a sorted collection, and it provides log-time complexity for basic
operations like adding, removing, and searching elements.

# Advantages

1. **Sorted Order**: Elements are automatically sorted in natural order (or using a custom comparator), which is useful
   when maintaining sorted data is required.
2. **Efficient Range Queries**: The `TreeSet` supports efficient methods for obtaining subsets, headsets, and tailsets,
   allowing for quick range-based operations.
3. **Navigable**: Offers convenient methods like `first()`, `last()`, `lower()`, and `higher()` for accessing elements
   based on their values.
4. **No Duplicates**: Ensures that the set contains only unique elements.
5. **Consistent Performance**: Since it is based on a balanced tree, performance remains consistent, even with large
   data sets.

# Disadvantages

1. **Slower than HashSet**: Operations like add, remove, and search have a time complexity of `O(log n)`, which is
   slower than `HashSet`, which operates in `O(1)` on average.
2. **No Null Elements**: Does not permit `null` values, and attempting to add a `null` element results in
   a `NullPointerException`.
3. **Higher Memory Overhead**: Requires more memory compared to a `HashSet` due to the additional structure (
   parent/child pointers and color information) of the red-black tree.
4. **Complexity in Maintaining Order**: Maintaining sorted order adds complexity and overhead, making it slower for
   operations that don’t require ordering.

# Time and Space Complexity

| Operation               | Time Complexity | Space Complexity |
|-------------------------|-----------------|------------------|
| **Add (add)**           | `O(log n)`      | `O(n)`           |
| **Remove (remove)**     | `O(log n)`      | `O(n)`           |
| **Contains (contains)** | `O(log n)`      | `O(n)`           |
| **First (first)**       | `O(log n)`      | `O(n)`           |
| **Last (last)**         | `O(log n)`      | `O(n)`           |
| **HeadSet (headSet)**   | `O(log n)`      | `O(n)`           |
| **TailSet (tailSet)**   | `O(log n)`      | `O(n)`           |
| **SubSet (subSet)**     | `O(log n)`      | `O(n)`           |

# Examples

1. **Add Operation**
    - **Time Complexity**: `O(log n)`
   ```java
   TreeSet<Integer> treeSet = new TreeSet<>();
   treeSet.add(10);  // Adding an element
   treeSet.add(5);
   treeSet.add(15);
   System.out.println(treeSet);  // Output: [5, 10, 15]
   ```

2. **Remove Operation**
    - **Time Complexity**: `O(log n)`
   ```java
   TreeSet<Integer> treeSet = new TreeSet<>();
   treeSet.add(10);
   treeSet.add(5);
   treeSet.add(15);
   treeSet.remove(10);  // Removing an element
   System.out.println(treeSet);  // Output: [5, 15]
   ```

3. **Contains Operation**
    - **Time Complexity**: `O(log n)`
   ```java
   TreeSet<Integer> treeSet = new TreeSet<>();
   treeSet.add(10);
   treeSet.add(5);
   treeSet.add(15);
   System.out.println(treeSet.contains(5));  // Output: true
   ```

4. **First Operation**
    - **Time Complexity**: `O(log n)`
   ```java
   TreeSet<Integer> treeSet = new TreeSet<>();
   treeSet.add(10);
   treeSet.add(5);
   treeSet.add(15);
   System.out.println(treeSet.first());  // Output: 5
   ```

5. **Last Operation**
    - **Time Complexity**: `O(log n)`
   ```java
   TreeSet<Integer> treeSet = new TreeSet<>();
   treeSet.add(10);
   treeSet.add(5);
   treeSet.add(15);
   System.out.println(treeSet.last());  // Output: 15
   ```

6. **HeadSet Operation**
    - **Time Complexity**: `O(log n)`
   ```java
   TreeSet<Integer> treeSet = new TreeSet<>();
   treeSet.add(10);
   treeSet.add(5);
   treeSet.add(15);
   System.out.println(treeSet.headSet(10));  // Output: [5]
   ```

7. **TailSet Operation**
    - **Time Complexity**: `O(log n)`
   ```java
   TreeSet<Integer> treeSet = new TreeSet<>();
   treeSet.add(10);
   treeSet.add(5);
   treeSet.add(15);
   System.out.println(treeSet.tailSet(10));  // Output: [10, 15]
   ```

8. **SubSet Operation**
    - **Time Complexity**: `O(log n)`
   ```java
   TreeSet<Integer> treeSet = new TreeSet<>();
   treeSet.add(10);
   treeSet.add(5);
   treeSet.add(15);
   System.out.println(treeSet.subSet(5, 15));  // Output: [5, 10]
   ```