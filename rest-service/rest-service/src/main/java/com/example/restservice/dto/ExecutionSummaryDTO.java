package com.example.restservice.dto;

import java.util.StringJoiner;

public class ExecutionSummaryDTO {
    Long  Ops = 0L, sampleSize = 0L;
    Double totalTime = 0.0;
    String distribution;
    AlgorithmDTO algorithm;

    public Double getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(Double totalTime) {
        this.totalTime = totalTime;
    }

    public Long getOps() {
        return Ops;
    }

    public void setOps(Long ops) {
        Ops = ops;
    }

    public Long getSampleSize() {
        return sampleSize;
    }

    public void setSampleSize(Long sampleSize) {
        this.sampleSize = sampleSize;
    }

    public AlgorithmDTO getAlgorithm() {
        return algorithm;
    }

    public void setAlgorithm(AlgorithmDTO algorithm) {
        this.algorithm = algorithm;
    }

    public String getDistribution() {
        return distribution;
    }

    public void setDistribution(String distribution) {
        this.distribution = distribution;
    }
}
