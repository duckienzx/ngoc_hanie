document.addEventListener('DOMContentLoaded', () => {
    const copyBankBtn = document.getElementById('copy-bank-btn');
    const bankNumberText = document.getElementById('bank-number');
    const copyTooltip = document.getElementById('copy-tooltip');
    const copyIcon = document.getElementById('copy-icon');
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = '<i class="fas fa-check-circle" style="color: #f2a1b5;"></i> Đã sao chép số tài khoản! 💕';
    document.body.appendChild(toast);

    if (copyBankBtn) {
        copyBankBtn.addEventListener('click', () => {
            const rawAccountNumber = bankNumberText.innerText.replace(/\s+/g, '');
            
            navigator.clipboard.writeText(rawAccountNumber).then(() => {
                copyTooltip.innerText = 'Đã copy! ✨';
                copyTooltip.style.opacity = '1';
                copyTooltip.style.transform = 'translateX(-50%) translateY(0)';
                
                copyIcon.className = 'fas fa-check';
                copyBankBtn.style.borderColor = 'var(--text-primary)';
                copyBankBtn.style.background = 'var(--accent-color)';
                copyBankBtn.style.color = '#ffffff';
                if(document.documentElement.getAttribute('data-theme') === 'dark') {
                    copyBankBtn.style.color = '#1a0f12';
                }

                toast.classList.add('show');
                
                setTimeout(() => {
                    copyTooltip.innerText = 'Nhấp để copy';
                    copyTooltip.style.opacity = '';
                    copyTooltip.style.transform = '';
                    copyIcon.className = 'far fa-copy';
                    copyBankBtn.style.borderColor = '';
                    copyBankBtn.style.background = '';
                    copyBankBtn.style.color = '';
                }, 2000);
                
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }).catch(err => {
                console.error('Lỗi khi sao chép số tài khoản: ', err);
                alert('Không thể tự động sao chép. Số tài khoản là: ' + rawAccountNumber);
            });
        });
    }

    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }    
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', switchTheme, false);
    }

    const qrCodeWrapper = document.querySelector('.qr-code-wrapper');
    const qrImage = document.querySelector('.qr-image');
    const qrModal = document.getElementById('qr-modal');
    const qrModalClose = document.getElementById('qr-modal-close');
    const qrModalImg = document.getElementById('qr-modal-img');
    const qrModalCopyBtn = document.getElementById('qr-modal-copy-btn');

    function openQRModal() {
        if (qrModal && qrModalImg && qrImage) {
            qrModalImg.src = qrImage.src;
            qrModal.classList.add('show');
            qrModal.setAttribute('aria-hidden', 'false');
        }
    }

    function closeQRModal() {
        if (qrModal) {
            qrModal.classList.remove('show');
            qrModal.setAttribute('aria-hidden', 'true');
        }
    }

    if (qrCodeWrapper) {
        qrCodeWrapper.addEventListener('click', openQRModal);
    }

    if (qrModalClose) {
        qrModalClose.addEventListener('click', closeQRModal);
    }

    if (qrModal) {
        qrModal.addEventListener('click', (e) => {
            if (e.target === qrModal) {
                closeQRModal();
            }
        });
    }

    if (qrModalCopyBtn) {
        qrModalCopyBtn.addEventListener('click', () => {
            const rawAccountNumber = bankNumberText.innerText.replace(/\s+/g, '');
            navigator.clipboard.writeText(rawAccountNumber).then(() => {
                qrModalCopyBtn.innerText = 'Đã sao chép! 💕';
                qrModalCopyBtn.style.background = 'var(--text-primary)';
                if(document.documentElement.getAttribute('data-theme') === 'dark') {
                    qrModalCopyBtn.style.color = '#1a0f12';
                } else {
                    qrModalCopyBtn.style.color = '#ffffff';
                }

                toast.classList.add('show');

                setTimeout(() => {
                    qrModalCopyBtn.innerText = 'Sao chép số tài khoản';
                    qrModalCopyBtn.style.background = '';
                    qrModalCopyBtn.style.color = '';
                }, 2000);

                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }).catch(err => {
                console.error('Lỗi sao chép: ', err);
            });
        });
    }

    const emailTrigger = document.getElementById('email-trigger');
    const emailModal = document.getElementById('email-modal');
    const emailModalClose = document.getElementById('email-modal-close');
    const emailModalCopyBtn = document.getElementById('email-modal-copy-btn');
    
    if (emailTrigger && emailModal) {
        emailTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            emailModal.classList.add('show');
            emailModal.setAttribute('aria-hidden', 'false');
        });
    }
    
    if (emailModalClose && emailModal) {
        emailModalClose.addEventListener('click', () => {
            emailModal.classList.remove('show');
            emailModal.setAttribute('aria-hidden', 'true');
        });
    }
    
    if (emailModal) {
        emailModal.addEventListener('click', (e) => {
            if (e.target === emailModal) {
                emailModal.classList.remove('show');
                emailModal.setAttribute('aria-hidden', 'true');
            }
        });
    }
    
    if (emailModalCopyBtn) {
        emailModalCopyBtn.addEventListener('click', () => {
            const emailAddress = "trhnngoc@gmail.com";
            navigator.clipboard.writeText(emailAddress).then(() => {
                emailModalCopyBtn.innerText = 'Đã sao chép! 💕';
                emailModalCopyBtn.style.background = 'var(--text-primary)';
                if(document.documentElement.getAttribute('data-theme') === 'dark') {
                    emailModalCopyBtn.style.color = '#1a0f12';
                } else {
                    emailModalCopyBtn.style.color = '#ffffff';
                }

                toast.classList.add('show');

                setTimeout(() => {
                    emailModalCopyBtn.innerText = 'Sao chép Email';
                    emailModalCopyBtn.style.background = '';
                    emailModalCopyBtn.style.color = '';
                }, 2000);

                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }).catch(err => {
                console.error('Lỗi sao chép: ', err);
            });
        });
    }

    const chatToggleBtn = document.getElementById('h-assist-btn');
    const chatWindow = document.getElementById('h-assist-win');
    const chatCloseBtn = document.getElementById('h-assist-cls');
    const chatForm = document.getElementById('h-assist-frm');
    const chatInput = document.getElementById('h-assist-in');
    const chatMessages = document.getElementById('h-assist-msgs');

    const API_KEY = "sk-d95071086c592c7ec791c2f9d515ca8d19255b083db7a896eb6dad3d141d2e3f";
    const API_URL = "https://api.orimise.com/v1/chat/completions";
    const MODEL = "gpt-5.5";

    const SYSTEM_PROMPT = {
        role: "system",
        content: "Bạn là Hanie AI - trợ lý ảo siêu đáng yêu, thân thiện của HANIETAYBE, một Content Creator tài năng tại TP. Hồ Chí Minh. Hãy nói chuyện bằng giọng điệu cực kỳ dễ thương, sử dụng nhiều ký tự biểu cảm (emoji) như 🌸, 💕, 🥺, ✨, 🌸. Hãy hướng dẫn người dùng cách tham gia Discord Team Hanie (https://discord.com/invite/WMZ3WQGs3M) hoặc cách quyên góp ủng hộ cô ấy qua tài khoản Techcombank TRAN HONG NGOC số 1903 7152 7390 11. Trả lời ngắn gọn, tự nhiên, luôn xưng hô thân mật là 'mình' và gọi người dùng là 'bạn' hoặc 'cậu'. Trả lời bằng Tiếng Việt."
    };

    let conversationHistory = [ SYSTEM_PROMPT ];

    function toggleChatWindow() {
        if (chatWindow) {
            const isOpen = chatWindow.classList.contains('show');
            if (isOpen) {
                chatWindow.classList.remove('show');
                chatWindow.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('chat-open');
                if (chatToggleBtn) {
                    const iconOpen = chatToggleBtn.querySelector('.h-icon-op');
                    const iconClose = chatToggleBtn.querySelector('.h-icon-cl');
                    if (iconOpen) iconOpen.style.display = 'block';
                    if (iconClose) iconClose.style.display = 'none';
                }
            } else {
                chatWindow.classList.add('show');
                chatWindow.setAttribute('aria-hidden', 'false');
                document.body.classList.add('chat-open');
                if (chatToggleBtn) {
                    const iconOpen = chatToggleBtn.querySelector('.h-icon-op');
                    const iconClose = chatToggleBtn.querySelector('.h-icon-cl');
                    if (iconOpen) iconOpen.style.display = 'none';
                    if (iconClose) iconClose.style.display = 'block';
                    
                    const badge = chatToggleBtn.querySelector('.h-assist-bdg');
                    if (badge) badge.style.display = 'none';
                }
                if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
                if (chatInput) setTimeout(() => chatInput.focus(), 300);
            }
        }
    }

    if (chatToggleBtn) {
        chatToggleBtn.addEventListener('click', toggleChatWindow);
    }

    if (chatCloseBtn) {
        chatCloseBtn.addEventListener('click', toggleChatWindow);
    }

    function formatMessageText(inputText) {
        let escaped = inputText
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        
        escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        escaped = escaped.replace(/\n/g, '<br>');
        
        return escaped;
    }

    function appendMessage(sender, text) {
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `h-msg-bubble h-${sender} animate-bubble`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'h-msg-content';
        contentDiv.innerHTML = formatMessageText(text);

        const timeSpan = document.createElement('span');
        timeSpan.className = 'h-msg-time';
        const now = new Date();
        const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        timeSpan.innerText = timeStr;

        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeSpan);
        chatMessages.appendChild(messageDiv);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const userText = chatInput.value.trim();
            if (!userText) return;

            appendMessage('user', userText);
            chatInput.value = '';

            conversationHistory.push({ role: 'user', content: userText });

            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'h-msg-bubble h-ai animate-bubble typing-indicator-msg';
            typingIndicator.innerHTML = `
                <div class="h-msg-content" style="padding: 10px 14px;">
                    <div class="h-dots">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            `;
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: MODEL,
                    messages: conversationHistory
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Yêu cầu API thất bại');
                }
                return response.json();
            })
            .then(data => {
                typingIndicator.remove();

                const aiResponseText = data.choices[0].message.content;

                conversationHistory.push({ role: 'assistant', content: aiResponseText });

                appendMessage('ai', aiResponseText);
            })
            .catch(error => {
                console.error('Lỗi khi gọi API: ', error);
                typingIndicator.remove();
                appendMessage('ai', 'Hệ thống AI đang bận hoặc khóa API của bạn chưa được cấu hình chính xác. Vui lòng kiểm tra lại nha! 🥺');
            });
        });
    }

    const tabTitle = "HANIETAYBE | Bio Link & Donate 🌸";
    let titleIndex = 0;
    let isReversing = false;
    let typingSpeed = 200;
    
    function animateTabTitle() {
        if (!isReversing) {
            document.title = tabTitle.substring(0, titleIndex + 1);
            titleIndex++;
            
            if (titleIndex === tabTitle.length) {
                isReversing = true;
                typingSpeed = 2500;
            } else {
                typingSpeed = 100 + Math.random() * 80;
            }
        } else {
            document.title = tabTitle.substring(0, titleIndex - 1);
            titleIndex--;
            
            if (titleIndex === 0) {
                isReversing = false;
                typingSpeed = 500;
            } else {
                typingSpeed = 50;
            }
        }
        
        setTimeout(animateTabTitle, typingSpeed);
    }
    
    animateTabTitle();
});
