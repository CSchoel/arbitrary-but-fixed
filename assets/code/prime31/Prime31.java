import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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

    public static <A> int countCollisions(int prime, boolean second, List<A[]> objects) {
        Set<Integer> codes = new HashSet<>();
        int collisions = 0;
        float loadFactor = 0.75f;
        int exp = (int) Math.round(Math.ceil(Math.log(objects.size() / loadFactor) / Math.log(2)));
        int buckets = 1 << exp;
        for (A[] o: objects) {
            Integer c = hashCodeP(prime, o);
            if (second) {
                c = hash(c); // apply second hash from HashMap impl
            }
            int b = c % buckets;
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
        List<Integer[]> lst = points.stream().map(p -> new Integer[]{p.x, p.y}).toList();
        lst = new ArrayList<>(lst);
        Collections.sort(lst, Comparator.comparing(p -> p[1]));
        Collections.sort(lst, Comparator.comparing(p -> p[0]));
        return lst;
    }

    public static List<Integer[]> generateDates() {
        Set<LocalDate> dates = new HashSet<>();
        Random r = new Random();
        while(dates.size() < 10000) {
            int year = 1983 + r.nextInt(40);
            int month = 1 + r.nextInt(12);
            YearMonth ym = YearMonth.of(year, month);
            int day = 1 + r.nextInt(ym.lengthOfMonth());
            dates.add(ym.atDay(day));
        }
        List<Integer[]> lst = dates.stream()
            .map(x -> new Integer[]{x.getYear(), x.getMonthValue(), x.getDayOfMonth()})
            .toList();
        return lst;
    }

    // copied from java.util.HashMap
    static final int hash(Object key) {
        int h;
        return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
    }

    public static void main(String[] args) {
        List<Integer[]> points = generatePoints();
        List<Integer[]> dates = generateDates();
        for (int p: primes) {
            int cPoints = countCollisions(p, true, points);
            int cPointsString = countCollisions(p, true, points.stream().map(x -> new String[]{String.format("(%d, %d)", (Object[])x)}).toList());
            int cPointsCustom = countCollisions(p, false, points.stream().map(x -> new Integer[]{x[1] * 1024 + x[0]}).toList());
            int cDates = countCollisions(p, true, dates);
            String msg = String.format(
                "%6d: %4.1f %4.1f %4.1f %4.1f", p,
                100.0 * cPoints / points.size(),
                100.0 * cPointsString / points.size(),
                100.0 * cPointsCustom / points.size(),
                100.0 * cDates / dates.size()
            );
            System.out.println(msg);
        }
    }
}
