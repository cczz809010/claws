// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    // Hero 轮播功能
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.arrow.prev');
    const nextBtn = document.querySelector('.arrow.next');
    let currentSlide = 0;
    let autoPlayInterval;

    function showSlide(index) {
        // 移除所有 active 类
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // 添加 active 类到当前幻灯片
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // 下一张按钮
    nextBtn.addEventListener('click', function() {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    // 上一张按钮
    prevBtn.addEventListener('click', function() {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    // 点击圆点切换
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // 启动自动轮播
    startAutoPlay();

    // 鼠标悬停暂停轮播
    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', stopAutoPlay);
    hero.addEventListener('mouseleave', startAutoPlay);

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.background = 'linear-gradient(180deg, rgba(26, 26, 26, 0.95) 0%, rgba(26, 26, 26, 0.9) 100%)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
        }

        lastScroll = currentScroll;
    });

    // 餐厅分类筛选
    const tabBtns = document.querySelectorAll('.tab-btn');
    const restaurantCards = document.querySelectorAll('.restaurant-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有 active 类
            tabBtns.forEach(b => b.classList.remove('active'));
            // 添加 active 类到当前按钮
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            filterRestaurants(category);
        });
    });

    function filterRestaurants(category) {
        restaurantCards.forEach((card, index) => {
            const cardCategories = card.getAttribute('data-category').split(' ');
            let shouldShow = false;

            if (category === 'all') {
                shouldShow = true;
            } else if (cardCategories.includes(category)) {
                shouldShow = true;
            }

            if (shouldShow) {
                card.classList.remove('hidden');
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 预订按钮点击事件
    document.querySelectorAll('.btn-book').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.restaurant-card');
            const restaurantName = card.querySelector('h3').textContent;
            alert(`即将打开 ${restaurantName} 的预订页面`);
        });
    });

    document.querySelectorAll('.btn-reserve, .btn-contact').forEach(button => {
        button.addEventListener('click', function() {
            alert('即将跳转到预订页面');
        });
    });

    // 探索按钮点击事件
    document.querySelectorAll('.btn-explore').forEach(button => {
        button.addEventListener('click', function() {
            const restaurantsSection = document.querySelector('.restaurants');
            restaurantsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // 滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察元素
    document.querySelectorAll('.restaurant-card, .feature-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // 语言切换
    const langBtn = document.querySelector('.btn-lang');
    langBtn.addEventListener('click', function() {
        const currentLang = this.textContent;
        this.textContent = currentLang === 'EN' ? '中' : 'EN';
        // 这里可以添加实际的语言切换逻辑
        alert('语言切换功能开发中');
    });

    // 特色卡片 hover 效果增强
    document.querySelectorAll('.feature-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.feature-icon').style.transform = 'rotate(360deg) scale(1.1)';
            this.querySelector('.feature-icon').style.transition = 'transform 0.6s ease';
        });

        item.addEventListener('mouseleave', function() {
            this.querySelector('.feature-icon').style.transform = 'rotate(0deg) scale(1)';
        });
    });

    // 餐厅卡片图片悬停效果
    document.querySelectorAll('.restaurant-img').forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.querySelector('.img-placeholder').style.transform = 'scale(1.1)';
        });

        img.addEventListener('mouseleave', function() {
            this.querySelector('.img-placeholder').style.transform = 'scale(1)';
        });
    });

    // 页面加载完成后显示动画
    setTimeout(() => {
        document.querySelectorAll('.restaurant-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 300);

    // 返回顶部按钮（可选）
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--gradient-gold);
        border: none;
        color: var(--rich-black);
        font-size: 18px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    document.body.appendChild(backToTopBtn);

    // 滚动显示/隐藏返回顶部按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    // 点击返回顶部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
