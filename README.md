# pov

A pure frontend app integrated with Contentful (headless CMS) collects car photography and POV driving videos to share the beauty of Taiwan

## Dev note

### Env

node: v20.9.0  
npm: v10.1.0

### Run locally

```
npm ci --force
```

```
npm run dev
```

### Build

```
npm run build
```

built result: /dist

### Update Contentful data to local

```
SPACE_ID={{SPACE ID}} ACCESS_TOKEN={{ACCESS TOKEN}} npm run contentful:fetch
```
