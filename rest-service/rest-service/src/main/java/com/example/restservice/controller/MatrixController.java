package com.example.restservice.controller;

import com.example.restservice.dto.AlgorithmDTO;
import com.example.restservice.dto.ExecutionSummaryDTO;
import com.example.restservice.matrix.Matrix;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
public class MatrixController {
    @ResponseBody
    @GetMapping("/matrix/{maxSampleSize}")
    public List<ExecutionSummaryDTO> createResultSet(@PathVariable(name="maxSampleSize") String maxSampleSize){
        return runSimulations(generateMatrixSamples(Long.valueOf(maxSampleSize)));
    }

    private List<ExecutionSummaryDTO> runSimulations(ArrayList<Matrix> generatedSets) {
        List<ExecutionSummaryDTO> dataPoints = new ArrayList<>();

        for(int i = 0; i < generatedSets.size(); ++i){

            double time_before = System.nanoTime();
            generatedSets.get(i).product(generatedSets.get(i));
            double time_after = System.nanoTime();

            AlgorithmDTO algorithm = new AlgorithmDTO();
            algorithm.setName("Product Set");

            ExecutionSummaryDTO executionSummaryDTO = new ExecutionSummaryDTO();
            executionSummaryDTO.setAlgorithm(algorithm);
            executionSummaryDTO.setSampleSize((long) i);
            executionSummaryDTO.setTotalTime((time_after - time_before) / 1_000_000);
            dataPoints.add(executionSummaryDTO);
        }
        return dataPoints;
    }

    private ArrayList<Matrix> generateMatrixSamples(Long maxSampleSize) {
        Matrix matrix;
        ArrayList<Matrix> generatedSets = new ArrayList<>();

        for(int i = 1; i <= maxSampleSize; ++i){
            matrix = new Matrix(i, i);
            matrix.generate(i, i, -100, 100);
            generatedSets.add(matrix);
        }
        return generatedSets;
    }
}
