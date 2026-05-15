function startCustomOrder() {
    const freeSlots = document.querySelectorAll('.free');
    if (freeSlots.length === 0) {
        alert("На жаль, вільних віконечок на найближчий час немає. Спробуйте пізніше!");
        return;
    }

    let isOrdering = true; 
    while (isOrdering) {
        let item = prompt("Який виріб ви хочете, щоб ми зліпили? (Ваза, Чашка, Глечик)");
        if (item === null) {
            alert("Оформлення замовлення скасовано.");
            break; 
        }
        if (item.trim() !== "") {
            let confirmChoice = confirm(`Ви хочете замовити "${item}". Перейти до вибору кольору?`);
            if (confirmChoice) {
                let glaze = prompt("Який колір обрати для виробу?");
                let finalItem = (glaze === null || glaze.trim() === "") 
                    ? `${item} (без глазурі)` 
                    : `${item} (колір: ${glaze})`;
                
                addOrderToQueue(finalItem);
                isOrdering = false; 
            } else {
                alert("Давайте спробуємо ще раз.");
            }
        } else {
            alert("Будь ласка, введіть назву виробу.");
        }
    }
}

function addOrderToQueue(text) {
    const queue = document.getElementById('order-queue');
    const freeSlots = document.querySelectorAll('.free');

    if (freeSlots.length > 0) {
        const orderNode = document.createElement('div');
        orderNode.className = 'queue-item booked';
        orderNode.innerHTML = `<strong>[ACTIVE] </strong>🔨 В роботі: ${text}`;
        freeSlots[0].replaceWith(orderNode);

        setTimeout(() => {
            const doneMsg = document.createElement('div');
            doneMsg.className = "queue-item free";
            doneMsg.textContent = "Вільний час майстра (Звільнилося)";
            orderNode.after(doneMsg);
            orderNode.remove();
        }, 15000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    
    const clayBtn = document.getElementById('clay-btn');
    if (clayBtn) {
        clayBtn.onclick = function() {
            const desc1 = "Біла кам'яна маса (Stoneware) — надзвичайно міцна, витримує високу температуру.";
            alert("Найбільш детальна інформація:\n\n" + desc1);
        };
    }

    const kilnBtn = document.getElementById('kiln-btn');
    if (kilnBtn) {
        kilnBtn.addEventListener('click', function() {
            const oldBg = document.body.style.backgroundColor;
            document.body.style.transition = "1s";
            document.body.style.backgroundColor = "#ff7f50";
            setTimeout(() => { document.body.style.backgroundColor = oldBg || "white"; }, 3000);
        });
        kilnBtn.addEventListener('click', function(e) {
            let originalText = e.target.textContent;
            e.target.textContent = "Піч нагрівається...";
            setTimeout(() => { e.target.textContent = originalText; }, 3000);
        });
    }

    const vaseInspector = {
        handleEvent(event) {
            alert(`Ви оглядаєте елемент з ID: ${event.currentTarget.id}. Це наша фірмова ваза!`);
            event.currentTarget.style.border = "3px solid #d96b42";
        }
    };
    
    const vaseImg = document.getElementById('vase-image');
    const stopVaseBtn = document.getElementById('stop-vase-btn');
    
    if (vaseImg && stopVaseBtn) {
        vaseImg.addEventListener('click', vaseInspector);
        
        stopVaseBtn.onclick = function() {
            vaseImg.removeEventListener('click', vaseInspector);
            vaseImg.style.border = "none";
            vaseImg.style.cursor = "default";
            this.textContent = "Інтерактивність вимкнено";
        };
    }

    const orderQueue = document.getElementById('order-queue');
    if (orderQueue) {
        orderQueue.onclick = function(event) {
            let targetItem = event.target.closest('.queue-item');
            if (!targetItem || !orderQueue.contains(targetItem)) return;

            document.querySelectorAll('.queue-item').forEach(el => el.style.boxShadow = "none");
            targetItem.style.boxShadow = "0 0 10px #d96b42";
        };
    }

    class AdminMenu {
        constructor(elem) {
            this.elem = elem;
            elem.onclick = this.onClick.bind(this);
        }
        
        showArtisan() {
            document.getElementById('artisan-display').textContent = "На зміні: Олена Шевченко (Майстер-кераміст)";
        }
        
        checkDom() {
            const container = document.getElementById('order-queue');
            console.log("DOM перевірка. Кількість елементів в черзі:", container.children.length);
            alert("Перевірка DOM виконана. Результат у консолі (F12).");
        }

        sayHello() {
            alert("Привіт! Ласкаво просимо до нашої керамічної студії!");
        }
        
        onClick(event) {
            let action = event.target.dataset.action;
            if (action && typeof this[action] === 'function') {
                this[action]();
            }
        }
    }
    const menuElem = document.getElementById('admin-menu');
    if (menuElem) new AdminMenu(menuElem);

    let tooltipElem;
    document.onmouseover = function(event) {
        let target = event.target;
        let tooltipText = target.dataset.tooltip;
        if (!tooltipText) return;

        tooltipElem = document.createElement('div');
        tooltipElem.className = 'tooltip';
        tooltipElem.innerHTML = tooltipText;
        
        tooltipElem.style.position = 'absolute';
        tooltipElem.style.background = '#5d4037';
        tooltipElem.style.color = 'white';
        tooltipElem.style.padding = '5px 10px';
        tooltipElem.style.borderRadius = '5px';
        tooltipElem.style.fontSize = '12px';
        tooltipElem.style.zIndex = '1000';
        
        document.body.append(tooltipElem);

        let coords = target.getBoundingClientRect();
        tooltipElem.style.left = coords.left + 'px';
        tooltipElem.style.top = (coords.top - tooltipElem.offsetHeight - 5 + window.scrollY) + 'px';
    };

    document.onmouseout = function(event) {
        if (tooltipElem) {
            tooltipElem.remove();
            tooltipElem = null;
        }
    };
});