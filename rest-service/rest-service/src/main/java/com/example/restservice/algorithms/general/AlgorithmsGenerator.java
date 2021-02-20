package com.example.restservice.algorithms.general;

import com.example.restservice.dto.AlgorithmExecutionDTO;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class AlgorithmsGenerator {

    private static final DecimalFormat df2 = new DecimalFormat("#.##");
    String[] name = new String[]{"BubbleSort", "EratosthenesSieves", "MatrixProduct", "HeapsAlgorithm", "NumberSequenceGenerator", "RomanToArab", "QuickSort", "SelectionSort"};
    String[] types = new String[]{"Integer", "Long", "Double", "String"};
    Long numberOfInputs;
    List<String> typesOfInputs = new ArrayList<>();
    List<String> typesOfOutputs = new ArrayList<>();
    List<String> inputs = new ArrayList<>();
    List<String> outputs = new ArrayList<>();

    public AlgorithmExecutionDTO createAlgorithms(){

        typesOfInputs.clear();
        typesOfOutputs.clear();
        inputs.clear();
        outputs.clear();

        AlgorithmExecutionDTO algorithmExecutionDTO = new AlgorithmExecutionDTO();
        algorithmExecutionDTO.setId(0L);

        Random random = new Random();

        int index = random.nextInt(7 + 1);
        algorithmExecutionDTO.setName(name[index]);

        numberOfInputs = (long) random.nextInt(10 - 1) + 1;
        algorithmExecutionDTO.setNumberOfInputs(numberOfInputs);

        for(int i = 0; i < numberOfInputs; ++i){
            int indexType = random.nextInt(3 + 1);
            typesOfInputs.add(types[indexType]);
            createSet(inputs, indexType);

            indexType = random.nextInt(3 + 1);
            typesOfOutputs.add(types[indexType]);
            createSet(outputs, indexType);
        }

        algorithmExecutionDTO.setTypesOfInputs(typesOfInputs);
        algorithmExecutionDTO.setTypesOfOutputs(typesOfOutputs);
        algorithmExecutionDTO.setInputs(inputs);
        algorithmExecutionDTO.setOutputs(outputs);
        algorithmExecutionDTO.setExecutionTime(random.nextDouble());
        algorithmExecutionDTO.setImplementationYear(String.valueOf(random.nextInt(2021 + 1 - 2000) + 2000));
        algorithmExecutionDTO.setImplementationMonth(String.valueOf(random.nextInt(12 + 1 - 1) + 1));

        return algorithmExecutionDTO;
    }

    public void createSet(List<String> set, int indexType){
        Random random = new Random();

        switch (types[indexType]){
            case "Integer":{
                int number = random.nextInt(100 + 1 - (-100)) + (-100);
                set.add(String.valueOf(number));
                break;
            }
            case "Long":{
                long number = (long) random.nextInt(100 + 1 - (-100)) + (-100);
                set.add(Long.toString(number));
                break;
            }
            case "Double":{
                set.add(df2.format(random.nextDouble()));
                break;
            }
            case "String":{
                int maxLength = random.nextInt(10 + 1);

                StringBuilder stringInput = new StringBuilder();
                for(int j = 0; j < maxLength; ++j){
                    char digit = (char) random.nextInt((126 + 1 - 32) + 32);
                    stringInput.append(digit);
                }
                set.add(stringInput.toString());
                break;
            }
            default: break;
        }
    }
}
