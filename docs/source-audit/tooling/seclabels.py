import json,glob,os,re,sys
sys.stdout.reconfigure(encoding='utf-8')
labels={}
for f in sorted(glob.glob('data/*__desktop.json'))+sorted(glob.glob('data/*__mobile.json'))+sorted(glob.glob('data/*__tablet.json')):
    d=json.load(open(f,encoding='utf8')); page=os.path.basename(f).split('__')[0]
    for s in d['sections']:
        k=f"{page}#{s['id']}"
        if k in labels: continue
        t=s['textPreview']
        if s['id'].endswith('kbgajy18') or 'header' in s['id'] or s['tag']=='header': lab='Header'
        elif s['id'].endswith('kbgakgyt'): lab='Footer'
        else:
            lab=(t.split('  ')[0][:60] if t else '(image-only section)')
        labels[k]=f"{lab} [y={s['box']['y']}]"
    # blog sections
json.dump(labels,open('seclabels.json','w',encoding='utf8'),indent=1,ensure_ascii=False)
raw=json.load(open('assets_raw.json',encoding='utf8'))
for i,a in enumerate(raw):
    secs=[labels.get(s,s) for s in a['sections']]
    fi=a['file'] or {}
    print(i,a['type'],a['name'][:45],fi.get('w'),fi.get('h'),round((fi.get('bytes') or 0)/1e6,2),'|',a['pages'][:3],'|',[x[:50] for x in secs][:2],'|',a['alts'][:1],'| disp',a['max_display'])
