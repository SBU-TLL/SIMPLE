<p>
Click <a href="media/archive/Simpl-Photoshop-tutorial.pdf">here</a> for a SIMPLE tutorial using Adobe Photoshop.
<br/><br/>
The program that we will use to prepare your image for uploading is called GIMP.  According to <a href="http://www.gimp.org">gimp.org</a>, GIMP (the GNU Image Manipulation Program) "is a freely distributed piece of software for such tasks as photo retouching, image composition and image authoring. It works on many operating systems, in many languages."  The version of GIMP that we suggest using is GIMP Portable, which can be run directly from a thumb drive.
<br/><br/>
We'll go through this tutorial using Microsoft Windows XP.  Click on a link below to skip ahead, or keep scrolling down to start from the beginning.
</p>

<p>
<ul>
 <li><a href="#overview">Overview</a></li>
 <li><a href="#startingwithgimp">Starting With GIMP</a>
  <ul>
   <li><a href="#downloading">Downloading</a></li>
   <li><a href="#wheretokeeptheapplication">Where to keep the application</a></li>
   <li><a href="#runningforthefirsttime">Running for the first time</a></li>
  </ul>
 </li>
 <li><a href="#gettingtoknowgimp">Getting to Know GIMP</a>
  <ul>
   <li><a href="#whereami">Where am I?</a></li>
   <li><a href="#settingupyourworkspace">Setting up your workspace</a></li>
   <li><a href="#selecting">Selecting</a></li>
   <li><a href="#layers">Layers</a></li>
   <li><a href="#saving">Saving</a></li>
  </ul>
 </li>
 <li><a href="#preparingyourimage">Preparing Your Image</a>
  <ul>
   <li><a href="#importing">Importing</a></li>
   <li><a href="#sizingeffects">Sizing/Effects</a></li>
   <li><a href="#layer0">Layer 0</a></li>
   <li><a href="#tracing">Tracing</a></li>
   <li><a href="#newlayer">New layer</a></li>
   <li><a href="#merging">Merging</a></li>
   <li><a href="#finishing">Finishing</a></li>
    <ul>
     <li><a href="#usingthefilltool">Using the fill tool</a></li>
     <li><a href="#usingfilters">Using filters</a></li>
    </ul>
   <li><a href="#exporting">Exporting</a></li>
  </ul>
 </li>
</ul>
</p>

