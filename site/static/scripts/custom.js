function addListeners(block) {
    block.addEventListener('click', function() {
        let codeBlock = this.closest('.theme-code-block');
        codeBlock.classList.add('wiggle-code-block');

        codeBlock.addEventListener('animationend', function() {
            this.classList.remove('wiggle-code-block');
        });
    });
}

let codeBlocks = document.querySelectorAll('.theme-code-block .clean-btn');
codeBlocks.forEach(addListeners);

let observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            let newCodeBlocks = mutation.target.querySelectorAll('.theme-code-block .clean-btn');
            newCodeBlocks.forEach(addListeners);
        }
    });
});

let config = { childList: true, subtree: true };

observer.observe(document.body, config);