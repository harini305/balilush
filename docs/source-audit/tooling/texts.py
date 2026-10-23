import json,sys
import sys; sys.stdout.reconfigure(encoding='utf-8')
d=json.load(open(sys.argv[1],encoding='utf8'))
print('TITLE',d['title'],'| status',d['status'],'| h',d['docHeight'],'| overflow',d['hOverflow'])
print('META',{k:v for k,v in d['meta'].items() if k in('description','og:title','og:description','og:image','robots','keywords','og:url','twitter:card','og:type')})
print('CANON',[l['href'] for l in d['links_head'] if 'canonical' in l['rel']])
last=None
for t in d['texts']:
    if t['tag'] in('div','span') and len(t['text'])<2: continue
    s=t['style']
    sec=t['section']
    if sec!=last: print('--- SECTION',sec); last=sec
    ff=s['ff'].split(',')[0]
    print(f"[{t['tag']} y{t['box']['y']} x{t['box']['x']} {ff} {s['fs']}/{s['lh']} w{s['fw']} {s['color']} ls{s['ls']} {s['tt']}] {t['text']!r}" + (f" -> {t['href']}" if t.get('href') else ''))
