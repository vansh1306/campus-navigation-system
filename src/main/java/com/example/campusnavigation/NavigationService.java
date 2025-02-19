package com.example.campusnavigation;

import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.List;

@Service
public class NavigationService {
    private final Graph graph = new Graph();

    @PostConstruct
    public void init() {
        // Adding more locations and edges with weights
//        graph.addEdge("A", "B", 1);
//        graph.addEdge("A", "C", 4);
//        graph.addEdge("B", "C", 2);
//        graph.addEdge("B", "D", 5);
//        graph.addEdge("C", "D", 1);
//        graph.addEdge("A", "E", 7);
//        graph.addEdge("E", "D", 3);
//        graph.addEdge("C", "F", 2);
//        graph.addEdge("D", "F", 3);
//        graph.addEdge("F", "G", 1);
//        graph.addEdge("E", "G", 5);
//        graph.addEdge("Block 1", "Library", 8);
        graph.addEdge("Gate", "Admin Office", 10);
        graph.addEdge("Gate", "Hubble", 15);
        graph.addEdge("Gate", "Food Court", 20);

        graph.addEdge("Admin Office", "Old Amphitheater", 15);
        graph.addEdge("Admin Office", "Block 1", 10);
        graph.addEdge("Admin Office", "Hubble", 5);
        graph.addEdge("Admin Office", "MAC/GYM", 20);

        graph.addEdge("Hubble", "Block 1", 5);
        graph.addEdge("Hubble", "Food Court", 10);
        graph.addEdge("Hubble", "Block 4", 10);

        graph.addEdge("Block 1", "Block 4", 5);
        graph.addEdge("Block 1", "Block 2", 5);
        graph.addEdge("Block 1", "Old Amphitheater", 5);

        graph.addEdge("Old Amphitheater", "Block 2", 10);
        graph.addEdge("Old Amphitheater", "MAC/GYM", 5);
        graph.addEdge("Old Amphitheater", "Library", 10);
        graph.addEdge("Old Amphitheater", "Design Block", 15);
        graph.addEdge("Old Amphitheater", "Gandhi Chowk", 25);

        graph.addEdge("Library", "MAC/GYM", 10);
        graph.addEdge("Library", "Design Block", 5);
        graph.addEdge("Library", "Gandhi Chowk", 15);

        graph.addEdge("Block 2", "Block 4", 10);
        graph.addEdge("Block 2", "Block 3", 5);
        graph.addEdge("Block 2", "Block 5", 15);

        graph.addEdge("Block 3", "Gandhi Chowk", 5);
        graph.addEdge("Block 3", "Block 4", 15);
        graph.addEdge("Block 3", "Block 5", 10);
        graph.addEdge("Block 3", "New Amphitheater", 5);

        graph.addEdge("Gandhi Chowk", "New Amphitheater", 5);
        graph.addEdge("Gandhi Chowk", "Block 9", 10);
        graph.addEdge("Gandhi Chowk", "Block 10", 15);
        graph.addEdge("Gandhi Chowk", "Block 11", 20);
        graph.addEdge("Gandhi Chowk", "Tulip", 20);
        graph.addEdge("Gandhi Chowk", "Block 12", 30);
        graph.addEdge("Gandhi Chowk", "Ground", 25);

        graph.addEdge("Block 4", "Food Court", 5);
        graph.addEdge("Block 4", "Block 5", 5);

        graph.addEdge("Block 5", "Food Court", 5);
        graph.addEdge("Block 5", "New Amphitheater", 10);

        graph.addEdge("Design Block", "Gandhi Chowk", 10);
        graph.addEdge("Design Block", "Ground", 20);
        graph.addEdge("Design Block", "Block 12", 25);
        graph.addEdge("Design Block", "Tulip", 20);

        graph.addEdge("New Amphitheater", "Block 9", 5);
        graph.addEdge("New Amphitheater", "Tulip", 15);
        graph.addEdge("New Amphitheater", "Block 12", 25);

        graph.addEdge("Block 9", "Tulip", 10);
        graph.addEdge("Block 9", "Block 10", 5);

        graph.addEdge("Block 10", "Tulip", 5);
        graph.addEdge("Block 10", "Block 11", 55);

        graph.addEdge("Block 11", "Tulip", 10);

        graph.addEdge("Ground", "Block 12", 5);
    }

    public List<String> findShortestPath(String start, String end) {
        return graph.dijkstra(start, end);
    }
}