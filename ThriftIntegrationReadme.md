# Thrift Integration

- Requires the thrift fork from https://github.com/uvwxy/thrift
- Run `bash gen-thrift.js` to generate sources (angular + node)
- Run `node main` inside `app_server`


```
Http/Thrift Server running on port: 9090
Static Server is running at 3000
Received setObject call { name: 'n2=12', mail: 'horst@uvwxy.de' }
Received getObject call { name: 'Horst', mail: 'horst@uvwxy.de' }
``

## Background
The thrift server is bound to the express server via express-http-proxy,
thus the thrift service generated for angular js is bound to the same host:port.