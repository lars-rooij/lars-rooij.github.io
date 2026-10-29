// course tags: ArtificialCreatures, CollaborativeAndMultimodelInteraction, CreativeComputation, PhysicalComputing, Prototyping, StrategiesInPerformingArts, TangibleAndPlayfullResearch


// gets shown in this order. new assingments should go at the top.
const assignments = [
    {
        title: "The limits of Recognition",
        description: "Develop your own narrative for a sixth strategy regarding the creation of art.",
        tags: [ "writing", "essay", "StrategiesInPerformingArts"], 
        url: "assignments/strategies-ass2.html"
    },
    {
        title: "Interactive Shader",
        description: "Make an animated, interactive shader piece in p5.strands.",
        tags: [ "code", "programming", "interactive", "3Dmodeling", "3D", "CreativeComputation"], 
        url: "assignments/creaComp-hw6.html"
    },
    {
        title: "3 Prototypes exploring Movement",
        description: "Create 3 materialised prototypes that explore movement, without using glue.",
        tags: [ "3D", "physical", "material", "study", "sketch", "Prototyping"], 
        url: "assignments/prototyping-final.html"
    },   
    {
        title: "KinderEgg 3D Model",
        description: " In OpenSCAD, make a little 3D model that can fit within a Kinder Surprise Egg",
        tags: [ "code", "programming", "drawing", "3Dmodeling", "3D", "CreativeComputation"], 
        url: "assignments/creaComp-hw5.html"
    },
    {
        title: "Generative 3D Model",
        description: "Make a 3D model based around coding grammar",
        tags: [ "code", "programming", "drawing", "3Dmodeling", "3D", "CreativeComputation"], 
        url: "assignments/creaComp-hw4.html"
    },
    {
        title: "2D 2 3D",
        description: "Bring in 15 flat materials, and turn them into something 3D",
        tags: [ "3D", "physical", "material", "study", "sketch", "Prototyping"], 
        url: "assignments/prototyping-5.html"
    }, 
    {
        title: "75 Digital/Physical experiments",
        description: "Experiment with a physical material, and convert that small material into a 3D-model",
        tags: [ "3Dmodeling", "physical", "sketch", "Prototyping"], 
        url: "assignments/prototyping-4.html"
    },
    {
        title: "Structuralism in 2 works",
        description: "Compare one of the thusfar discussed works to a similair one within the strategy.",
        tags: [ "writing", "essay", "StrategiesInPerformingArts"], 
        url: "assignments/strategies-ass1.html"
    },
    {
        title: "Simple Sketchpad",
        description: "Using p5.js, make a simple interactive sketchpad based on input events. ",
        tags: [ "code", "programming", "javascript", "drawing", "interactive", "p5.js", "CreativeComputation"], 
        url: "assignments/creaComp-hw3.html"
    },
    {
        title: "Word Story Animation",
        description: "Using p5.js, signify the meaning of a word by animating only the word and symbol. ",
        tags: [ "code", "programming", "javascript", "drawing", "animation", "p5.js", "CreativeComputation"], 
        url: "assignments/creaComp-hw2.html"
    },
    {
        title: "15 Things",
        description: "Note 15 things that can be (done with) a [blank].",
        tags: [ "warm-up", "drawing", "doodle", "sketch", "Prototyping"], 
        url: "assignments/prototyping-3.html"
    },
    {
        title: "Colourpick Portrait",
        description: "Using a Colourpicker tool in p5.js, recreate a pattern representing a portrait of yourself.",
        tags: [ "code", "programming", "javascript", "drawing", "photography", "p5.js", "CreativeComputation"], 
        url: "assignments/creaComp-hw1.html"
    },
    {
        title: "50 shapes in 5 minutes",
        description: "5 variations and 10 itterations of some shapes. Creative Warm-up.",
        tags: [ "warm-up", "drawing", "doodle", "sketch", "Prototyping"], 
        url: "assignments/prototyping-2.html"
    },
    {
        title: "105 Pictures",
        description: "Weekly goal of taking 15 pictures of anything.",
        tags: ["photography", "Prototyping"],
        url: "assignments/prototyping-1.html"
    }
];

function normalize(value) {
    return value.toLowerCase().trim();
}

function searchAssignments(query) {
    const searchTerms = normalize(query)
        .split(/\s+/)
        .filter(term => term.length > 0);

    if (searchTerms.length === 0) {
        return assignments;
    }

    return assignments.filter(assignment => {
        const searchableText = normalize([
            assignment.title,
            assignment.description,
            ...assignment.tags
        ].join(" "));

        return searchTerms.every(term =>
            searchableText.includes(term)
        );
    });
}


function displayResults(foundAssignments) {
    const results = document.querySelector("#search-results");

    results.innerHTML = "";

    if (foundAssignments.length === 0) {
        results.innerHTML = `
            <div class="column">
                <h2>No assignments found</h2>
                <p>Try searching for another title, skill or tag. Tags should be seperated by a space only.</p>
            </div>
        `;
        return;
    }

    foundAssignments.forEach(assignment => {
        const result = document.createElement("a");

        result.className = "search-result";
        result.href = assignment.url;

        result.innerHTML = `
            <h2>${assignment.title}</h2>
            <p>${assignment.description}</p>
            <div class="search-tags">
                ${assignment.tags.join(" ✰ ")}
            </div>
        `;

        results.appendChild(result);
    });
}

function displayCourseAssignments(tag) {
    const results = document.querySelector("#course-assignments");

    if (!results) {
        return;
    }

    const normalizedTag = normalize(tag);

    const courseAssignments = assignments.filter(assignment =>
        assignment.tags.some(assignmentTag =>
            normalize(assignmentTag) === normalizedTag
        )
    );

    results.innerHTML = "";

    if (courseAssignments.length === 0) {
        results.innerHTML = `
            <article class="column">
                <h2>No assignments found</h2>
                <p>No assignments are currently tagged with "${tag}".</p>
            </article>
        `;
        return;
    }

    courseAssignments.forEach(assignment => {
        const result = document.createElement("a");

        result.className = "search-result";
        result.href = `../${assignment.url}`;

        result.innerHTML = `
            <h2>${assignment.title}</h2>
            <p>${assignment.description}</p>
            <div class="search-tags">
                ${assignment.tags.join(" ✰ ")}
            </div>
        `;

        results.appendChild(result);
    });
}


function performSearch(query) {
    const foundAssignments = searchAssignments(query);
    displayResults(foundAssignments);

    const url = new URL(window.location);

    if (query.trim()) {
        url.searchParams.set("q", query);
    } else {
        url.searchParams.delete("q");
    }

    window.history.replaceState({}, "", url);
}

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

if (searchForm && searchInput) {
    searchForm.addEventListener("submit", event => {
        event.preventDefault();
        performSearch(searchInput.value);
    });

    const initialQuery = new URLSearchParams(window.location.search).get("q") || "";

    searchInput.value = initialQuery;
    displayResults(searchAssignments(initialQuery));
}

function goToRandomAssignment() {
    const randomIndex = Math.floor(Math.random() * assignments.length);
    const randomAssignment = assignments[randomIndex];

    window.location.href = randomAssignment.url;
}
