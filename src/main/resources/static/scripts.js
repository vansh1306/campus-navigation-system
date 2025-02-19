// Coordinates of buildings on the map
const buildings = {
    gate: { x: 50, y: 50 },
    'admin-office': { x: 150, y: 50 },
    hubble: { x: 150, y: 150 },
    'food-court': { x: 200, y: 200 },
    'old-amphitheater': { x: 300, y: 100 },
    block1: { x: 280, y: 150 },
    block2: { x: 350, y: 200 },
    block3: { x: 300, y: 300 },
    block4: { x: 400, y: 150 },
    block5: { x: 350, y: 350 },
    'mac-gym': { x: 500, y: 100 },
    library: { x: 600, y: 200 },
    'design-block': { x: 650, y: 150 },
    'gandhi-chowk': { x: 500, y: 300 },
    'new-amphitheater': { x: 550, y: 400 },
    block9: { x: 600, y: 450 },
    block10: { x: 650, y: 500 },
    block11: { x: 700, y: 550 },
    tulips: { x: 750, y: 600 },
    block12: { x: 800, y: 650 },
    'ground-block': { x: 850, y: 700 },
};

// Graph edges with weights
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
    ['gandhi-chowk', 'tulips', 20],
    ['gandhi-chowk', 'block12', 30],
    ['gandhi-chowk', 'ground-block', 25],
    ['block4', 'food-court', 5],
    ['block4', 'block5', 5],
    ['block5', 'food-court', 5],
    ['block5', 'new-amphitheater', 10],
    ['design-block', 'gandhi-chowk', 10],
    ['design-block', 'ground-block', 20],
    ['design-block', 'block12', 25],
    ['design-block', 'tulips', 20],
    ['new-amphitheater', 'block9', 5],
    ['new-amphitheater', 'tulips', 15],
    ['new-amphitheater', 'block12', 25],
    ['block9', 'tulips', 10],
    ['block9', 'block10', 5],
    ['block10', 'tulips', 5],
    ['block10', 'block11', 55],
    ['block11', 'tulips', 10],
    ['ground-block', 'block12', 5],
];

// Build adjacency list for the graph
const graph = {};
edges.forEach(([src, dest, weight]) => {
    if (!graph[src]) graph[src] = [];
    if (!graph[dest]) graph[dest] = [];
    graph[src].push({ node: dest, weight });
    graph[dest].push({ node: src, weight });
});

// Dijkstra's algorithm to calculate the shortest path
function findShortestPath(start, end) {
    const distances = {};
    const priorityQueue = [];
    const previous = {};

    Object.keys(graph).forEach(node => {
        distances[node] = Infinity;
        previous[node] = null;
    });
    distances[start] = 0;
    priorityQueue.push({ node: start, distance: 0 });

    while (priorityQueue.length > 0) {
        priorityQueue.sort((a, b) => a.distance - b.distance);
        const { node } = priorityQueue.shift();

        if (node === end) {
            const path = [];
            let current = end;
            while (current) {
                path.unshift(current);
                current = previous[current];
            }
            return { distance: distances[end], path };
        }

        graph[node].forEach(neighbor => {
            const newDist = distances[node] + neighbor.weight;
            if (newDist < distances[neighbor.node]) {
                distances[neighbor.node] = newDist;
                previous[neighbor.node] = node;
                priorityQueue.push({ node: neighbor.node, distance: newDist });
            }
        });
    }

    return { distance: Infinity, path: [] };
}

// Event listeners for dropdowns and buttons
document.getElementById("find-path-btn").addEventListener("click", function () {
    const presentLocation = document.getElementById("present-location").value;
    const finalDestination = document.getElementById("final-destination").value;

    if (presentLocation && finalDestination) {
        const result = findShortestPath(presentLocation, finalDestination);
        if (result.distance === Infinity) {
            document.getElementById("distance").innerHTML = `No path found between ${presentLocation} and ${finalDestination}.`;
        } else {
            document.getElementById("distance").innerHTML = `Shortest path: ${result.path.join(' → ')}<br>Distance: ${result.distance} units.`;
        }
    } else {
        document.getElementById("distance").textContent = "Please select both locations to calculate the distance.";
    }
});

function resetSelection() {
    document.getElementById("present-location").value = '';
    document.getElementById("final-destination").value = '';
    document.getElementById("distance").textContent = "Please select two blocks to calculate the distance.";
}

function selectBlock(blockId) {
    const presentLocationDropdown = document.getElementById("present-location");
    const finalDestinationDropdown = document.getElementById("final-destination");

    if (!presentLocationDropdown.value) {
        presentLocationDropdown.value = blockId;
    } else if (!finalDestinationDropdown.value && presentLocationDropdown.value !== blockId) {
        finalDestinationDropdown.value = blockId;
    } else {
        alert("Both locations are already selected! Reset to choose again.");
    }
}
