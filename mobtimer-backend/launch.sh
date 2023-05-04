cd src/server
nodemon --watch src -e js,ts,ejs,htm,html index.ts
# todo: This didn't work - it didn't get to the open line
open http://localhost:3000/ # todo: unhardcode localhost:3000