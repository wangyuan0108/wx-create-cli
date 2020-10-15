### 创建包
```
// 命令
wp-cli -pack 

// 运行
➜  business_wechat git:(develop) ✗ wp-cli -pack wPack
? 选择需要创建页面的小程序: (Use arrow keys)
❯ 商流通 
  正品控 

//结果

? 选择需要创建页面的小程序: 商流通
'slt' 'business_wechat'


// 目录

├── wPack
```
### 创建页面
```
// 命令
wp-cli -pack wPack -p wPage

// 运行
➜  business_wechat git:(develop) ✗ wp-cli -pack wPack -p wPage
? 选择需要创建页面的小程序: (Use arrow keys)
❯ 商流通 
  正品控 


// 结果
? 选择需要创建页面的小程序: 商流通
ℹ page is ===========> wPage
✔ 操作成功
```

// 目录
wPack
└── pages
    └── wPage
        ├── index.js
        ├── index.json
        ├── index.wxml
        ├── index.wxss
        └── strings.js
### 同时创建包和页面

```
// 命令
wp-cli -pack wPack -p wPage

// 运行
➜  business_wechat git:(develop) ✗ wp-cli -pack wPack -p wPage
? 选择需要创建页面的小程序: (Use arrow keys)
❯ 商流通 
  正品控

// 结果
? 选择需要创建页面的小程序: 商流通
'slt' 'business_wechat'
ℹ page is ===========> wPage
✔ 操作成功


// 目录
wPack
└── pages
    └── wPage
        ├── index.js
        ├── index.json
        ├── index.wxml
        ├── index.wxss
        └── strings.js
```

### app.json添加分包路径
```
{
        "root": "wPack",
        "pages": [
            "pages/wPage/index"
        ]
    }
```

### 创建全局组件

```
// 命令
wp-cli -c wComponent

// 运行
➜  business_wechat git:(develop) wp-cli -c wComponent
? 选择需要创建页面的小程序: (Use arrow keys)
❯ 商流通 
  正品控 

// 结果
➜  business_wechat git:(develop) wp-cli -c wComponent
? 选择需要创建页面的小程序: 商流通
ℹ 创建全局公用组件
component is ===========> wComponent
```
### 创建分包页面组件

