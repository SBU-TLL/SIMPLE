import numpy as np
import math
import sys
import json
import copy
np.set_printoptions(threshold=np.nan)

def loadPBM(pbmName, newRect, idx):
	f = open(sys.argv[1]+pbmName)
	lines=f.readlines()
	width,height=np.array(lines[1].strip().split(" ")).astype(int)
	padWidth=pow(2,len(bin(width-1))-2)
	padHeight=pow(2,len(bin(height-1))-2)
	maxPad=max(padWidth,padHeight)
	padDepth=maxPad
	numberlist=[]

	for a in lines[2:]:
		for b in a.strip().split(" "):
			if not int(b)==1:
				val=int(idx)
			else:
				val=1
			numberlist.append(val)

	#if not array
	#print isinstance(newRect, list)
	
	if len(newRect)==0:
		
		newRect=np.zeros(shape=(maxPad,maxPad))

	for i in range(len(numberlist)):
		m=int(i/width)
		n=i%width
		if not numberlist[i]==1 and newRect[n][m]==0:
			newRect[n][m]=int(numberlist[i])


	return newRect,width,height

#newRect=[[1,1,1,1],[1,0,1,1],[1,1,1,1],[1,1,1,1]]
#print newRect

#filledBranches={"children":[]}
jsonData={}
filledBranches=[]
def quad(point, size, id):
	distance = size/2
	branch={}
	branch["point"]=point
	branch["size"]=size
	branch["children"]=[]
	isFilled = True
	fill = -1
	if (size>1):
		children=[]
		for i in range(4):
			currentChild={}
			bin1 = int(i / 2);
			bin2 = (i % 2);
			#print(bin1,bin2)
			newpointY = point[0] + bin1 * distance
			newpointX = point[1] + bin2 * distance
			currentChild=quad([newpointY,newpointX], distance, id)
			if i>0: 
				if not fill == currentChild["id"]:
					isFilled = False
			children.append(currentChild)
			fill = currentChild["id"]
			if not currentChild["isFilled"]:
				isFilled = False
			
		if (not isFilled):
			branch["children"] = children

	else:
		fill = int(newRect[point[1]][point[0]])
		isFilled = True
	branch["isFilled"] = isFilled
	branch["id"] = fill

	# if isFilled:
# 		branch["children"].append(branch)
	#print branch
	return branch
#quadtree = quad([0,0],maxPad)
newRect=[]

for i in range(2, int(sys.argv[2])):
    newRect,width,height=loadPBM('-'+str(i)+'.pbm',newRect,i)
    currentLayer=i
filledBranches.append(quad([0,0],len(newRect[0]),i))
#del filledBranches['isFilled']

jsonData["mapWidth"]=width
jsonData["mapHeight"]=height
jsonData["branches"]=filledBranches

#print filledBranches
jsonText = json.dumps(jsonData,indent=4, sort_keys=True)
jsonText = jsonText.replace("point", "pt")
jsonText = jsonText.replace("size", "sz")
jsonText = jsonText.replace("children", "cd")
jsonText = jsonText.replace("isFilled", "iF")


print jsonText
#print json.dumps(cullEmpties(quad([0,0],maxPad)), indent=4, sort_keys=True)
#print newRect

#quad([0,0],maxPad)
