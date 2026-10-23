import re,glob,json,os,collections,sys
sys.stdout.reconfigure(encoding='utf-8')
raw=json.load(open('assets_raw.json',encoding='utf8'))
known={a['key'][4:] for a in raw if a['key'].startswith('wix:')}
found=collections.defaultdict(set)
pats={'IMG':r'([0-9a-f]{6}_[0-9a-f]{32}~mv2[A-Za-z0-9_]*\.(?:jpg|jpeg|png|gif|webp|svg))',
      'IMG2':r'media/([0-9a-f]{32}\.(?:jpg|jpeg|png|gif|webp|svg))',
      'VIDEO':r'(video\.wixstatic\.com/video/[A-Za-z0-9_~./-]+)',
      'DOC':r'(static\.wixstatic\.com/ugd/[A-Za-z0-9_~./-]+)',
      'YT':r'(youtube\.com/(?:embed|watch)[A-Za-z0-9_?=/&-]+|youtu\.be/[A-Za-z0-9_-]+)'}
for f in glob.glob('html/*.html'):
    t=open(f,encoding='utf8',errors='ignore').read(); pg=os.path.basename(f)[:-5]
    for k,p in pats.items():
        for m in re.findall(p,t,re.I): found[(k,m)].add(pg)
new={k:v for k,v in found.items() if k[1] not in known}
print('in html total',len(found),'not in DOM set',len(new))
for k,v in sorted(new.items()): print(' ',k,sorted(v)[:5])
