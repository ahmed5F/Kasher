// js/app.js
const SAWA_POS = {
    // تهيئة التطبيق
    init: function() {
        this.checkAuth();
        this.initClock();
        this.loadData();
    },

    // التحقق من المصادقة
    checkAuth: function() {
        if (localStorage.getItem('sawaPOSLoggedIn') !== 'true' && 
            !window.location.href.includes('index.html')) {
            window.location.href = 'index.html';
        }
    },

    // تحميل البيانات
    loadData: function() {
        const savedData = localStorage.getItem('sawaPOSData');
        if (savedData) {
            window.appData = JSON.parse(savedData);
        } else {
            // بيانات افتراضية
            window.appData = {
                products: [
                    { id: 1, name: 'هاتف ذكي', category: 'إلكترونيات', price: 350000, stock: 15, cost: 300000 },
                    { id: 2, name: 'لابتوب', category: 'إلكترونيات', price: 850000, stock: 8, cost: 700000 },
                    { id: 3, name: 'قلم حبر', category: 'أدوات مكتبية', price: 2500, stock: 50, cost: 1500 },
                    { id: 4, name: 'قهوة', category: 'مشروبات', price: 5000, stock: 100, cost: 3000 }
                ],
                customers: [
                    { id: 1, name: 'عميل نقدي', phone: '', email: '', address: '' },
                    { id: 2, name: 'أحمد محمد', phone: '07701234567', email: 'ahmed@example.com', address: 'بغداد' }
                ],
                invoices: [],
                users: [
                    { id: 1, username: 'admin', password: '1234', name: 'مدير النظام', role: 'admin' }
                ],
                settings: {
                    companyName: 'Sawa POS',
                    taxRate: 10,
                    currency: 'د.ع'
                }
            };
            this.saveData();
        }
    },

    // حفظ البيانات
    saveData: function() {
        localStorage.setItem('sawaPOSData', JSON.stringify(window.appData));
    },

    // تسجيل الدخول
    login: function(username, password) {
        const user = window.appData.users.find(u => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem('sawaPOSLoggedIn', 'true');
            localStorage.setItem('sawaPOSUser', JSON.stringify(user));
            return true;
        }
        return false;
    },

    // تسجيل الخروج
    logout: function() {
        localStorage.removeItem('sawaPOSLoggedIn');
        localStorage.removeItem('sawaPOSUser');
        window.location.href = 'index.html';
    },

    // الحصول على المستخدم الحالي
    getCurrentUser: function() {
        const user = localStorage.getItem('sawaPOSUser');
        return user ? JSON.parse(user) : null;
    },

    // تنسيق العملة
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('ar-IQ').format(amount) + ' ' + (window.appData?.settings?.currency || 'د.ع');
    },

    // الساعة والتاريخ
    initClock: function() {
        function updateDateTime() {
            const now = new Date();
            const time = now.toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' });
            const date = now.toLocaleDateString('ar-IQ', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            const clockElement = document.getElementById('clock');
            const dateElement = document.getElementById('date');
            
            if (clockElement) clockElement.textContent = time;
            if (dateElement) dateElement.textContent = date;
        }
        
        updateDateTime();
        setInterval(updateDateTime, 1000);
    },

    // إنشاء معرف فريد
    generateId: function() {
        return Date.now() + Math.floor(Math.random() * 1000);
    },

    // إشعارات
    showNotification: function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg z-50 ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
};
