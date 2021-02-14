package com.example.restservice.db;

import com.example.restservice.dto.AlgorithmExecutionDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Stream;

//TODO
/*
implement getAll - done
implement getById (by id - make id unique)
insert 10.000.000 and measure getAll() for 10k, 100k, 1 mil, 2 mil, etc.
create folder if missing line 62 - done
*/
@Service
public class CustomDb {
    private static final Logger logger = LoggerFactory.getLogger(CustomDb.class);
    List<File> files = new ArrayList<>();
    List<Long> entries = new ArrayList<>();
    String rootPath = "C:\\Customdb";
    Long maxPerFile = 10_000L;
    File file;

    @PostConstruct
    public void postConstruct(){
        File dir = new File(rootPath);

        if(!dir.exists()){
            dir.mkdirs();
            logger.info("Creating " + rootPath);
        }

        createDbStorage("myDb0.txt");
        indexDatabase();
    }

    private void createDbStorage(String textFile){
        try {
            file = new File(rootPath + "\\" + textFile);
            if (file.createNewFile()) logger.info("File created: " + file.getName());
            else logger.info("File already exists.");

        } catch (IOException e){
            logger.error("An error occurred.", e);
        }

    }

    private Long getLines(String path){
        Long lineCount = 0L;
        try (Stream<String> stream = Files.lines(Paths.get(path), StandardCharsets.UTF_8)) {
            lineCount = stream.count();
        } catch (IOException e) {
            logger.error(String.valueOf(e));
        }
        return lineCount;
    }

    private void indexDatabase(){
        File dir = new File(rootPath);
        File[] directoryListing = dir.listFiles();
        if (directoryListing != null) {
            for (File child : directoryListing) {
                files.add(child);
                entries.add(getLines(child.getAbsolutePath()));
            }
        }
    }

    private void writeDb(String data){
        try {
           if(entries.get(entries.size() - 1).equals(maxPerFile)){
               createDbStorage("myDb" + entries.size() + ".txt");
               files.add(new File(rootPath + "\\" + "myDb" + entries.size() + ".txt"));
               entries.add(0L);
           }

            FileWriter myWriter = new FileWriter(files.get(files.size() - 1).getAbsolutePath(), true);
            myWriter.write(data + '\n');
            myWriter.close();
            entries.set(entries.size() - 1, getLines(files.get(files.size() - 1).toString()));
            logger.info("Successfully wrote to the file: " + files.get(files.size() - 1).getAbsolutePath());
        } catch (IOException e) {
            logger.error("An error occurred.", e);
        }
    }

    public void insert(AlgorithmExecutionDTO data) throws JsonProcessingException {

        ObjectMapper mapper = new ObjectMapper();
        String JSONData = mapper.writeValueAsString(data);

        logger.info(JSONData);
        writeDb(JSONData);
    }

    public void delete(Long id){

    }

    public List<AlgorithmExecutionDTO> getAll(){

        List<AlgorithmExecutionDTO> allAlgorithms = new ArrayList<>();

        File dir = new File(rootPath);
        File[] directoryListing = dir.listFiles();
        if (directoryListing != null) {
            for (File child : directoryListing) {
                try (BufferedReader br = new BufferedReader(new FileReader(child))) {
                    String line;
                    while ((line = br.readLine()) != null) {
                        allAlgorithms.add(convertLineToClass(line));
                    }
                } catch (IOException | JSONException e) {
                    e.printStackTrace();
                }
            }
        }
        return allAlgorithms;
    }

    public AlgorithmExecutionDTO convertLineToClass(String line) throws JSONException {
        JSONObject jsonObject = new JSONObject(line);
        return new Gson().fromJson(String.valueOf(jsonObject),AlgorithmExecutionDTO.class);
    }

    public List<AlgorithmExecutionDTO> search(List<SearchCriteria> searchCriteria, List<SortCriteria> sortCriteria){

        return new ArrayList<>();
    }

    public AlgorithmExecutionDTO searchById(Long id){

        return new AlgorithmExecutionDTO();
    }
}
