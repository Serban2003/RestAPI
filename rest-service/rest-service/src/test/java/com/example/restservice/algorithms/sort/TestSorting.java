package com.example.restservice.algorithms.sort;

import com.example.restservice.algorithms.numbers.NumbersSequenceGenerator;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TestSorting {

    //TODO: 100 - 1 000 000 - 2 000 000 000                 (3 order of magnitude)
    //TODO: distribution random, nearlySorted, reversed     (4 distributions)
    // = 12 distinct cases

    @Test
    public void testSorting() {

        NumbersSequenceGenerator generator = new NumbersSequenceGenerator();

        Map<String, Map<Integer, Integer[]>> testsSuperset = new HashMap<>();
        Map<Integer, Integer[]> rrr = new HashMap<>();
        rrr.put(100, generator.generate(100, 1, "random"));
        rrr.put(1_000_000, generator.generate(100, 1, "random"));
        rrr.put(2_000_000_000, generator.generate(100, 1, "random"));
        testsSuperset.put("Running tests for 100 unique numbers - random distribution", rrr);

        Map<Integer, Integer[]> generatedNumbers = new HashMap<>();
        generatedNumbers.put(100, generator.generate(100, 1, "random"));
        generatedNumbers.put(100, generator.generate(100, 1, "nearlySorted"));
        generatedNumbers.put(100, generator.generate(100, 1, "reversed"));
        generatedNumbers.put(100, generator.generate(100, 10, "random"));
        generatedNumbers.put(100, generator.generate(1_000_000, 100_000, "random"));

        List<Sort> sorters = new ArrayList<>();
        sorters.add(new BubbleSort());
        sorters.add(new QuickSort());
        sorters.add(new SelectionSort());

        for (Map.Entry<Integer, Integer[]> testSet : generatedNumbers.entrySet()) {
            System.out.println("Running tests for 100 unique numbers - random distribution");
            for (Sort sorter : sorters) {
                double time_before = System.nanoTime();
                sorter.sorting(testSet.getValue());
                System.out.println("Sorting with (" + sorter.getClass() + ") - " + (System.nanoTime() - time_before) / 1_000_000 + "ms");
            }
        }
    }
}
