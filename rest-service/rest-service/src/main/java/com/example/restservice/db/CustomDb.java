package com.example.restservice.db;

import com.example.restservice.dto.AlgorithmExecutionDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.mysql.cj.protocol.PacketReceivedTimeHolder;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Stream;

import static java.lang.Character.isDigit;

//TODO
/*
implement getAll - done
implement getById (by id - make id unique) - done
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

    private Long getMaxId(String path) throws IOException {
        String line = "";
        Long maxId = 0L;

        BufferedReader buffer = new BufferedReader(new FileReader(path));

        while((line = buffer.readLine()) != null) {
            //struct: {"id":...

            int index = 6;
            long lineId = 0L;

            while (isDigit(line.charAt(index))) {
                lineId = lineId * 10 + Long.valueOf(line.charAt(index) - 48);
                index++;
            }
            maxId = Math.max(maxId, lineId);
        }
        return maxId;
    }

    private Long getLines(String path){
        long lineCount = 0L;
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

        String newJSONData = data.substring(0, 6);

        int index = 6, numberOfDigits = 0;
        long lineId = 0L;

        while (isDigit(data.charAt(index))) {
            lineId = lineId * 10 + Long.valueOf(data.charAt(index) - 48);
            index++;
            numberOfDigits++;
        }

        try {
           if(entries.get(entries.size() - 1).equals(maxPerFile)){
               createDbStorage("myDb" + entries.size() + ".txt");
               files.add(new File(rootPath + "\\" + "myDb" + entries.size() + ".txt"));
               entries.add(0L);
           }
            newJSONData += (getMaxId(rootPath + "\\" + "myDb" + (files.size() - 1) + ".txt") + 1);
            newJSONData += data.substring(6 + numberOfDigits);

            FileWriter myWriter = new FileWriter(files.get(files.size() - 1).getAbsolutePath(), true);
            myWriter.write(newJSONData + '\n');
            myWriter.close();
            entries.set(entries.size() - 1, getLines(files.get(files.size() - 1).toString()));

            logger.info(newJSONData);
            logger.info("Successfully wrote to the file: " + files.get(files.size() - 1).getAbsolutePath());
        } catch (IOException e) {
            logger.error("An error occurred.", e);
        }
    }

    public void insert(AlgorithmExecutionDTO data) throws JsonProcessingException {

        ObjectMapper mapper = new ObjectMapper();
        String JSONData = mapper.writeValueAsString(data);
        writeDb(JSONData);
    }

    public void delete(Long id) throws IOException {
        String line = "";

        long indexFile = id / maxPerFile;
        if(id % maxPerFile == 0) indexFile--;

        String filePath = rootPath + "\\myDb" + indexFile + ".txt";

        createDbStorage("temporaryFile.txt");
        FileWriter writer = new FileWriter(rootPath + "\\" + "temporaryFile.txt");
        BufferedReader buffer = new BufferedReader(new FileReader(filePath));

        while((line = buffer.readLine()) != null) {
            //struct: {"id":...

            int index = 6;
            Long lineId = 0L;

            while(isDigit(line.charAt(index))){
                lineId = lineId * 10 + Long.valueOf(line.charAt(index) - 48);
                index++;
            }

            if(!lineId.equals(id)) writer.write(line + '\n');
        }
        buffer.close();
        writer.close();

        File deletedFile = new File(filePath);
        if (deletedFile.delete()) logger.info("Deleted the file: " + deletedFile.getName());
        else logger.error("Failed to delete the file.");

        Path source = Paths.get(rootPath + "\\" + "temporaryFile.txt");
        Files.move(source, source.resolveSibling(filePath));

        entries.set((int) indexFile, getLines(filePath));
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

    public AlgorithmExecutionDTO searchById(Long id) throws IOException, JSONException {
        String line = "";
        AlgorithmExecutionDTO algorithm;

        Long indexFile = id / maxPerFile;
        if(id % maxPerFile == 0) indexFile--;

        String filePath = rootPath + "\\myDb" + indexFile + ".txt";
        BufferedReader buffer = new BufferedReader(new FileReader(filePath));

        while((line = buffer.readLine()) != null) {
            //struct: {"id":...

            int index = 6;
            Long lineId = 0L;

            while(isDigit(line.charAt(index))){
                lineId = lineId * 10 + Long.valueOf(line.charAt(index) - 48);
                index++;
            }

            if(lineId.equals(id)){
                algorithm = convertLineToClass(line);
                buffer.close();
                return algorithm;
            }
            if(lineId > id){
                buffer.close();
                return new AlgorithmExecutionDTO();
            }
        }
        return new AlgorithmExecutionDTO();
    }
}
