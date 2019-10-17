## 扮演CA角色需要的文件
```
ca.key 私钥
ca.csr csr文件
ca.crt 证书
```

## 服务端的CSR文件
```
server.key 服务端私钥
server.pem 服务端公钥
server.csr 服务端csr文件
server.crt 带有CA签名的证书
```

## 客户点的CSR文件
```
client.key 客户端私钥
client.pem 客户端公钥
client.csr 客户算csr文件
client.crt 客户端签名证书
```