package com.example.restservice.controller;

import com.example.restservice.algorithms.numbers.NumbersSequenceGenerator;
import com.example.restservice.algorithms.sort.BubbleSort;
import com.example.restservice.algorithms.sort.QuickSort;
import com.example.restservice.algorithms.sort.SelectionSort;
import com.example.restservice.algorithms.sort.Sort;
import com.example.restservice.dto.AlgorithmDTO;
import com.example.restservice.dto.ExecutionSummaryDTO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class SortingController {

    @ResponseBody
    @GetMapping("/sort/{maxSampleSize}")
    public List createResultSet(@PathVariable(name="maxSampleSize") String maxSampleSize){
        return runSimulations(generateSortSamples(Long.valueOf(maxSampleSize)));
    }

    private List runSimulations(Map<String, Map<Integer, Integer[]>> sampleSets) {
        List<ExecutionSummaryDTO> dataPoints = new ArrayList<>();
        List<Sort> sorters = new ArrayList<>();
        sorters.add(new BubbleSort());
        sorters.add(new QuickSort());
        sorters.add(new SelectionSort());

        for (Map.Entry<String, Map<Integer, Integer[]>> testSet : sampleSets.entrySet()) {
            for(Map.Entry<Integer, Integer[]> mapSet : testSet.getValue().entrySet()){

                for (Sort sorter : sorters) {
                    double time_before = System.nanoTime();
                    sorter.sorting(mapSet.getValue());
                    double time_after = System.nanoTime();

                    AlgorithmDTO algorithm = new AlgorithmDTO();
                    algorithm.setName(sorter.getClass().getSimpleName());

                    ExecutionSummaryDTO executionSummaryDTO = new ExecutionSummaryDTO();
                    executionSummaryDTO.setAlgorithm(algorithm);
                    executionSummaryDTO.setTotalTime((time_after - time_before) / 1_000_000);
                    executionSummaryDTO.setSampleSize((long) mapSet.getValue().length);
                    executionSummaryDTO.setDistribution(testSet.getKey());
                    dataPoints.add(executionSummaryDTO);
                }
            }
        }
        return dataPoints;
    }

    private Map generateSortSamples(Long maxSampleSize) {
        NumbersSequenceGenerator generator = new NumbersSequenceGenerator();
        Map<String, Map<Integer, Integer[]>> generatedSets = new HashMap<>();

        Map<Integer, Integer[]> random = new HashMap<>();
        Map<Integer, Integer[]> nearlySorted = new HashMap<>();
        Map<Integer, Integer[]> reversed = new HashMap<>();

        for(int i = 1; i <= maxSampleSize; ++i){
            random.put(i, generator.generate(i, 1, "random", 1, 1000));
            nearlySorted.put(i, generator.generate(i, 1, "nearlySorted", 1, 1000));
            reversed.put(i, generator.generate(i, 1, "reversed", 1, 1000));
        }
        generatedSets.put("random", random);
        generatedSets.put("nearlySorted", nearlySorted);
        generatedSets.put("reversed", reversed);

        return generatedSets;
    }
}
