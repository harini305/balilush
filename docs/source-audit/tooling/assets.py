import json,glob,os,re,sys,collections
sys.stdout.reconfigure(encoding='utf-8')
assets=collections.OrderedDict()
SECTION_LABEL={}
def key(u):
    m=re.search(r'static\.wixstatic\.com/media/([^/?]+)',u)
    if m: return 'wix:'+m.group(1)
    return u.split('?')[0]
def fname(u):
    m=re.search(r'/v1/[^/]+/[^/]+/([^/?]+)$',u)
    return m.group(1) if m else u.split('/')[-1].split('?')[0]
for f in sorted(glob.glob('data/*.json')):
    d=json.load(open(f,encoding='utf8')); page,vp=os.path.basename(f)[:-5].split('__')
    secs={s['id']:s for s in d['sections']}
    items=[('img',i['src'],i.get('alt',''),i['box'],i['section'],i.get('nw'),i.get('nh'),i.get('visible',True)) for i in d['images'] if i['src']]
    for b in d['bgImages']:
        for u in re.findall(r'url\("?([^")]+)"?\)',b['bg']): items.append(('background',u,'',b['box'],b['section'],None,None,True))
    for v in d['videos']: items.append(('video',v['src'],'',v['box'],v['section'],None,None,True))
    for typ,u,alt,box,sec,nw,nh,vis in items:
        if u.startswith('data:'): continue
        k=key(u); a=assets.setdefault(k,{'type':typ,'urls':set(),'alts':set(),'pages':set(),'sections':set(),'maxW':0,'maxH':0,'served':set(),'name':fname(u),'vps':set(),'visible':False})
        a['urls'].add(u); a['pages'].add(page); a['vps'].add(vp)
        if alt: a['alts'].add(alt)
        if sec: a['sections'].add(f"{page}#{sec}")
        a['maxW']=max(a['maxW'],box['w']); a['maxH']=max(a['maxH'],box['h']); a['visible']|=vis
        if nw: a['served'].add(f"{nw}x{nh}")
out=[]
for k,a in assets.items():
    out.append({'key':k,'type':a['type'],'name':a['name'],'original_url':('https://static.wixstatic.com/media/'+k[4:]) if k.startswith('wix:') else k,
      'alts':sorted(a['alts']),'pages':sorted(a['pages']),'sections':sorted(a['sections']),'max_display':f"{a['maxW']}x{a['maxH']}",'served':sorted(a['served']),'viewports':sorted(a['vps']),'visible':a['visible'],'sample_url':sorted(a['urls'])[0]})
json.dump(out,open('assets_raw.json','w',encoding='utf8'),indent=1,ensure_ascii=False)
c=collections.Counter(x['type'] for x in out); print(len(out),c)
hosts=collections.Counter(re.sub(r'^https?://([^/]+).*',r'\1',x['original_url']) for x in out); print(hosts)
for x in out:
    if not x['key'].startswith('wix:'): print('NONWIX',x['type'],x['original_url'][:120],x['pages'][:3])
