import json,urllib.request,io,sys,concurrent.futures as cf
from PIL import ImageFile
sys.stdout.reconfigure(encoding='utf-8')
raw=json.load(open('assets_raw.json',encoding='utf8'))
def info(a):
    u=a['original_url']
    if 'wixstatic.com/media/' not in u: return a['key'],None
    r={'bytes':None,'w':None,'h':None,'ctype':None,'status':None,'fmt':None}
    try:
        req=urllib.request.Request(u,headers={'Range':'bytes=0-131071','User-Agent':'Mozilla/5.0'})
        with urllib.request.urlopen(req,timeout=30) as resp:
            r['status']=resp.status; r['ctype']=resp.headers.get('Content-Type')
            cr=resp.headers.get('Content-Range'); r['bytes']=int(cr.split('/')[-1]) if cr else int(resp.headers.get('Content-Length') or 0)
            data=resp.read(131072)
        if 'svg' in (r['ctype'] or ''):
            r['fmt']='svg'
        else:
            p=ImageFile.Parser(); p.feed(data)
            if p.image: r['w'],r['h']=p.image.size; r['fmt']=p.image.format
    except Exception as e: r['status']=str(e)[:80]
    return a['key'],r
with cf.ThreadPoolExecutor(12) as ex:
    res=dict(ex.map(info,raw))
for a in raw: a['file']=res.get(a['key'])
json.dump(raw,open('assets_raw.json','w',encoding='utf8'),indent=1,ensure_ascii=False)
tot=sum((a['file'] or {}).get('bytes') or 0 for a in raw)
print('total original bytes MB',round(tot/1e6,1))
for a in sorted(raw,key=lambda a:-((a['file'] or {}).get('bytes') or 0))[:15]: print(a['file'],a['name'],a['pages'][:2])
print('failures',[ (a['name'],a['file']['status']) for a in raw if a['file'] and a['file']['status'] not in (200,206)])
