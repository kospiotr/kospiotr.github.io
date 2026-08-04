---
title: Cheatsheet
description: Most used methods
---

# java.util.Objects

| Method                                       | Description                                                  |
|----------------------------------------------|--------------------------------------------------------------|
| `equals(Object a, Object b)`                 | Safely compares two objects for equality.                    |
| `deepEquals(Object a, Object b)`             | Performs a deep comparison of two objects, including arrays. |
| `hash(Object... values)`                     | Generates a hash code for multiple objects.                  |
| `hashCode(Object o)`                         | Returns the hash code of an object or `0` if `null`.         |
| `toString(Object o)`                         | Returns the `toString()` of an object or `"null"`.           |
| `toString(Object o, String nullDefault)`     | Returns the `toString()` of an object or a default string.   |
| `requireNonNull(T obj)`                      | Throws `NullPointerException` if the object is `null`.       |
| `requireNonNullElse(T obj, T defaultObj)`    | Returns the object if non-`null`, or a default value.        |
| `isNull(Object obj)`                         | Checks if an object is `null`.                               |
| `nonNull(Object obj)`                        | Checks if an object is non-`null`.                           |
| `compare(T a, T b, Comparator<? super T> c)` | Compares two objects using a comparator.                     |
| `checkIndex(int index, int length)`          | Ensures that the index is within valid bounds.               |

# Exceptions

| Exception                        | Type      | Description                                            |
|----------------------------------|-----------|--------------------------------------------------------|
| `NullPointerException`           | Unchecked | Attempt to use `null` as if it were an object.         |
| `ArrayIndexOutOfBoundsException` | Unchecked | Accessing an array with an illegal index.              |
| `IllegalArgumentException`       | Unchecked | Method argument is inappropriate or illegal.           |
| `IllegalStateException`          | Unchecked | Method called at an inappropriate time.                |
| `IndexOutOfBoundsException`      | Unchecked | General index is out of range.                         |
| `ArithmeticException`            | Unchecked | Arithmetic error (e.g., divide by zero).               |
| `ClassCastException`             | Unchecked | Invalid casting of an object.                          |
| `NumberFormatException`          | Unchecked | Failure to convert string to a number.                 |
| `IOException`                    | Checked   | I/O operation failure.                                 |
| `FileNotFoundException`          | Checked   | File operation on a file that doesn’t exist.           |
| `InterruptedException`           | Checked   | Thread is interrupted while it is waiting or sleeping. |
| `SQLException`                   | Checked   | Database access or SQL error.                          |
| `NoSuchElementException`         | Unchecked | Attempting to access an element that does not exist.   |
| `UnsupportedOperationException`  | Unchecked | Operation is unsupported.                              |
| `TimeoutException`               | Checked   | Operation times out.                                   |
| `OutOfMemoryError`               | Error     | JVM runs out of memory (serious issue).                |

