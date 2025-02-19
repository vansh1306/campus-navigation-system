package com.example.campusnavigation;

import java.util.*;

public class Graph {
    private final Map<String, List<Edge>> adjList = new HashMap<>();

    public void addEdge(String source, String destination, int weight) {
        adjList.putIfAbsent(source, new ArrayList<>());
        adjList.putIfAbsent(destination, new ArrayList<>());
        adjList.get(source).add(new Edge(destination, weight));
        adjList.get(destination).add(new Edge(source, weight)); // For undirected graph
    }

    public List<String> dijkstra(String start, String end) {
        Map<String, Integer> distances = new HashMap<>();
        Map<String, String> previous = new HashMap<>();
        PriorityQueue<Edge> pq = new PriorityQueue<>(Comparator.comparingInt(edge -> edge.weight));

        for (String vertex : adjList.keySet()) {
            distances.put(vertex, Integer.MAX_VALUE);
            previous.put(vertex, null);
        }

        distances.put(start, 0);
        pq.add(new Edge(start, 0));

        while (!pq.isEmpty()) {
            String current = pq.poll().destination;

            if (current.equals(end)) {
                break;
            }

            for (Edge edge : adjList.get(current)) {
                int newDist = distances.get(current) + edge.weight;
                if (newDist < distances.get(edge.destination)) {
                    distances.put(edge.destination, newDist);
                    previous.put(edge.destination, current);
                    pq.add(new Edge(edge.destination, newDist));
                }
            }
        }

        return buildPath(previous, start, end);
    }

    private List<String> buildPath(Map<String, String> previous, String start, String end) {
        List<String> path = new LinkedList<>();
        for (String at = end; at != null; at = previous.get(at)) {
            path.add(at);
        }
        Collections.reverse(path);
        return path.size() > 1 && path.get(0).equals(start) ? path : Collections.emptyList();
    }

    public Map<String, List<String>> getAdjacencyList() {
        Map<String, List<String>> result = new HashMap<>();
        for (Map.Entry<String, List<Edge>> entry : adjList.entrySet()) {
            List<String> neighbors = new ArrayList<>();
            for (Edge edge : entry.getValue()) {
                neighbors.add(edge.destination);
            }
            result.put(entry.getKey(), neighbors);
        }
        return result;
    }

    private static class Edge {
        String destination;
        int weight;

        Edge(String destination, int weight) {
            this.destination = destination;
            this.weight = weight;
        }
    }
}
