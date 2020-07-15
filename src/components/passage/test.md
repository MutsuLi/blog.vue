### Oracle执行计划

#### 执行计划的常用列字段解释：

- 基数（Rows）：Oracle估计的当前操作的返回结果集行数

- 字节（Bytes）：执行该步骤后返回的字节数

- 耗费（COST）、CPU耗费：Oracle估计的该步骤的执行成本，用于说明SQL执行的代价，理论上越小越好（该值可能与实际有出入）

- 时间（Time）：Oracle估计的当前操作所需的时间

#### 执行顺序
\`\`\`
根据Operation缩进来判断，缩进最多的最先执行；（缩进相同时，最上面的最先执行）
例：上图中 INDEX RANGE SCAN 和 INDEX UNIQUE SCAN 两个动作缩进最多，最上面的 INDEX RANGE SCAN 先执行；
同一级如果某个动作没有子ID就最先执行
同一级的动作执行时遵循最上最右先执行的原则
例：上图中 TABLE ACCESS BY GLOBAL INDEX ROWID 和 TABLE ACCESS BY INDEX ROWID 两个动作缩进都在同一级，则位于上面的 TABLE ACCESS BY GLOBAL INDEX ROWID 这个动作先执行；
这个动作又包含一个子动作 INDEX RANGE SCAN，则位于右边的子动作 INDEX RANGE SCAN 先执行；
图示中的SQL执行顺序即为：
INDEX RANGE SCAN 
—>  TABLE ACCESS BY GLOBAL INDEX ROWID 行数据插入后，则其对应的ROWID在该行的生命周期内是唯一的，即使发生行迁移，该行的ROWID值也不变。
让我们再回到 TABLE ACCESS BY ROWID 来：
行的ROWID指出了该行所在的数据文件、数据块以及行在该块中的位置，所以通过ROWID可以快速定位到目标数据上，这也是Oracle中存取单行数据最快的方法
\`\`\`
3. TABLE ACCESS BY INDEX SCAN（索引扫描）：
\`\`\`
在索引块中，既存储每个索引的键值，也存储具有该键值的行的ROWID。
索引扫描其实分为两步：
Ⅰ：扫描索引得到对应的ROWID
Ⅱ：通过ROWID定位到具体的行读取数据
索引扫描细分：
INDEX UNIQUE SCAN（索引唯一扫描）
INDEX RANGE SCAN（索引范围扫描）
INDEX FULL SCAN（索引全扫描）
INDEX FAST FULL SCAN（索引快速扫描）
INDEX SKIP SCAN（索引跳跃扫描）
\`\`\`

- INDEX UNIQUE SCAN（索引唯一扫描）：
\`\`\`
针对唯一性索引（UNIQUE INDEX）的扫描，每次至多只返回一条记录；
表中某字段存在 UNIQUE、PRIMARY KEY 约束时，Oracle常实现唯一性扫描；
\`\`\`

- INDEX RANGE SCAN（索引范围扫描）：
\`\`\`
使用一个索引存取多行数据；
发生索引范围扫描的三种情况：
在唯一索引列上使用了范围操作符（如：>   <   <>   >=   <=   between）
在组合索引上，只使用部分列进行查询（查询时必须包含前导列，否则会走全表扫描）
对非唯一索引列上进行的任何查询
\`\`\`
- INDEX FULL SCAN（索引全扫描）：
\`\`\`
进行全索引扫描时，查询出的数据都必须从索引中可以直接得到（注意全索引扫描只有在CBO模式下才有效）
\`\`\`
- INDEX FAST FULL SCAN（索引快速扫描）:
\`\`\`
扫描索引中的所有的数据块，与 INDEX FULL SCAN 类似，但是一个显著的区别是它不对查询出的数据进行排序（即数据不是以排序顺序被返回）
\`\`\`

- INDEX SKIP SCAN（索引跳跃扫描）：
\`\`\`
Oracle 9i后提供，有时候复合索引的前导列（索引包含的第一列）没有在查询语句中出现，oralce也会使用该复合索引，这时候就使用的INDEX SKIP SCAN;
什么时候会触发 INDEX SKIP SCAN 呢？
前提条件：表有一个复合索引，且在查询时有除了前导列（索引中第一列）外的其他列作为条件，并且优化器模式为CBO时
当Oracle发现前导列的唯一值个数很少时，会将每个唯一值都作为常规扫描的入口，在此基础上做一次查找，最后合并这些查询；
例如：
假设表emp有ename（雇员名称）、job（职位名）、sex（性别）三个字段，并且建立了如 create index idx_emp on emp (sex, ename, job) 的复合索引；
因为性别只有 '男' 和 '女' 两个值，所以为了提高索引的利用率，Oracle可将这个复合索引拆成 ('男', ename, job)，('女', ename, job) 这两个复合索引；
当查询 select * from emp where job = 'Programmer' 时，该查询发出后：
Oracle先进入sex为'男'的入口，这时候使用到了 ('男', ename, job) 这条复合索引，查找 job = 'Programmer' 的条目；
再进入sex为'女'的入口，这时候使用到了 ('女', ename, job) 这条复合索引，查找 job = 'Programmer' 的条目；
最后合并查询到的来自两个入口的结果集。
\`\`\`   

4. 表连接方式
\`\`\`
NESTED LOOPS … 描述的是表连接方式；
JOIN 关键字用于将两张表作连接，一次只能连接两张表，JOIN 操作的各步骤一般是串行的（在读取做连接的两张表的数据时可以并行读取）；
表（row source）之间的连接顺序对于查询效率有很大的影响，对首先存取的表（驱动表）先应用某些限制条件（Where过滤条件）以得到一个较小的row source，可以使得连接效率提高。
\`\`\`

- 驱动表（Driving Table）：
\`\`\`
表连接时首先存取的表，又称外层表（Outer Table），这个概念用于 NESTED LOOPS（嵌套循环） 与 HASH JOIN（哈希连接）中；
如果驱动表返回较多的行数据，则对所有的后续操作有负面影响，故一般选择小表（应用Where限制条件后返回较少行数的表）作为驱动表。
\`\`\`  
- 匹配表（Probed Table）：
\`\`\`
又称为内层表（Inner Table），从驱动表获取一行具体数据后，会到该表中寻找符合连接条件的行。故该表一般为大表（应用Where限制条件后返回较多行数的表）。
\`\`\`

- 表连接的几种方式：
\`\`\`
SORT MERGE JOIN（排序-合并连接）
NESTED LOOPS（嵌套循环）
HASH JOIN（哈希连接）
CARTESIAN PRODUCT（笛卡尔积）
\`\`\`

- SORT MERGE JOIN（排序-合并连接）：

\`\`\`
假设有查询：select a.name, b.name from table_A a join table_B b on (a.id = b.id)

内部连接过程：

a) 生成 row source 1 需要的数据，按照连接操作关联列（如示例中的a.id）对这些数据进行排序

b) 生成 row source 2 需要的数据，按照与 a) 中对应的连接操作关联列（b.id）对数据进行排序

c) 两边已排序的行放在一起执行合并操作（对两边的数据集进行扫描并判断是否连接）

延伸：
如果示例中的连接操作关联列 a.id，b.id 之前就已经被排过序了的话，连接速度便可大大提高，因为排序是很费时间和资源的操作，尤其对于有大量数据的表。
故可以考虑在 a.id，b.id 上建立索引让其能预先排好序。
不过遗憾的是，由于返回的结果集中包括所有字段，所以通常的执行计划中，即使连接列存在索引，也不会进入到执行计划中，除非进行一些特定列处理（如仅仅只查询有索引的列等）。
排序-合并连接的表无驱动顺序，谁在前面都可以；
排序-合并连接适用的连接条件有： <   <=   =   >   >= ，不适用的连接条件有： <>    like
\`\`\`

-  NESTED LOOPS（嵌套循环）：
\`\`\`
内部连接过程：
a) 取出 row source 1 的 row 1（第一行数据），遍历 row source 2 的所有行并检查是否有匹配的，取出匹配的行放入结果集中
b) 取出 row source 1 的 row 2（第二行数据），遍历 row source 2 的所有行并检查是否有匹配的，取出匹配的行放入结果集中
若 row source 1 （即驱动表）中返回了 N 行数据，则 row source 2 也相应的会被全表遍历 N 次。
因为 row source 1 的每一行都会去匹配 row source 2 的所有行，所以当 row source 1 返回的行数尽可能少并且能高效访问 row source 2（如建立适当的索引）时，效率较高。
延伸：
嵌套循环的表有驱动顺序，注意选择合适的驱动表。
嵌套循环连接有一个其他连接方式没有的好处是：可以先返回已经连接的行，而不必等所有的连接操作处理完才返回数据，这样可以实现快速响应。
应尽可能使用限制条件（Where过滤条件）使驱动表（row source 1）返回的行数尽可能少，
同时在匹配表（row source 2）的连接操作关联列上建立唯一索引（UNIQUE INDEX）或是选择性较好的非唯一索引，此时嵌套循环连接的执行效率会变得很高。
若驱动表返回的行数较多，即使匹配表连接操作关联列上存在索引，连接效率也不会很高。
\`\`\`
- HASH JOIN（哈希连接） :
\`\`\`
哈希连接只适用于等值连接（即连接条件为  =  ）
HASH JOIN对两个表做连接时并不一定是都进行全表扫描，其并不限制表访问方式；
内部连接过程简述：
a) 取出 row source 1（驱动表，在HASH JOIN中又称为Build Table） 的数据集，然后将其构建成内存中的一个 Hash Table（Hash函数的Hash KEY就是连接操作关联列），
创建Hash位图（bitmap）
b) 取出 row source 2（匹配表）的数据集，对其中的每一条数据的连接操作关联列使用相同的Hash函数并找到对应的 a) 里的数据在 Hash Table 中的位置，在该位置上检查能否找到匹配的数据
\`\`\`
- HASH JOIN的三种模式：
\`\`\`
OPTIMAL HASH JOIN
ONEPASS HASH JOIN
MULTIPASS HASH JOIN
\`\`\`
-  OPTIMAL HASH JOIN：
\`\`\`
OPTIMAL 模式是从驱动表（也称Build Table）上获取的结果集比较小，可以把根据结果集构建的整个Hash Table都建立在用户可以使用的内存区域里。
连接过程简述：
Ⅰ：首先对Build Table内各行数据的连接操作关联列使用Hash函数，把Build Table的结果集构建成内存中的Hash Table。如图所示，可以把Hash Table看作内存中的一块大的方形区域，里面有很多的小格子，Build Table里的数据就分散分布在这些小格子中，而这些小格子就是Hash Bucket（见上面Wiki的定义）。
Ⅱ：开始读取匹配表（Probed Table）的数据，对其中每行数据的连接操作关联列都使用同上的Hash函数，定位Build Table里使用Hash函数后具有相同值数据所在的Hash Bucket。
Ⅲ：定位到具体的Hash Bucket后，先检查Bucket里是否有数据，没有的话就马上丢掉匹配表（Probed Table）的这一行。如果里面有数据，则继续检查里面的数据（驱动表的数据）是否和匹配表的数据相匹配。
\`\`\`

- ONEPASS HASH JOIN :
\`\`\`
从驱动表（也称Build Table）上获取的结果集较大，无法将根据结果集构建的Hash Table全部放入内存中时，会使用 ONEPASS 模式。
one_pass_hash_join
连接过程简述：
Ⅰ：对Build Table内各行数据的连接操作关联列使用Hash函数，根据Build Table的结果集构建Hash Table后，由于内存无法放下所有的Hash Table内容，将导致有的Hash Bucket放在内存里，有的Hash Bucket放在磁盘上，无论放在内存里还是磁盘里，Oracle都使用一个Bitmap结构来反映这些Hash Bucket的状态（包括其位置和是否有数据）。
Ⅱ：读取匹配表数据并对每行的连接操作关联列使用同上的Hash函数，定位Bitmap上Build Table里使用Hash函数后具有相同值数据所在的Bucket。如果该Bucket为空，则丢弃匹配表的这条数据。
如果不为空，则需要看该Bucket是在内存里还是在磁盘上。
如果在内存中，就直接访问这个Bucket并检查其中的数据是否匹配，有匹配的话就返回这条查询结果。
如果在磁盘上，就先把这条待匹配数据放到一边，将其先暂存在内存里，等以后积累了一定量的这样的待匹配数据后，再批量的把这些数据写入到磁盘上（上图中的 Dump probe partitions to disk）。
Ⅲ：当把匹配表完整的扫描了一遍后，可能已经返回了一部分匹配的数据了。接下来还有Hash Table中一部分在磁盘上的Hash Bucket数据以及匹配表中部分被写入到磁盘上的待匹配数据未处理，
现在Oracle会把磁盘上的这两部分数据重新匹配一次，然后返回最终的查询结果。
\`\`\`
-  MULTIPASS HASH JOIN

\`\`\`
当内存特别小或者相对而言Hash Table的数据特别大时，会使用 MULTIPASS 模式。MULTIPASS会多次读取磁盘数据，应尽量避免使用该模式
\`\`\`
