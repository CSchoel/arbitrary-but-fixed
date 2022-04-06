import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

public class Prime31 {

    private static final int[] primes = {
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47,
        53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107,
        109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167,
        173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229,
        233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283,
        293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359,
        367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431,
        433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491,
        499, 503, 509, 521, 523, 541,
        8191, 131071, 524287 // some additional mersenne primes
    };

    public static int hashCodeP(int prime, Object... objects) {
        // copy of Arrays.hashCode replacing 31 with prime
        if (objects == null)
            return 0;

        int result = 1;

        for (Object element : objects)
            result = prime * result + (element == null ? 0 : element.hashCode());

        return result;
    }

    public static <A> int countCollisions(int prime, List<A[]> objects) {
        Set<Integer> codes = new HashSet<>();
        int collisions = 0;
        int exp = (int) Math.round(Math.ceil(Math.log(objects.size()) / Math.log(2)));
        int buckets = 1 << exp;
        for (A[] o: objects) {
            int b = hashCodeP(prime, o) % buckets;
            if (codes.contains(b)) {
                collisions++;
            }
            codes.add(b);
        }
        return collisions;
    }

    private record Point(int x, int y) { }

    public static List<Integer[]> generatePoints() {
        Set<Point> points = new HashSet<>();
        Random r = new Random();
        while (points.size() < 100000) {
            int x = r.nextInt(1024);
            int y = r.nextInt(768);
            points.add(new Point(x, y));
        }
        return points.stream().map(p -> new Integer[]{p.x, p.y}).toList();
    }

    public static void main(String[] args) {
        for (int p: primes) {
            int cPoints = countCollisions(p, generatePoints());
            System.out.println(String.format("%6d: %6d", p, cPoints));
        }
    }
}