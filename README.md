# SIMPLE - SuperHandsBJS Image Mapping Program for Learning Everything

## Project Overview

SIMPLE is a web application that allows users to create interactive online image maps from layered Adobe PhotoShop (.psd) or GIMP (.xcf) files. The application is designed to be used in an educational context, allowing instructors to create engaging learning materials with interactive diagrams and images.

The name "SIMPLE" is an acronym for "SuperHandsBJS Image Mapping Program for Learning Everything".

## Architecture

The application consists of a PHP-based frontend and a Python backend for image processing.

*   **Frontend:** The frontend is built with PHP, HTML, CSS, and JavaScript. It provides the user interface for uploading images, viewing the interactive image maps, and managing content.
*   **Backend:** The backend consists of a set of Python scripts that use the `numpy` library to perform image processing. The core script, `quadJSONsmall.py`, uses a quadtree algorithm to partition the image into interactive regions.

## Workflow

The process of creating an interactive image map with SIMPLE is as follows:

1.  **Prepare the Image:** The user creates a layered image in Adobe PhotoShop or GIMP. Each layer that should be interactive is saved as a separate entity.
2.  **Upload the Image:** The user uploads the layered image file through the "SIMPLE Uploader" interface.
3.  **Image Processing:** The application's backend processes the uploaded image. This involves the following steps:
    *   The layered image is broken down into individual layers.
    *   Each layer is converted into a PBM (Portable BitMap) file.
    *   The `quadJSONsmall.py` script is executed for each PBM file. This script builds a quadtree from the image data and extracts the coordinates of the interactive regions.
    *   The output of the Python script is a JSON file (`imageMap.json`) that contains the data for the interactive image map.
4.  **Display the Image Map:** The frontend uses the generated `imageMap.json` file to render the interactive image map in the browser.

## Key Files and Directories

*   `index.php`: The main entry point of the application. It handles routing to the different pages.
*   `quadJSONsmall.py`: The core Python script for image processing. It generates the quadtree data for the interactive image maps.
*   `remakeJSON.sh`: A shell script used to regenerate the `imageMap.json` files for all existing image maps.
*   `/css`: Contains the CSS stylesheets for the application.
*   `/js`: Contains the JavaScript files for the application.
*   `/media`: Contains static media assets such as images and logos.
*   `/pages`: Contains the PHP files for the different pages of the application (e.g., "Home", "Online Examples", "SIMPLE Uploader").
*   `/uploads_old`: This directory appears to be a backup or old version of the `uploads` directory, containing user-uploaded images and generated image map data, organized by username.

## Getting Started

To run this project, you will need a web server with PHP support (e.g., Apache) and Python with the `numpy` library installed.

1.  Clone the repository to your web server's document root.
2.  Make sure the `uploads` directory is writable by the web server.
3.  Install the required Python libraries: `pip install numpy`
4.  Access the application in your web browser.

## For Maintainers

*   The core image processing logic is in `quadJSONsmall.py`. Understanding this script is crucial for maintaining and extending the application's image mapping capabilities.
*   The `remakeJSON.sh` script demonstrates how to run the `quadJSONsmall.py` script with the correct arguments. This can be useful for debugging or for batch-processing images.
*   The application relies on the structure of the layered image files. Changes to the image processing pipeline may require adjustments to the instructions for preparing the images.
*   The `uploads_old` directory suggests that there might be a corresponding `uploads` directory in the live environment, which is not present in this repository. This directory would contain the user-uploaded images and the generated image map data.