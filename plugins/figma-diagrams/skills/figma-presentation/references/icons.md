# Icon glyph library (white, 24×24 viewBox)

Pass these strings to `figma.createNodeFromSvg(svg)`, then resize to 25 (or 19 for the
small tile) and center in the tile (helpers do this). Glyphs are stroke-based white so
the colored tile carries the meaning. `stroke="#fff"` / `fill="#fff"`. Keep them simple;
add new ones in the same minimal line style.

```js
const ICONS = {
  // USERS / end users
  users: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,

  // NETWORKING / load balancer / share
  network: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="10.5" x2="15.4" y2="6.5"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/></svg>`,

  // COMPUTE / server / cpu
  compute: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>`,

  // SECURITY / shield
  shield: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,

  // SECURITY / key (HSM, PKCS#11)
  key: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="4.5"/><path d="M10.7 12.3 21 2m-4 0 3 3m-6 3 3 3"/></svg>`,

  // DATABASE
  database: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/></svg>`,

  // STORAGE / disks (Ceph, backup)
  storage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="5" rx="1"/><rect x="3" y="11" width="18" height="5" rx="1"/><line x1="7" y1="6.5" x2="7" y2="6.5"/><line x1="7" y1="13.5" x2="7" y2="13.5"/></svg>`,

  // BLOCKCHAIN / linked blocks
  blockchain: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><path d="M10 6.5h4a2 2 0 0 1 2 2V14M6.5 10v4a2 2 0 0 0 2 2H14"/></svg>`,

  // QUEUE / message / ETL
  queue: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h13l-3-3M20 17H7l3 3"/></svg>`,

  // KUBERNETES / orchestration (simplified helm)
  k8s: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5 4 6v6.5c0 4.5 3.5 7.5 8 9 4.5-1.5 8-4.5 8-9V6z"/><circle cx="12" cy="11" r="2.5"/><path d="M12 8.5V4M12 13.5l3 3M12 13.5l-3 3M14.3 11l4-1M9.7 11l-4-1"/></svg>`,

  // BACKUP / DR (clock-ish refresh)
  backup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg>`,

  // TERMINAL / DevOps / NOC
  terminal: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/></svg>`,

  // LOCK / zero-trust
  lock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`,

  // ---- Cloud / AWS-style service glyphs (same minimal white-line style) ----------

  // OBJECT STORAGE / bucket (S3)
  bucket: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="2.5"/><path d="M4 5l1.6 14a1 1 0 0 0 1 .9h10.8a1 1 0 0 0 1-.9L20 5"/></svg>`,

  // SERVERLESS / function (Lambda)
  serverless: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4h2.4l6.6 16"/><path d="M13.2 11 8 20"/></svg>`,

  // CONTAINERS / pods (ECS / EKS)
  container: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="8" height="7" rx="1"/><rect x="13" y="4" width="8" height="7" rx="1"/><rect x="8" y="13" width="8" height="7" rx="1"/></svg>`,

  // AUTO SCALING (expand)
  autoscale: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5"/><path d="M20 15v5h-5"/><path d="M4 4l6 6"/><path d="M20 20l-6-6"/></svg>`,

  // LOAD BALANCER (ELB) - one node fanning to three targets
  loadBalancer: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.4"/><circle cx="4" cy="20" r="2.4"/><circle cx="12" cy="20" r="2.4"/><circle cx="20" cy="20" r="2.4"/><path d="M12 6.4v3.6M4 17.6V13h16v4.6M12 10v7.6"/></svg>`,

  // CDN / edge (CloudFront) - center node + edge PoPs
  cdn: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.5"/><circle cx="12" cy="3.5" r="1.6"/><circle cx="4.5" cy="8" r="1.6"/><circle cx="19.5" cy="8" r="1.6"/><circle cx="6" cy="19" r="1.6"/><circle cx="18" cy="19" r="1.6"/><path d="M12 8.5v-3.4M9.3 10 6 8.7M14.7 10 18 8.7M10.2 14.6 7.1 17.6M13.8 14.6 16.9 17.6"/></svg>`,

  // MONITORING / gauge (CloudWatch)
  gauge: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16a8 8 0 0 1 16 0"/><path d="M12 16l4-3.2"/><circle cx="12" cy="16" r="1.1"/><path d="M4 16h1.6M18.4 16H20M12 8V6.6"/></svg>`,

  // IDENTITY / IAM - shield + person
  identity: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 2.8v5c0 4.4-3 7.4-7 8.9-4-1.5-7-4.5-7-8.9v-5z"/><circle cx="12" cy="9.5" r="2.1"/><path d="M8.4 15a3.6 3.6 0 0 1 7.2 0"/></svg>`,

  // REGION / availability zone - nested boundary
  region: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><rect x="7.5" y="7.5" width="9" height="9" rx="2"/></svg>`,

  // CI/CD PIPELINE (CodePipeline) - source → stage → deploy
  pipeline: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="12" r="2.4"/><rect x="9.8" y="9.6" width="4.4" height="4.8" rx="1"/><circle cx="19" cy="12" r="2.4"/><path d="M7.4 12h2.4M14.2 12h2.4"/></svg>`,

  // ANALYTICS / data warehouse (Redshift) - bars in a frame
  analytics: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7.5 16.5v-3.5M12 16.5v-7M16.5 16.5v-5"/></svg>`,
};
```

## Mapping cheat-sheet (category → glyph)
- USERS / ACCESS → `users` / `terminal` (DevOps) / `identity` (IAM)
- NETWORKING → `network` / `loadBalancer` (ELB) / `cdn` (CloudFront / edge) / `region` (region / AZ)
- COMPUTE → `compute` / `container` (ECS / EKS / pods) / `serverless` (Lambda) / `autoscale` / `queue` (MQ / ETL) / `k8s` (orchestration)
- SECURITY → `shield` (zero-trust / WAF) / `key` (HSM) / `lock` / `identity` (IAM)
- DATABASE / ANALYTICS → `database` / `analytics` (Redshift / warehouse)
- STORAGE → `storage` / `bucket` (S3 / object store) / `backup` (PBS / DR)
- OBSERVABILITY → `gauge` (CloudWatch / metrics)
- CI/CD → `pipeline` (CodePipeline)
- BLOCKCHAIN → `blockchain`

The `bucket`, `serverless`, `container`, `autoscale`, `loadBalancer`, `cdn`, `gauge`,
`identity`, `region`, `pipeline`, `analytics` glyphs are AWS-style service marks - clean
white line icons on the colored category tile, so a slide reads like a cloud architecture
diagram. Keep the tile color semantic (don't make a bucket blue); the glyph names the
service, the tile color names the category.
