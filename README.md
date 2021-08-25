# V3swap V2 SDK

修改了`class Pair`,通过前端传入FACTORY_ADDRESS和INIT_CODE_HASH来计算Pair合约地址

在uniswap的前端中通过`npm remove @uniswap/v2-sdk`删除原版uniswap v2 sdk

然后在前端目录中运行`npm install v3swap-v2-sdk`安装本项目

之后修改前端对应的`new Pair()`和`computePairAddress()`函数