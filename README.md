#运行项目时报类找不到，run clean maven之后，jar下载不下来了。
##解决方法：`C:\Users\Administrator\.m2\repository`找到这个路径，删除掉
			`由于所有的maven项目都公用一个maven库，所以如果一个项目的maven下载不了jar包，那么需要导入其他项目来下载jar包，这样就可以运行项目了。`
## 每个项目的工作空间下，都有一个.project文件。删掉它，从新启动eclipse，会重新生成。
## 如果jar包找不到，需要window搜索build，把不用的jar包删掉。重新build path下。
   