<h1><a name="overview"></a>Overview</h1>
<h1><a name="startingwithgimp"></a>Starting With GIMP</h1>
<h2><a name="downloading"></a>Downloading</h2>
<p>
Go to the Downloads page and select the correct version of GIMP Portable.
<br/>
<br/>Once you reach the sourceforge website, click on this:
<br/>
<br/><img align="center" src="media/archive/sforge1.PNG">
<br/>
<br/>and then you'll see something that looks like this:
<br/><br/><img src="media/archive/sforge2.PNG">
<br/>
<br>Click on the file and save.
</p>
<h2><a name="wheretokeeptheapplication"></a>Where to keep the application</h2>
<p>
In this instance, we decided to download the file directly the the desktop.  Make sure to put it somewhere you can easily find it!
<br/><img src="media/archive/GIMPexe1.PNG">
<br/>If you have a portable USB drive, you might want to use that instead, so you can carry GIMP and the associated files with you to work, school, etc.
</p>
<h2><a name="runningforthefirsttime"></a>Running for the first time</h2>
<p>
We will run GIMP directly from the desktop.
<br/>Install GIMP by double-clicking the downloaded file
<br/><br/><img src="media/archive/GIMPexe2.PNG">
<br/>
<br/>There should now be a new folder called GIMPPortable
<br/>open that folder and double-click the GIMPPortable application inside
<br/><br/><img src="media/archive/GIMPexe3.PNG">
<br/>
<br/>now's a good time to get a cup of coffee
</p>
<h1><a name="gettingtoknowgimp"></a>Getting to Know GIMP <img src="media/archive/theGIMP.png" align="center"></h1>
<h2><a name="whereami"></a>Where am I?</h2>
<p>
By now you should be looking at two windows.  The tops should look like the ones below:
<br/><br/><img src="media/archive/window1.PNG">
<br/>
<br/>The window labeled "The GIMP" is the main window.  From is you can do many things such as open or create a file, view and use a set of editing tools, import images, access extension commands, and get help or tips.  This window also has a set of tools for image editing and a dialog for editing those tools.
<br/>The window labeled "Layers, Channels, Paths, Undo | Brushes, Patterns, Gradients" is... exactly that!  The top half of the window has four tabs (Layers, Channels, Paths, Undo) and the bottom half has three tabs ( Brushes, Patterns, Gradients).  If you change the contents of the window, the label of the window will change too.
</p>
<h2><a name="settingupyourworkspace"></a>Setting Up Your Workspace</h2>
<p>
Before you start editing your image, it's a good idea to set up your workspace.  The first thing we want to do is to make a seperate window for the layers tab.  This is important because easy access to layers will make our job a lot easier later on.  You can do this by click-holding on the layers tab and then dragging it out of the window, like below:
<br/><br/><img src="media/archive/workspace2.PNG">
<br/>
<br/>Another way to make a new layers window is by selecting File>Dialogs>Layers in the main window.
<br/><br/><img src="media/archive/workspace1.PNG">
<br/>
</p>
<h2><a name="selecting"></a>Selecting</h2>
<p>
There are 7 selection tools that we can use to cut and paste.
<br/><img src="media/archive/select1.PNG" align="bottom">shortcut:R - allows you to select a rectangular region by dragging diagonally across the screen
<br/><img src="media/archive/select2.PNG" align="bottom">shortcut:E - allows you to select elliptical regions by dragging diagonally across the screen
<br/><img src="media/archive/select3.PNG" align="bottom">shortcut:F - create a selection by drawing it free-hand while holding down the mouse, when you let go, it will close the region by drawing a straight line from the point where you let go to the point where you first clicked down
<br/><img src="media/archive/select4.PNG" align="bottom">shortcut:Z - select a contiguous area of similar color using just one click
<br/><img src="media/archive/select5.PNG" align="bottom">shortcut:Shift+O - select all areas of similar color using one click
<br/><img src="media/archive/select6.PNG" align="bottom">shortcut:I - instead of tracing an object's outline by freehand, you can click various points along a boundary and this will make a line that sticks like a magnet to the shape of the boundary, creating a selection of the same shape
<br/><img src="media/archive/select7.PNG" align="bottom">shortcut:B - this last tool isn't really a selection tool, but can be used as one.  using the Path Tool, you can create paths that can be used to draw lines, select shapes, or can even be saved to be used later for other uses.  You can create a line from placing nodes, and then go back and edit the nodes to make a smooth, curved path.
</p>
<h2><a name="layers"></a>Layers</h2>
<p>
If you look at the Layers window, you can see what looks like a left-pointing triangle:
<br/><br/><img src="media/archive/layers1.png">
<br/>
<br/>If you click on it, the following menu will pop up, which has another menu inside called the Layers Menu.  This can be useful, especially for things such as deleting a layer, or merging two or more layers together.
<br/><br/><img src="media/archive/layers2.png">
<br/></p>
<h2><a name="saving"></a>Saving</h2>
<p>
As soon as you open an image, save it!
<br/><br/><img src="media/archive/saving2.PNG">
<br/>
<br/>as you can see, our opened image here is rooftop.gif
<br/>we're going to save it as a gimp file
<br/><br/>if you click on the two plus signs, they will expand to give you more options
<br/>"Browse for other folders" will let you choose where to save
<br/>"Select File <u>T</u>ype" will allow you to choose what kind of file you wish to save as.
<br/><br/><img src="media/archive/saving3.PNG">
<br/>
<br/>There are many options, but we will save as a GIMP XCF image until we're ready to upload the finished image to the web.
<br/><br/><img src="media/archive/saving4.png">
</p>
<h1><a name="preparingyourimage"></a>Preparing Your Image</h1>
<h2><a name="importing"></a>Importing</h2>
As soon as you have GIMP up and running, you can import your image and start working on it.
<br/>In the animation below you can see all the steps involved in opening an image.  The file that will be made into an image map, "digestmap.png", is located on the desktop in a folder named "my_new_map".
<br/><br/><img src="media/archive/importing2.gif">
<br/>
<h2><a name="sizingeffects"></a>Sizing/Effects</h2>
Generally, it's a good idea to hold off on the effects until all the cutting/pasting/layering work is complete, but if you need to resize the image, it's usually easiest to do this first.  In this case, we want to trim a little white strip off the bottom.  First, press the "R" key, or click on the square-select tool.  You'll notice that when you mouse over the image there's now a little dashed square that follows it everywhere. To trim the bottom, drag from outside the image.  The black line in the animation below indicates where the mouse click-dragged and the moving dashed line shows what wound up being selected.
<br/><br/><img src="media/archive/cropanim.gif">
<br/>
<br/>In this case, the selected area is to be discarded.  We will use the crop tool because that automatically resizes the image.  Since we are using the crop tool, the selection needs to be inverted to include only what we want to keep.  (another way to do this would have been to first select what we want to keep, but it isn't always a viable option)
<br/><br/><img src="media/archive/sizing2.png">
<br/>
<br/>Now that the selection is inverted, the image is ready to be cropped
<br/><br/><img src="media/archive/sizing3.PNG">
<br/>
<h2><a name="layer0"></a>Layer 0</h2>
Layer 0 is different from the other layers for several reasons.  It is the layer from which the other layers are derived.  It serves as the background of the image map.  Last but not least, the layer name becomes the name of the image map.  To change the layer name, go to the Layers dialog and double click on the layer you wish to change (in this case, the background layer is the only layer there).
<br/><br/><img src="media/archive/layer0.gif">
<br/>
<h2><a name="tracing"></a>Tracing</h2>
Now that the image map is named and the image itself is the size we want it, we'll start tracing layer one.  You may find it easier to trace the image if it's magnified.  Underneath the image there's a menu for this.
<br/><br/><img src="media/archive/tracing1.PNG">
<br/>
<br/>Press the "B" key or click on the path tool.  You'll notice that when you mouse over the image, there's an icon that looks like a fountain pen that follows the mouse and a little status icon which starts in the shape of a box.  Go ahead and make a bunch of points to define an outline for your shape.  If you have a curve or unusual shape, it may help to make extra points.  When you get back to the first point, mouse over it and you'll see indicator change from a set of crosshairs to a set of crossarrows.  Click on the first point and all the points will turn from hollow circles to black circles.  Lastly, press the "Enter" key and a moving dashed line will show the new path you have just created.  If you haven't been saving, now's a good time.
<br/><br/><img src="media/archive/outlining.gif">
<br/><h2><a name="newlayer"></a>New Layer</h2>
After making the path, press "Ctrl-C".  Press "Ctrl-P" to paste the shape and a new layer will appear in the Layers dialog.  Change the layer name.
<h2><a name="merging"></a>Merging</h2>
Sometimes you will want non-contiguous areas to exist as part of the same layer.  To do this, copy and paste all of the areas using "Ctrl-C" and "Ctrl-P", remembering to rename a new layer each time.  Next, arrange the layers one on top of the other. Finally, select the topmost layer of those you wish to combine and merge it with the one under it using the Layers Menu>Merge Down tool.
<br/><br/><img src="media/archive/merge.png">
<br/>
<h2><a name="finishing"></a>Finishing</h2>
Once all of the layers have been created, you must change either Layer 0 or all of the other layers so that there is a clear difference between what will be the moused-over area and the background of the image map.  We will discuss two of the many possible ways to do this.
<h3><a name="usingthefilltool"></a>Using the fill tool</h3>
From the layers dialog, select the layer you wish to work on, and then shift-click on the eye icon so that only that layer is visible. Press the "Z" key and click on the area surrounding the shape(s) contained within the layer.  Everything should be selected except for the shape(s) which were previously pasted into the layer from the original picture.  Invert the selection.
<br/><br/><img src="media/archive/invert.png">
<br/>
<br/>Press "Shift-B" or select the fill tool.  In the image below, you can see where the Fill Type can be selected and where to change the options for each fill type.  Also, it's very important to select "Fill whole selection" for the Affected Area.  If you do not do this, the areas you selected will not be completely filled.
<br/><br/><img src="media/archive/fill1.png">
<br/>
<h3><a name="usingfilters"></a>Using Filters</h3>
Choose the background layer (Layer 0) and "Shift-click" the eye so it's the only one visible layer.  Once you are sure that you are working on the background layer, select the "Filters" tab above the image and navigate to Colors>Colorify.
<br/><br/><img src="media/archive/Filters1.png">
<br/>
<br/>A new dialog will pop up, showing the a preview of the image with the applied filter.  The default setting is for grayscale, which is what we want, so all we have to do is press ok.
<h2><a name="exporting"></a>Exporting</h2>
We will export the image as a .psd file, but before we do that, we want to be sure of a few things:
<ul>
<li>Layer 0 is named for the title of the image map</li>
<li>make sure that Layer 0 is the only visible layer</li>
<li>each pasted layer is named appropriately</li>
<li>there is a clear contrast between the pasted layers and the original image</li>
Go to File>Save as
<br/><br/><img src="media/archive/savepsd2.png">
<br/>
<br/>select "Photoshop image" under "Select File Type"
<br/><br/><img src="media/archive/savepsd.png">
<br/>
<br/>
<br/>
upload your image using the <a href="?p=simpl_uploader">SIMPLE Uploader</a></li>
