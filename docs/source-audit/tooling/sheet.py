import sys,os
from PIL import Image
out=sys.argv[1]; files=sys.argv[2:]; W=420; H=1900
ims=[]
for f in files:
    im=Image.open(f); w,h=im.size; s=W/w; im=im.resize((W,int(h*s)))
    ims.append(im.crop((0,0,W,min(H,im.size[1]))))
sheet=Image.new('RGB',(W*len(ims)+10*(len(ims)-1),H),'white')
for i,im in enumerate(ims): sheet.paste(im,(i*(W+10),0))
sheet.save(out,quality=70)
