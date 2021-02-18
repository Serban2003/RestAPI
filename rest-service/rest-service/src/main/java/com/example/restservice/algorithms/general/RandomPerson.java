package com.example.restservice.algorithms.general;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class RandomPerson {
    String[] name = new String[]{"Boeru Cezara", "Bogătoiu Paula", "Brandabur Flavius", "Camară Diana", "Caplat Miruna", "Ciobanu Răzvan", "Cojocariu Alexandra", "Constandiș Andreea", "Copăcel Ștefania",
            "Crețu Tudor", "Darie Teodora", "Dobrin Cătălina", "Iftimie Vlad", "Isachi Cristi", "Lupascu Karmen", "Martin Alexandru", "Martiș Robert", "Munteanu Ștefan", "Nichifor Elena", "Radu Daniela",
            "Sava Andrei", "Șandru Andrada", "Șchiopu Ana Maria", "Șerban Iustinian", "Tănasă Ștefania", "Triandafil Maria", "Tudoreanu Ema", "Vartolomei Emilia"};

    List<String> alreadyPicked = new ArrayList<>();
    Integer index;

    public String getRandomPerson(){
        Random random = new Random();

        index = random.nextInt(27 + 1);
        String result = name[index];

        if(verify(result)) return result;
        else return getRandomPerson();
    }

    private boolean verify(String result) {

        if(alreadyPicked.size() == 27) alreadyPicked.clear();

        for (String s : alreadyPicked)
            if (s.equals(result)) return false;

        alreadyPicked.add(result);
        return true;
    }
}
