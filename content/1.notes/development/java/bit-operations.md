---
title: Bit Operations
---
In Java, **bitwise operations** are operations that manipulate individual bits of integer types like `int` and `long`. These operations can be used for low-level programming, performance optimizations, and working with flags or binary data. The common bitwise operations in Java include:

# Overview

| Operation   | Symbol | Description                                                           |
|-------------|--------|-----------------------------------------------------------------------|
| Bitwise AND | `&`    | Sets each bit to `1` if both bits are `1`.                            |
| Bitwise OR  | `|`    | Sets each bit to `1` if one of the bits is `1`.                       |
| Bitwise XOR | `^`    | Sets each bit to `1` if only one of the bits is `1`.                  |
| Bitwise NOT | `~`    | Inverts all the bits (i.e., `1` becomes `0` and `0` becomes `1`).     |
| Left Shift  | `<<`   | Shifts bits to the left and fills the empty positions with `0`s.      |
| Right Shift | `>>`   | Shifts bits to the right, filling the leftmost bits with the sign bit.|
| Unsigned Right Shift | `>>>` | Shifts bits to the right, filling with `0`s regardless of the sign. |

# Common Use Cases for Bitwise Operations
1. **Masking:** Extracting or modifying specific bits in an integer (e.g., toggling flags).
2. **Performance Optimization:** Shifting bits can sometimes be faster than multiplication or division.
3. **Binary Operations:** Manipulating data that is naturally in binary form (e.g., encryption, compression algorithms).
4. **Flags/Settings:** Bitwise operations are often used to set, check, or clear specific flags in a variable.


# Time Complexity:
Bitwise operations are generally very fast and perform in constant time: **O(1)**. They're ideal when performance is critical, especially in low-level tasks or where data needs to be processed at the bit level.

# Bitwise AND (`&`)
- This operation performs a bit-by-bit AND operation between two numbers.
- A bit is set to `1` if both corresponding bits of the operands are `1`, otherwise it is `0`.

**Example:**
```java
int a = 5;    // 0101 in binary
int b = 3;    // 0011 in binary
int result = a & b;  // 0001 in binary = 1
```

# Bitwise OR (`|`)
- This operation performs a bit-by-bit OR operation.
- A bit is set to `1` if either of the corresponding bits of the operands is `1`.

**Example:**
```java
int a = 5;    // 0101 in binary
int b = 3;    // 0011 in binary
int result = a | b;  // 0111 in binary = 7
```

# Bitwise XOR (`^`)
- This operation performs a bit-by-bit XOR (exclusive OR) operation.
- A bit is set to `1` if one, but not both, of the corresponding bits of the operands is `1`.

**Example:**
```java
int a = 5;    // 0101 in binary
int b = 3;    // 0011 in binary
int result = a ^ b;  // 0110 in binary = 6
```

# Bitwise NOT (`~`)
- This operation performs a bitwise complement (NOT) operation.
- It flips every bit, turning `1`s into `0`s and vice versa.

**Example:**
```java
int a = 5;    // 0101 in binary
int result = ~a;  // 1010 in binary (32-bit) = -6
```

> **Note:** Java uses **two's complement** representation for signed integers, so `~5` results in `-6` due to the way negative numbers are represented.

# Left Shift (`<<`)
- This operation shifts all the bits of the operand to the left by a specified number of positions.
- The empty positions are filled with `0`s. Each left shift by 1 is equivalent to multiplying by 2.

**Example:**
```java
int a = 5;    // 0101 in binary
int result = a << 2;  // 10100 in binary = 20
```

# Right Shift (`>>`)
- This operation shifts all the bits of the operand to the right by a specified number of positions.
- It fills the leftmost bits with the sign bit (0 for positive numbers, 1 for negative numbers). Each right shift by 1 is equivalent to dividing by 2 (with rounding down for integers).

**Example:**
```java
int a = 20;    // 10100 in binary
int result = a >> 2;  // 101 in binary = 5
```

# **Unsigned Right Shift (`>>>`)
- This operation shifts all the bits of the operand to the right by a specified number of positions.
- Unlike the signed right shift (`>>`), it fills the leftmost bits with `0` regardless of the sign of the number (i.e., treats the number as unsigned).

**Example:**
```java
int a = -20;    // 11111111111111111111111111101100 in binary (32-bit)
int result = a >>> 2;  // 00111111111111111111111111111011 = 1073741819
```


---

# Example of Using Bitwise Operations in Java:
Here’s an example that demonstrates several of the bitwise operations:

```java
public class BitwiseExample {
    public static void main(String[] args) {
        int a = 5;   // 0101 in binary
        int b = 3;   // 0011 in binary

        // Bitwise AND
        int andResult = a & b;   // 0001 = 1
        System.out.println("AND: " + andResult);

        // Bitwise OR
        int orResult = a | b;    // 0111 = 7
        System.out.println("OR: " + orResult);

        // Bitwise XOR
        int xorResult = a ^ b;   // 0110 = 6
        System.out.println("XOR: " + xorResult);

        // Bitwise NOT
        int notResult = ~a;      // 1010 = -6 (two's complement)
        System.out.println("NOT: " + notResult);

        // Left Shift
        int leftShift = a << 1;  // 1010 = 10
        System.out.println("Left Shift: " + leftShift);

        // Right Shift
        int rightShift = a >> 1; // 0010 = 2
        System.out.println("Right Shift: " + rightShift);

        // Unsigned Right Shift
        int unsignedRightShift = a >>> 1; // 0010 = 2 (same as signed in this case)
        System.out.println("Unsigned Right Shift: " + unsignedRightShift);
    }
}
```

# Output:
```
AND: 1
OR: 7
XOR: 6
NOT: -6
Left Shift: 10
Right Shift: 2
Unsigned Right Shift: 2
```
