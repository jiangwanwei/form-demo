# form-demo

已更新，git pull以后，执行npm install一下然后npm run

- components/FormField/组件目录
- components/FormField/fieldMap.jsx  // 新增组件维护一下组件映射 map


## 数据说明(目前支持)

------------------------------------------------
控件类型- "type":
- number,
- text,
- textarea,
- date

------------------------------------------------
控件规则（form validation）- "specification":
[
- required: BOOLEAN,
- id_card: BOOLEAN,         // 身份证号码
- username: BOOLEAN,        // 用户名规则
- password: BOOLEAN,        // 密码规则
- email: BOOLEAN,           // 邮箱
- email_suffix: BOOLEAN,    // 邮箱后缀
- positive_number: BOOLEAN, // 正数
- int: BOOLEAN,             // 整数
- currency: BOOLEAN,        // 货币格式

- min: NUMBER,              // 最小值
- max: NUMBER,              // 最大值
- max_not_equate: NUMBER,   // 最大值并且不等于
- min_length: NUMBER,       // 最小长度
- max_length: NUMBER,       // 最大长度
- length: NUMBER,           // 长度匹配
]

