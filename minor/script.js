function createBidirectionalGraph(edges) {
    const graph = {};

    edges.forEach(([node1, node2, weight]) => {
        if (!graph[node1]) graph[node1] = {};
        if (!graph[node2]) graph[node2] = {};

        graph[node1][node2] = weight; // Forward direction
        graph[node2][node1] = weight; // Reverse direction
    });

    return graph;
}
const edges = [
    ['gate', 'admin-office', 10],
    ['gate', 'hubble', 15],
    ['gate', 'food-court', 20],

    ['admin-office', 'old-amphitheater', 15],
    ['admin-office', 'block1', 10],
    ['admin-office', 'hubble', 5],
    ['admin-office', 'mac-gym', 20],

    ['hubble', 'block1', 5],
    ['hubble', 'food-court', 10],
    ['hubble', 'block4', 10],

    ['block1', 'block4', 5],
    ['block1', 'block2', 5],
    ['block1', 'old-amphitheater', 5],

    ['old-amphitheater', 'block2', 10],
    ['old-amphitheater', 'mac-gym', 5],
    ['old-amphitheater', 'library', 10],
    ['old-amphitheater', 'design-block', 15],
    ['old-amphitheater', 'gandhi-chowk', 25],

    ['library', 'mac-gym', 10],
    ['library', 'design-block', 5],
    ['library', 'gandhi-chowk', 15],

    ['block2', 'block4', 10],
    ['block2', 'block3', 5],
    ['block2', 'block5', 15],

    ['block3', 'gandhi-chowk', 5],
    ['block3', 'block4', 15],
    ['block3', 'block5', 10],
    ['block3', 'new-amphitheater', 5],

    ['gandhi-chowk', 'new-amphitheater', 5],
    ['gandhi-chowk', 'block9', 10],
    ['gandhi-chowk', 'block10', 15],
    ['gandhi-chowk', 'block11', 20],
    ['gandhi-chowk', 'tulip', 20],
    ['gandhi-chowk', 'block12', 30],
    ['gandhi-chowk', 'ground', 25],

    ['block4', 'food-court', 5],
    ['block4', 'block5', 5],

    ['block5', 'food-court', 5],
    ['block5', 'new-amphitheater', 10],

    ['design-block', 'gandhi-chowk', 10],
    ['design-block', 'ground', 20],
    ['design-block', 'block12', 25],
    ['design-block', 'tulip', 20],

    ['new-amphitheater', 'block9', 5],    
    ['new-amphitheater', 'tulip', 15],    
    ['new-amphitheater', 'block12', 25],    

    ['block9', 'tulip', 10],
    ['block9', 'block10', 5],

    ['block10', 'tulip', 5],
    ['block10', 'block11', 55],

    ['block11', 'tulip', 10],

    ['ground', 'block12', 5],
];

const graph = createBidirectionalGraph(edges);
function dijkstra(graph, start, end) {
    const distances = {}; // Shortest distances from start to each node
    const visited = {}; // Track visited nodes
    const previous = {}; // For reconstructing the shortest path
    const priorityQueue = [{ node: start, distance: 0 }]; // Priority queue

    // Initialize distances with Infinity and start node as 0
    Object.keys(graph).forEach(node => distances[node] = Infinity);
    distances[start] = 0;

    while (priorityQueue.length > 0) {
        // Sort queue by distance and process the closest node
        priorityQueue.sort((a, b) => a.distance - b.distance);
        const { node: currentNode, distance: currentDistance } = priorityQueue.shift();

        if (visited[currentNode]) continue;
        visited[currentNode] = true;

        // Update distances for neighbors
        for (const neighbor in graph[currentNode]) {
            const weight = graph[currentNode][neighbor];
            const totalDistance = currentDistance + weight;

            if (totalDistance < distances[neighbor]) {
                distances[neighbor] = totalDistance;
                previous[neighbor] = currentNode;
                priorityQueue.push({ node: neighbor, distance: totalDistance });
            }
        }

        // Stop if we reached the end node
        if (currentNode === end) break;
    }

    // Check if the end node is reachable
    if (distances[end] === Infinity) {
        return { distance: Infinity, path: [] }; // No path found
    }

    // Reconstruct the shortest path
    const path = [];
    let current = end;
    while (current) {
        path.unshift(current);
        current = previous[current];
    }

    return { distance: distances[end], path };
}

function selectBlock(blockId) {
    const presentLocationDropdown = document.getElementById("present-location");
    const finalDestinationDropdown = document.getElementById("final-destination");

    if (!presentLocationDropdown.value) {
        presentLocationDropdown.value = blockId; // Set the present location
        highlightBuilding(blockId); // Highlight the selected building
    } 
    // Check if the final destination is not selected and is not the same as present location
    else if (!finalDestinationDropdown.value && presentLocationDropdown.value !== blockId) {
        finalDestinationDropdown.value = blockId; // Set the final destination
        highlightBuilding(blockId); // Highlight the selected building
    } 
    // If both locations are already selected or the same building is clicked twice
    else if (presentLocationDropdown.value === blockId || finalDestinationDropdown.value === blockId) {
        alert("You cannot select the same location twice. Please reset or choose another block.");
    } 
    // If both locations are selected but a new block is clicked
    else {
        alert("Both locations are already selected! Reset to choose again.");
    }
}

function resetSelection() {
    document.getElementById("present-location").value = '';
    document.getElementById("final-destination").value = '';
    document.getElementById("distance").innerHTML = "Please select both locations to calculate the distance.";
    // Remove highlight from all buildings
    document.querySelectorAll(".building").forEach(building => building.classList.remove("highlight"));
}

function highlightBuilding(blockId) {
    document.querySelectorAll(".building").forEach(building => building.classList.remove("highlight"));
    const selectedBuilding = document.getElementById(blockId);
    if (selectedBuilding) selectedBuilding.classList.add("highlight");
}

// Event listener for "Find Shortest Path" button
document.getElementById("find-path-btn").addEventListener("click", function () {
    const presentLocation = document.getElementById("present-location").value;
    const finalDestination = document.getElementById("final-destination").value;

    if (presentLocation && finalDestination) {
        const { distance, path } = dijkstra(graph, presentLocation, finalDestination);

        // Display the shortest path and distance
        if (distance !== Infinity) {
            document.getElementById("distance").innerHTML = 
                `Shortest path: ${path.join(" → ")}<br>Distance: ${distance} units`;
        } else {
            document.getElementById("distance").innerHTML = "No path available.";
        }
    } else {
        document.getElementById("distance").innerHTML = "Please select both locations.";
    }
});

// Event listeners for dropdowns to highlight buildings when a selection is made
document.getElementById("present-location").addEventListener("change", function () {
    const selectedLocation = this.value;
    if (selectedLocation) {
        highlightBuilding(selectedLocation);
    }
});

document.getElementById("final-destination").addEventListener("change", function () {
    const selectedLocation = this.value;
    if (selectedLocation) {
        highlightBuilding(selectedLocation);
    }
});
