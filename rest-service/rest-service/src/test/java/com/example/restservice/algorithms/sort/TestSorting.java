package com.example.restservice.algorithms.sort;

import com.example.restservice.algorithms.numbers.NumbersSequenceGenerator;
import org.junit.jupiter.api.Test;

import java.util.*;

public class TestSorting {

    @Test
    public void testSorting() {

        NumbersSequenceGenerator generator = new NumbersSequenceGenerator();
        generator.generateNumbers(0, 10000000);

        Map<String, Integer[]> generatedNumbers = new HashMap<>();
        generatedNumbers.put("100_1_random", generator.generate(100, 1, "random", 0, 10000000));
        generatedNumbers.put("100_1_nearlySorted", generator.generate(100, 1, "nearlySorted", 0, 10000000));
        generatedNumbers.put("100_1_reversed", generator.generate(100, 1, "reversed", 0, 10000000));
        generatedNumbers.put("100_10_random", generator.generate(100, 10, "random", 0, 10000000));
//      generatedNumbers.put("1000000_100000_random", generator.generate(1_000_000, 100_000, "random"));

        System.out.println();

        List<Sort> sorters = new ArrayList<>();
        sorters.add(new BubbleSort());
        sorters.add(new QuickSort());
        sorters.add(new SelectionSort());

        for (Map.Entry<String, Integer[]> testSet : generatedNumbers.entrySet()) {
            System.out.println("Sorting set " + testSet.getKey());
            for (Sort sorter : sorters) {
                double time_before = System.nanoTime();
                sorter.sorting(testSet.getValue());
                System.out.println("- Sorting with (" + sorter.getClass() + ") - " + (System.nanoTime() - time_before) / 1_000_000 + "ms");
            }
            System.out.println();
        }
    }

    @Test
    public void test(){
        NumbersSequenceGenerator generator = new NumbersSequenceGenerator();
        StringJoiner result = new StringJoiner(", ");
        Integer[] numbers= generator.generate(100,100 , "random", 0, 100);
        for (Integer number : numbers) {
            result.add(number.toString());
        }
        System.out.println(result);
    }
}
/**
        Generating random 100 numbers of 1 frequency...
        Generating nearlySorted 100 numbers of 1 frequency...
        Generating reversed 100 numbers of 1 frequency...
        Generating random 100 numbers of 10 frequency...
        Generating random 1000000 numbers of 100000 frequency...

        Sorting set 100_1_random
        - Sorting with (class com.example.restservice.algorithms.sort.BubbleSort) - 0.376301ms
        - Sorting with (class com.example.restservice.algorithms.sort.QuickSort) - 0.3445ms
        - Sorting with (class com.example.restservice.algorithms.sort.SelectionSort) - 0.1753ms

        Sorting set 100_1_nearlySorted
        - Sorting with (class com.example.restservice.algorithms.sort.BubbleSort) - 0.3804ms
        - Sorting with (class com.example.restservice.algorithms.sort.QuickSort) - 0.632501ms
        - Sorting with (class com.example.restservice.algorithms.sort.SelectionSort) - 0.268101ms

        Sorting set 100_1_nearlySorted
        - Sorting with (class com.example.restservice.algorithms.sort.BubbleSort) - 0.388399ms
        - Sorting with (class com.example.restservice.algorithms.sort.QuickSort) - 0.173399ms
        - Sorting with (class com.example.restservice.algorithms.sort.SelectionSort) - 0.1756ms

        Sorting set 100_10_random
        - Sorting with (class com.example.restservice.algorithms.sort.BubbleSort) - 0.430901ms
        - Sorting with (class com.example.restservice.algorithms.sort.QuickSort) - 0.1125ms
        - Sorting with (class com.example.restservice.algorithms.sort.SelectionSort) - 0.1743ms

        Sorting set 1000000_100000_random
        - Sorting with (class com.example.restservice.algorithms.sort.BubbleSort) - 5336961.623001ms
        - Sorting with (class com.example.restservice.algorithms.sort.QuickSort) - StackOverflow
        - Sorting with (class com.example.restservice.algorithms.sort.SelectionSort) - not even trying
**/