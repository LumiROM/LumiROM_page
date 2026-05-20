document.addEventListener('DOMContentLoaded', () => {
    // 1. Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 1.5 Mobile Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // 2. Scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // 3. Supported Devices Filter
    const searchInput = document.getElementById('device-search');
    const deviceCards = document.querySelectorAll('.device-card-item');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            deviceCards.forEach(card => {
                const deviceName = card.dataset.device.toLowerCase();
                const deviceModel = card.dataset.model.toLowerCase();
                if (deviceName.includes(query) || deviceModel.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // 4. Feature Explorer Category Tabs
    const featureTabs = document.querySelectorAll('.tab-btn');
    const featureContents = document.querySelectorAll('.tab-content');

    featureTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            featureTabs.forEach(t => t.classList.remove('active'));
            // Add active to current tab
            tab.classList.add('active');

            // Hide all tab contents
            featureContents.forEach(content => content.classList.remove('active'));
            // Show target content
            const targetId = tab.dataset.tab;
            const targetContent = document.getElementById(`features-${targetId}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // 5. How to Use: Method Switcher
    const guideTabs = document.querySelectorAll('.guide-tab-btn');
    const guidePanels = document.querySelectorAll('.guide-panel');

    guideTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            guideTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            guidePanels.forEach(panel => panel.classList.remove('active'));
            const targetId = tab.dataset.guide;
            const targetPanel = document.getElementById(`guide-${targetId}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // 6. Cache Terminal Simulator
    const terminalOutput = document.getElementById('terminal-content');
    const terminalCopyBtn = document.getElementById('terminal-copy-btn');
    const cacheCmdButtons = document.querySelectorAll('.btn-terminal');

    const cacheCommandsOutputs = {
        status: `[CACHE STATUS]
Checking firmware cache directory...
Cache status: ENABLED
Total firmware versions cached: 3
Latest build cached: SM-A346B (One UI 8.5)
Integrity check: PASS`,
        check: `[CACHE VERIFICATION]
Verifying required partition images...
Checking system.img... OK
Checking vendor.img... OK
Checking product.img... OK
All required images verified and ready for patching.`,
        size: `[CACHE SIZE]
Calculating cache size...
Location: IMGs/
Files count: 6
Total space used: 4.82 GiB`,
        list: `[CACHE LIST]
Listing all cached images with sizes:
- system.img              4.92 GiB  (Modified: 2026-05-18)
- vendor.img              680 MiB   (Modified: 2026-05-18)
- product.img             1.65 GiB  (Modified: 2026-05-15)
- system_ext.img          620 MiB   (Modified: 2026-05-15)
Total cached firmware builds: 4`,
        clear: `[CACHE WIPE]
Clearing cached firmware images...
Deleting cache files from IMGs/...
Operation completed successfully.
Cache status: Empty (0 B)`
    };

    cacheCmdButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            cacheCmdButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const cmd = btn.dataset.cmd;
            const outputText = cacheCommandsOutputs[cmd];
            
            if (terminalOutput) {
                // Animate terminal writing command
                terminalOutput.innerHTML = `<span class="terminal-prompt">$</span><span class="terminal-cmd">bash scripts/cache_manager.sh ${cmd}</span>\n<span class="terminal-output">${outputText}</span>`;
            }
        });
    });

    // 7. Clipboard Copy Functionality
    if (terminalCopyBtn) {
        terminalCopyBtn.addEventListener('click', () => {
            const commandTextElement = terminalOutput.querySelector('.terminal-cmd');
            if (commandTextElement) {
                const commandText = commandTextElement.textContent;
                navigator.clipboard.writeText(commandText).then(() => {
                    const originalText = terminalCopyBtn.textContent;
                    terminalCopyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        terminalCopyBtn.textContent = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            }
        });
    }

    // Generic Code Copy Buttons
    const codeBlocks = document.querySelectorAll('.code-block-wrapper');
    codeBlocks.forEach(block => {
        const copyBtn = block.querySelector('.code-copy-btn');
        const codeElement = block.querySelector('code');
        if (copyBtn && codeElement) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(codeElement.textContent.trim()).then(() => {
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                    }, 2000);
                });
            });
        }
    });
});
