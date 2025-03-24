---
title: 狄利克雷卷积
date: 2024-01-12T20:55
author: FXJFXJ
categories: ACM
toc: true
aliases: 
url: 
summary: 
dg-publish: true
---

### 预备知识

#### 生成函数

>母函数

##### 普通生成函数
形式：$\displaystyle f(x)=\sum_{(n\geq 0)}a_{n}x^n$

加减： $f(x)\pm g(x)=\sum(a_{n}\pm b_{n})x^n\to f(x)\pm g(x)$ 是 $<a_{n}\pm b_{n}>$ 的普通生成函数

乘法运算：(卷积)

$\displaystyle f(x)g(x)=\sum_{n\geq 0}x^n\sum_{i=0}^na_{i}b_{n-i}$，$(i+j=n)$

即 $f(x)g(x)$ 是 $\sum\limits_{i=0}^na_{i}b_{n-i}$ 的普通生成函数

>可以用于解决多重集组合数问题，(指数是物品个数，系数是组合数)
###### 应用
有 $n$ 个物品，每种物品有 $a_{i}$ 个，求取 $m$ 个物品的组合数 (不看顺序)？

设从每种物品选择 $b_{i}$ 个 ($0\leq b_{i}\leq a_{i}$)，则 $m=\sum\limits_{i=1}^nb_{i}$

构造普通生成函数 $(1+x+x^2+\dots x^{a_{1}})(1+x+\dots+x^{a_{2}})\dots.(1+x+x^2+\dots+x^{a_{n}})$

即求 $x^{m}$ 的系数

即 $\sum\limits_{i=0}^na_{i}b_{n-i}$

