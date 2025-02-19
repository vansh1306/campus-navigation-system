package com.example.campusnavigation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/graph-data")
public class NavigationController {

    @Autowired
    private NavigationService navigationService;

    @GetMapping("/shortest-path")
    public ResponseEntity<Map<String, String>> getShortestPath(@RequestParam String start, @RequestParam String end) {
        List<String> path = navigationService.findShortestPath(start, end);
        String pathString = String.join(" → ", path); // Join the path with arrows
        //System.out.println("api is working");

        Map<String, String> response = new HashMap<>();
        response.put("path", pathString);

        return ResponseEntity.ok(response);
    }
}