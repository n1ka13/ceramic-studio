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
                
                if (typeof addOrderToQueue === "function") {
                    addOrderToQueue(finalItem);
                }
                isOrdering = false; 
            } else {
                alert("Давайте спробуємо ще раз.");
            }
        } else {
            alert("Будь ласка, введіть назву виробу.");
        }
    }
}