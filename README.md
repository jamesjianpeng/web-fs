# web-lib-template

## 准备&打包
```
npm i

npm run build
```

## 发布到 npmjs 上

```
npm run build

npm run patch

npm run publish (非组织)
npm run publish:organization (组织，非私有)
```

## 开发

自动编译打包到 /example/test/client

```
npm run dev
```

## 测试

-   web static server(可以不启动)

```
cd ./example/test/server

npm run dev
```

-   client

```
cd ./example/test/client

npm run dev
```

## 代码检查/格式化

-   代码检查
```
npm run lint:test (只检查 code 不修复)
npm run lint:fix 或者 npm run lint (code 修复)
```

-  代码格式化

```
npm run prettier
```
