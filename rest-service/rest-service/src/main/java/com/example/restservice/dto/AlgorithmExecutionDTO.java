package com.example.restservice.dto;

import java.util.List;

public class AlgorithmExecutionDTO {
    Long id;
    String name;
    Long numberOfInputs;
    List<String> typesOfInputs, typesOfOutputs;
    List<String> inputs, outputs;
    Double executionTime;
    String implementationYear, implementationMonth;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getNumberOfInputs() {
        return numberOfInputs;
    }

    public void setNumberOfInputs(Long numberOfInputs) {
        this.numberOfInputs = numberOfInputs;
    }

    public List<String> getTypesOfInputs() {
        return typesOfInputs;
    }

    public void setTypesOfInputs(List<String> typesOfInputs) {
        this.typesOfInputs = typesOfInputs;
    }

    public List<String> getTypesOfOutputs() {
        return typesOfOutputs;
    }

    public void setTypesOfOutputs(List<String> typesOfOutputs) {
        this.typesOfOutputs = typesOfOutputs;
    }

    public List<String> getInputs() {
        return inputs;
    }

    public void setInputs(List<String> inputs) {
        this.inputs = inputs;
    }

    public List<String> getOutputs() {
        return outputs;
    }

    public void setOutputs(List<String> outputs) {
        this.outputs = outputs;
    }

    public Double getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(Double executionTime) {
        this.executionTime = executionTime;
    }

    public String getImplementationYear() {
        return implementationYear;
    }

    public void setImplementationYear(String implementationYear) {
        this.implementationYear = implementationYear;
    }

    public String getImplementationMonth() {
        return implementationMonth;
    }

    public void setImplementationMonth(String implementationMonth) {
        this.implementationMonth = implementationMonth;
    }
}