例 1： [HDU 2152](https://acm.hdu.edu.cn/showproblem.php?pid=2152)

在本题只有 $b_{i}$ 范围变化： $l_{i}\leq b_{i}\leq r_{i}$，还是求 $x^m$ 的系数

```cpp
#define int long long
void solve() {
    int n, m;
    while (cin >> n >> m) {
        vector<int> l(n + 1), r(n + 1), ans(201), tmp(201);
        for (int i = 1;i <= n;i++) {
            cin >> l[i] >> r[i];
        }
        for (int i = l[1];i <= r[1];i++)ans[i] = 1;
        for (int i = 2;i <= n;i++) {
            for (int j = 0;j <= m;j++) {
                for (int k = l[i];k <= r[i];k++) {
                    tmp[j + k] += ans[j];
                }
            }
            ans = tmp;tmp.assign(201, 0);
        }
        cout << ans[m] << '\n';
    }
}
```

例 2 [HDU 1085](https://acm.hdu.edu.cn/showproblem.php?pid=1085)
现有 1,2,5 的硬币各 $a_{1},a_{2},a_3$ 枚，求不能组成的最小面值是多少。

构造生成函数 L $(1+x+x^2+\dots x^{a_{1}})(1+x^2+x^4+\dots+x^{2a_{2}})(1+x^5+\dots+x^{5a_{3}})$

遍历到系数为 0 的一项即可。

```cpp
#define int long long
void solve() {
    int a[4] = {};
    while (cin >> a[1] >> a[2] >> a[3] && (a[1] || a[2] || a[3])) {
        int b[4] = {0,1,2,5};
        int m = a[1] * 1 + a[2] * 2 + a[3] * 5;
        vector<int> ans(m + 10), tmp(m + 10);
        for (int i = 0;i <= a[1];i++)ans[i] = 1;
        for (int i = 2;i <= 3;i++) {
            for (int j = 0;j <= m;j++) {
                for (int k = 0;k <= a[i] * b[i] && j + k <= m;k += b[i]) {
                    tmp[j + k] += ans[j];
                }
            }
            ans = tmp;tmp.assign(m + 10, 0);
        }
        for (int i = 0;i < ans.size();i++) {
            if (!ans[i]) {
                cout << i << "\n";break;
            }
        }
    }
}
```

##### 指数生成函数
形式: $\displaystyle f(x)=\sum_{n\geq 0}a_{n} \frac{x^n}{n!}$

则 $<1,1,1,\dots,1>$ 的指数生成函数是 $e^x$
$<1,p,p^2,\dots>$ 的指数生成函数是 $e^{px}$

加减运算和普通生成函数性质相同

乘法运算：

$\displaystyle f(x)g(x)=\sum_{n\geq 0} \frac{x^n}{n!}\sum_{i=0}^nC_{n}^ia_{i}b_{n-i}$

则 $f(x)g(x)$ 是序列 $<\sum \limits_{i=0}^nC_{n}^ia_{i}b_{n-i}>$ 的指数生成函数

###### 应用
[HDU 1521](https://acm.hdu.edu.cn/showproblem.php?pid=1521)
有 $n$ 个物品，每种物品有 $a_{i}$ 个，求取 $m$ 个物品的排列数 (看顺序)？

设从每种物品选择 $b_{i}$ 个 ($0\leq b_{i}\leq a_{i}$)，则 $m=\sum\limits_{i=1}^nb_{i}$

对于一组选定的 $b_{i}$ 排列方案数是 $\displaystyle \frac{m!}{b_{1}!b_{2}!\dots b_{n!}}$

>由于 HDU 这个题运算不会超过 $2^{31}$，所以可以用 double，平时的题目一般会取模的。

```cpp
void solve() {
    int n, m;
    while (cin >> n >> m) {
        vector<int> a(n + 1), ans(21), tmp(21);
        for (int i = 1;i <= n;i++) {
            cin >> a[i];
        }
        for (int i = l[1];i <= r[1];i++)ans[i] = 1 / i!;
        for (int i = 2;i <= n;i++) {
            for (int j = 0;j <= m;j++) {
                for (int k = 0;k <= a[i];k++) {
                    tmp[j + k] += ans[j] / k!;
                }
            }
            ans = tmp;tmp.assign(21, 0);
        }
        cout << ans[m] * m! << '\n';
    }
}
```



### 狄利克雷卷积
狄利克雷生成函数形式：$\displaystyle f(x)=\sum_{i=1}^{\infty} \frac{a_{n}}{n^x}$ 

乘法运算：

$\displaystyle f(x)g(x)=\sum_{n=1}^{\infty} \frac{1}{n^x}\sum_{d|n}a_{d}b_{\frac{n}{d}}$

> [!NOTE]
> >积性函数：$f(1)=1$，且当 $\gcd(a,b)=1\to f(ab)=f(a)f(b)$
> 
> 欧拉函数和莫比乌斯函数都是积性函数
> 
> 对于欧拉函数有性质：$\displaystyle \sum_{d|n}\varphi(d)=n$
> 
> 对于莫比乌斯函数有性质：$\displaystyle \sum_{d|n}\mu(d)=[n=1]$
> 
> 对于二者之间的联系：$\displaystyle \sum_{d|n}\mu(d) \frac{n}{d}=\varphi(n)$

定义狄利克雷卷积：

$f(n),g(n)$ 是积性函数，  $\displaystyle (f\times g)(n)=\sum_{d|n}f(d)g\left( \frac{n}{d} \right)=\sum_{d|n}f\left( \frac{n}{d} \right)g(n)$

>符合交换律，结合律，分配律

三个常用函数：

- 元函数：$\epsilon(n)=[n=1]$
- 常数函数：$1(n)=1$
- 恒等函数：$id(n)=n$

有： $f*\epsilon=f,f*1\neq f$

常用卷积关系：

- $\displaystyle \sum_{d|n}\mu(d)=[n=1]\leftrightarrow \mu*1=\epsilon$
- $\displaystyle \sum_{d|n}\varphi(d)=n\leftrightarrow \varphi*1=id$
- $\displaystyle \sum_{d|n}\mu(d) \frac{n}{d}=\varphi(n)\leftrightarrow \mu*id=\varphi$

