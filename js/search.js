// search.js

function searchDesign() {
    const input = document.getElementById('searchInput');
    const query = input ? input.value.trim().toLowerCase() : '';
    
    if (!query) {
        alert("الرجاء إدخال كلمة للبحث!");
        return;
    }
    
    alert("جاري البحث عن: " + query + " ...");
    
    // يمكن هنا إضافة منطق للبحث الفعلي في الصفحة
    // مثلاً إخفاء البطاقات التي لا تحتوي على الكلمة
    const cards = document.querySelectorAll('.gallery-card');
    let found = false;
    
    cards.forEach(card => {
        const title = card.querySelector('h3');
        if (title && title.innerText.toLowerCase().includes(query)) {
            card.style.display = 'block';
            found = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    if (!found && cards.length > 0) {
        alert("لم يتم العثور على نتائج!");
    }
}
