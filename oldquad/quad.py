#!/usr/bin/python
import numpy as np
import math
import sys
import json
import copy
np.set_printoptions(threshold=np.nan)

filledBranches={"children":[]}
def loadPBM(pbmName):
	f=  open(sys.argv[1]+pbmName)
	lines=f.readlines()
	width,height=np.array(lines[1].strip().split(" ")).astype(int)
	padWidth=pow(2,len(bin(width-1))-2)
	padHeight=pow(2,len(bin(height-1))-2)
	maxPad=max(padWidth,padHeight)
	padDepth=maxPad
	numberlist=[]
	for a in lines[2:]:
        	for b in a.strip().split(" "):
                	numberlist.append(1-int(b))
	newRect= np.zeros(shape=(maxPad,maxPad))
	for i in range(len(numberlist)):
		m=int(i/width)
		n=i%width
		newRect[n][m]=numberlist[i]
	return newRect,width,height
def quad(point, size):
        distance =  size/2
        branch={}
        branch["point"]=point
        branch["size"]=size
        branch["children"]=[]
        branch["distance"]=distance
        branch["currentLayer"]=currentLayer
	newpoint = [0,0]
        isFilled=True
        isEmpty=True
        if (size>1):
                children=[]
                for i in range(4):
                        currentChild={}
                        bin1 = int(i / 2);
                        bin2 = (i % 2);
                        #print(bin1,bin2)
                        newpointY = point[0] + bin1 * distance
                        newpointX = point[1] + bin2 * distance
                        currentChild=quad([newpointY,newpointX], distance)
                        children.append(currentChild)
                        isFilled = (currentChild["isFilled"]) and isFilled
                        isEmpty = (currentChild["isEmpty"]) and isEmpty
                if (not isFilled) and (not isEmpty):
                        branch["children"]=  children
        else:

                if newRect[point[1]][point[0]] == 1:
                        isFilled = True
                        isEmpty = False
                else:
                    isFilled = False
                    isEmpty = True
        branch["isFilled"] = isFilled
        branch["isEmpty"] = isEmpty
        if isFilled:
		showBranch={}
		x,y=branch["point"]
		showBranch["point"]=[float(y)/width*100,float(x)/height*100]
		showBranch["distance"]=float(branch["size"])/width*100
                showBranch['currentLayer']=branch["currentLayer"]
                filledBranches["children"].append(showBranch)
        #print branch
        return branch
def makeHref(rectArray):
	a="<style>.map{position:absolute;background-color:green;border:1px solid blue;}</style>"
	for i in rectArray:
		a+="<a href='#' class='{0} map' style='left:{1}%;top:{2}%;width:{3}%;height:{3}%'></a>".format(i["currentLayer"],i["point"][0],i["point"][1],i["distance"])
	print a


for i in range(2,int(sys.argv[2])):
	newRect,width,height=loadPBM('-'+str(i)+'.pbm')
	currentLayer=i
	
	quad([0,0],len(newRect[0]))

makeHref(filledBranches["children"])
#print json.dumps(filledBranches,indent=4, sort_keys=True)
