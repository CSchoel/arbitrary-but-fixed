Space for array store instructions (`DUP`, push index, push value, `IASTORE`):

```
4 * n bytes
```

Space for array indices:

$$
5 \cdot 0 + 1 \cdot  (127 - 5) + 2 \cdot (2^7 - 1 - 127)
$$

Space for array values:

$$

$$