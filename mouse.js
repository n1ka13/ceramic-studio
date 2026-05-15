const catalogItems = document.querySelectorAll('.catalog-item');

catalogItems.forEach(item => {
    item.onmouseover = function(event) {
        let target = event.target.closest('.catalog-item');
        if (target) {
            target.style.backgroundColor = "#fff8d0";
        }
    };

    item.onmouseout = function(event) {
        let related = event.relatedTarget;
        let target = event.target.closest('.catalog-item');
        
        if (target && (!related || !target.contains(related))) {
            target.style.backgroundColor = "";
            target.style.borderColor = "";
        }
    };
});

const discountLabel = document.getElementById('discount-label');

if (discountLabel) {
    let isDragging = false;

    discountLabel.addEventListener('mouseover', (event) => {
        discountLabel.style.filter = "brightness(1.1)";
        discountLabel.style.width = "60px";
    });

    discountLabel.addEventListener('mouseout', (event) => {
        discountLabel.style.filter = "brightness(1)";
        discountLabel.style.width = "40px";
    });

    discountLabel.addEventListener('click', () => {
        if (!isDragging) {
            alert("Ваш промокод: CLAY_MASTER_10 ✨");
        }
    });

    discountLabel.onmousedown = function(event) {
        event.preventDefault();
        isDragging = false;

        let shiftY = event.clientY - discountLabel.getBoundingClientRect().top;

        function moveAt(clientY) {
            isDragging = true;
            let newTop = clientY - shiftY;
            if (newTop < 0) newTop = 0;
            let bottomEdge = window.innerHeight - discountLabel.offsetHeight;
            if (newTop > bottomEdge) newTop = bottomEdge;

            discountLabel.style.top = newTop + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.clientY);
        }

        document.addEventListener('mousemove', onMouseMove);

        document.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            document.onmouseup = null;
        };
    };

    discountLabel.ondragstart = function() {
        return false;
    };
}