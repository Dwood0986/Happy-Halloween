// JavaScript code to handle WebGL setup and rendering

document.addEventListener("DOMContentLoaded", function() {
    // Get the canvas element and WebGL context
    const canvas = document.getElementById('pumpkinCanvas');
    const canvas = document.querySelector('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
        alert("Your browser doesn't support WebGL");
        return;
    }

    // Compile shader programs
    const shaders = {
        pumpkin: createShaderProgram(gl, "Pumpkin.glsl"),
        display: createShaderProgram(gl, "Display.glsl"),
        displayTransparent: createShaderProgram(gl, "DisplayTransparent.glsl"),
        scoop: createShaderProgram(gl, "Scoop.glsl"),
        knife: createShaderProgram(gl, "Knife.glsl"),
        floodFill: createShaderProgram(gl, "FloodFillClear.glsl"),
        floodReset: createShaderProgram(gl, "FloodReset.glsl"),
        copy: createShaderProgram(gl, "Copy.glsl"),
    };

    // Set up WebGL states and rendering loop
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Start rendering
    function render() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        // TODO: Render the pumpkin and update based on user interactions
        requestAnimationFrame(render);
    }

    render();
});

function createShaderProgram(gl, vertexShaderId, fragmentShaderId) {
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, document.getElementById(vertexShaderId).text);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, document.getElementById(fragmentShaderId).text);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error("Unable to initialize the shader program:", gl.getProgramInfoLog(shaderProgram));
        return null;
    }
    return shaderProgram;
}

function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("An error occurred compiling the shaders:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}


function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("An error occurred compiling the shaders:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function initializePumpkinTexture(gl) {
    const pumpkinTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, pumpkinTexture);

    // Here we assume you have the pumpkin image loaded and available
    const pumpkinImage = new Image();
    pumpkinImage.src = 'path_to_pumpkin_texture.png'; // Use the correct path

    pumpkinImage.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, pumpkinTexture);
        gl.texImage2D(
            gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, pumpkinImage
        );
        
        // Set texture filtering parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        console.log("Pumpkin texture initialized.");
    };

    return pumpkinTexture;
}

function handleResize(gl, canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', () => {
    handleResize(gl, canvas);
});

// Initialize for the first time
handleResize(gl, canvas);

function setPumpkinUniforms(gl, program, texture) {
    gl.useProgram(program);

    // Example setting up a texture uniform
    const textureLocation = gl.getUniformLocation(program, "u_pumpkinTexture");
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(textureLocation, 0);

    // Example setting up color or other uniforms
    const pumpkinColorLocation = gl.getUniformLocation(program, "u_pumpkinColor");
    gl.uniform3f(pumpkinColorLocation, 0.9, 0.5, 0.2); // Set pumpkin color to an orange shade
}

function render(gl, program, buffers) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(program);

    // Bind the buffer and attributes
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Draw the pumpkin
    gl.drawArrays(gl.TRIANGLES, 0, 6); // Assuming you have set up 6 vertices for two triangles making a quad
    requestAnimationFrame(() => render(gl, program, buffers));
}

let currentTool = 'carve';
let isMouseDown = false;

// Set up event listeners for input controls
canvas.addEventListener('mousedown', (event) => {
    isMouseDown = true;
    // Depending on the tool, start carving or scooping
    if (currentTool === 'carve') {
        startCarving(event);
    } else if (currentTool === 'scoop') {
        startScooping(event);
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        if (currentTool === 'carve') {
            continueCarving(event);
        } else if (currentTool === 'scoop') {
            continueScooping(event);
        }
    }
});

canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
});

function startCarving(event) {
    // Logic for starting a carving stroke
    console.log("Carving started at", event.clientX, event.clientY);
}

function continueCarving(event) {
    // Logic for continuing a carving stroke
    console.log("Carving continued at", event.clientX, event.clientY);
}

function startScooping(event) {
    // Logic for starting a scooping stroke
    console.log("Scooping started at", event.clientX, event.clientY);
}

function continueScooping(event) {
    // Logic for continuing a scooping stroke
    console.log("Scooping continued at", event.clientX, event.clientY);
}
