# Happy-Halloween
A group of different applications for Halloween fun!
The provided HTML code represents the structure of a user interface for a "Pumpkin Carving Simulator." The `<body>` tag contains several nested `<div>` elements, each serving a specific purpose within the application.

The main container, identified by the `id="uipanel"`, holds the primary user interface elements. Within this container, there is a <`div`> with the `id="menu"`, which includes various controls and options for the simulator. This menu is divided into several sections using inline-block styling to align elements horizontally.

The first section within the menu contains a table with options to configure the environment, floor, and pumpkin. Each row in the table includes a button (represented by a wrench icon) and a corresponding dropdown or button for selecting different settings like background environments, floor types, and pumpkin configurations.

The second section of the menu provides buttons for actions such as creating a new project, loading, saving, rendering, and accessing the help guide. These buttons are styled to appear as clickable elements.

The third section includes tools for carving, scooping, flood filling, and clearing the pumpkin. Each tool is represented by an image and a label, and the currently selected tool is highlighted with the <`btn_sel`> class.

The fourth section allows users to adjust the size and depth of the tools using range input sliders.

Additionally, there are several side panels <`div`> that are initially hidden (`style="display:none;"`). These panels provide detailed configuration options for the environment, floor, and pumpkin. Each panel includes various input elements like color pickers, range sliders, and buttons for loading custom settings.

The [`renderpanel`] and [`renderingpanel`] provide options and status updates for rendering the pumpkin scene. The [`resultpanel`] displays the rendered result, allowing users to save or copy the image.

The [`guidepanel`] offers a help guide with instructions on how to use the simulator, including controls for mouse and touch interactions, and explanations for common questions.

The [`creditspanel`]acknowledges the creators and contributors of the simulator, listing the assets used and providing a link to download the source code.

Finally, the [`confirmpanel`] and [`errorpanel`] are used for confirmation dialogs and error messages, respectively, ensuring that users are informed of important actions and issues.

Overall, the HTML code is well-structured to provide a comprehensive and interactive user interface for the Pumpkin Carving Simulator, with various options and tools for customizing and rendering a virtual pumpkin.


There are issues still with the rendering of the simulated pumpkin image for some reason. If anyone knows what I am doing wrong I would greatly appreciate the advice. Happy coding!
