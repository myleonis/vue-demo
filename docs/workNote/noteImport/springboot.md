# SpringBoot

使用**Spring或者SpringMVC**的话依然有**许多**的东西需要我们**进行配置**，这样不仅徒增工作量而且在跨平台部署时容易出问题。由于这些已经存在的问题，Spring Boot应运而生，**使用Spring Boot**可以让我们快速创建一个基于Spring的项目，而让这个Spring项目跑起来我们只需要**很少的配置**就可以了。Spring Boot主要有如下核心功能： 

1. 独立运行的Spring项目 
2. 内嵌Servlet容器 
3. 提供starter简化Maven配置 
4. 自动配置Spring  
5. 准生产的应用监控  
6. 无代码生成和xml配置 

[配置详解](https://blog.csdn.net/u012702547/article/details/53740047)

# 入口类和@SpringBootApplication注解

新建一个Project系统都会帮我们创建一个名为artifactId+Application的入口类，这个类中有一个main方法，这个main方法就是一个标准的Java应用程序的入口方法。而这里的@SpringBootApplication则是一个组合注解，我们可以看看它的源码： 

~~~
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(
    excludeFilters = {@Filter(
    type = FilterType.CUSTOM,
    classes = {TypeExcludeFilter.class}
)}
)
public @interface SpringBootApplication {

}
~~~

## 关闭特定的自动配置

@ComponentScan注解是有一个过滤器的，如果我们只想要@SpringBootApplication去扫描特定的类而不是全部类，那么就可以关闭自动配置，如下： 

~~~
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
~~~

## Spring Boot的配置文件

Spring Boot使用一个全局的配置文件application.properties或者application.yml，配置文件放在src/main/resources目录下。properties是我们常见的一种配置文件，Spring Boot不仅支持properties这种类型的配置文件，也支持yaml语言的配置文件。

默认访问路径：http://localhost:8080/

~~~
server.context-path=/helloboot  配置文件设置访问路径
server.port=8081	端口号设置
~~~

## 常规属性配置

这里专门设置了中文，因为中文不做特殊处理会乱码，处理方式为继续在application.properties中添加如下代码： 

~~~
book.author=罗贯中
book.name=三国演义
book.pinyin=sanguoyanyi
~~~

~~~
server.tomcat.uri-encoding=UTF-8
spring.http.encoding.charset=UTF-8
spring.http.encoding.enabled=true
spring.http.encoding.force=true
spring.messages.encoding=UTF-8
~~~

在IntelliJ IDEA中依次点击File -> Settings -> Editor -> File Encodings  将Properties Files (*.properties)下的Default encoding for properties files设置为UTF-8，将Transparent native-to-ascii conversion前的勾选上。 

然后在变量中通过@Value直接注入就行了，如下： 

~~~
   @Value(value = "${book.author}")
    private String bookAuthor;
    @Value("${book.name}")
    private String bookName;
    @Value("${book.pinyin}")
    private String bookPinYin;
~~~

修改index方法，使之返回这些值： 

~~~
@RequestMapping(value = "/",produces = "text/plain;charset=UTF-8")
String index(){
        return "Hello Spring Boot! The BookName is "+bookName+";and Book Author is "+bookAuthor+";and Book PinYin is "+bookPinYin;
    }
~~~

## 类型bean的配置

根据提示的not found in classpath,查询此注解的使用关于怎么指定classpath,进而查询location，spring boot1.5以上版本@ConfigurationProperties取消location注解

可以通过@PropertySource(“classpath:config/book.properties”) 

~~~
@Component
@ConfigurationProperties(prefix = "book")
@PropertySource("classpath:book.properties")
public class Book {
    private String name;
    private String author;
    private String price;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
}
~~~

~~~~
@RestController
public class BookController {

    @Autowired
    private Book bookBean;

    @RequestMapping("/book")
    public String book() {
        return "Hello Spring Boot! The BookName is "+bookBean.getName()+";and Book Author is "+bookBean.getAuthor()+";and Book price is "+bookBean.getPrice();
    }
}
~~~~

resources下创建book.properties

~~~
book.name=红楼梦
book.author=曹雪芹
book.price=28
~~~

## 日志配置

~~~
logging.file=/home/sang/workspace/log.log
logging.level.org.springframework.web=debug
~~~

## Profile配置问题

全局Profile配置我们使用application-{profile}.properties来定义，然后在application.properties中通过spring.profiles.active来指定使用哪个Profile。 



