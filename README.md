# Summary
It's a simple timer, which has ability to count down!
You can change it for your needs.
We used it for Minecraft Server Open Date.

## How to use
Simple as that:
```
docker compose up -d --force-recreate
```
*--force-recreate* helps to avoid strange bugs, idk.

## NGINX Set up
To add new location (new project) do this

**Add to nginx.conf**:
```
location /[SERVICE_NAME] {
proxy_pass http://mcweb:8000/[SERVICE_NAME];
}
```

**Add to fresh.config.ts inside your new location folder**:
```
router: {
  basePath: "/timer"
}
```
**Add to /routes/_app.tsx inside your new location folder**:
```
<base href="/[SERVICE_NAME]/" />
```
**Add to docker-compose.yml**:
``` yml
[SERVICE_NAME]:
  build:
    context: ./[FOLDER_INSIDE_ROOT]
    dockerfile: ./dockerfile # relative to context!
  networks:
    - dev
``` 


