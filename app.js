// LOGIC HOẠT ĐỘNG TRANG BIO LINK HANIETAYBE

document.addEventListener('DOMContentLoaded', () => {
    // === 1. CHỨC NĂNG SAO CHÉP SỐ TÀI KHOẢN (CLICK TO COPY) ===
    const copyBankBtn = document.getElementById('copy-bank-btn');
    const bankNumberText = document.getElementById('bank-number');
    const copyTooltip = document.getElementById('copy-tooltip');
    const copyIcon = document.getElementById('copy-icon');
    
    // Tạo phần tử Toast để hiển thị thông báo ở dưới màn hình
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = '<i class="fas fa-check-circle" style="color: #f2a1b5;"></i> Đã sao chép số tài khoản! 💕';
    document.body.appendChild(toast);

    if (copyBankBtn) {
        copyBankBtn.addEventListener('click', () => {
            // Lấy chuỗi số tài khoản (bỏ khoảng trắng)
            const rawAccountNumber = bankNumberText.innerText.replace(/\s+/g, '');
            
            // Sử dụng Clipboard API hiện đại để sao chép
            navigator.clipboard.writeText(rawAccountNumber).then(() => {
                // 1. Thay đổi Tooltip tạm thời
                copyTooltip.innerText = 'Đã copy! ✨';
                copyTooltip.style.opacity = '1';
                copyTooltip.style.transform = 'translateX(-50%) translateY(0)';
                
                // 2. Đổi biểu tượng copy sang tick kiểm tra
                copyIcon.className = 'fas fa-check';
                copyBankBtn.style.borderColor = 'var(--text-primary)';
                copyBankBtn.style.background = 'var(--accent-color)';
                copyBankBtn.style.color = '#ffffff';
                if(document.documentElement.getAttribute('data-theme') === 'dark') {
                    copyBankBtn.style.color = '#1a0f12';
                }

                // 3. Hiển thị Toast thông báo xịn sò
                toast.classList.add('show');
                
                // 4. Reset lại trạng thái ban đầu sau 2 giây
                setTimeout(() => {
                    copyTooltip.innerText = 'Nhấp để copy';
                    copyTooltip.style.opacity = '';
                    copyTooltip.style.transform = '';
                    copyIcon.className = 'far fa-copy';
                    copyBankBtn.style.borderColor = '';
                    copyBankBtn.style.background = '';
                    copyBankBtn.style.color = '';
                }, 2000);
                
                // Ẩn Toast sau 3 giây
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }).catch(err => {
                console.error('Lỗi khi sao chép số tài khoản: ', err);
                alert('Không thể tự động sao chép. Số tài khoản là: ' + rawAccountNumber);
            });
        });
    }

    // === 2. QUẢN LÝ GIAO DIỆN SÁNG / TỐI (LIGHT & DARK MODE) ===
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    // Kiểm tra cài đặt theme cũ từ thiết bị
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    // Hàm chuyển đổi giao diện
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

    // === 3. CHỨC NĂNG POPUP PHÓNG TO QR CODE ===
    const qrCodeWrapper = document.querySelector('.qr-code-wrapper');
    const qrImage = document.querySelector('.qr-image');
    const qrModal = document.getElementById('qr-modal');
    const qrModalClose = document.getElementById('qr-modal-close');
    const qrModalImg = document.getElementById('qr-modal-img');
    const qrModalCopyBtn = document.getElementById('qr-modal-copy-btn');

    // Hàm mở Modal
    function openQRModal() {
        if (qrModal && qrModalImg && qrImage) {
            qrModalImg.src = qrImage.src; // Lấy ảnh từ QR Code gốc
            qrModal.classList.add('show');
            qrModal.setAttribute('aria-hidden', 'false');
        }
    }

    // Hàm đóng Modal
    function closeQRModal() {
        if (qrModal) {
            qrModal.classList.remove('show');
            qrModal.setAttribute('aria-hidden', 'true');
        }
    }

    // Gán sự kiện click vào ảnh QR Code để mở Modal
    if (qrCodeWrapper) {
        qrCodeWrapper.addEventListener('click', openQRModal);
    }

    // Gán sự kiện click nút đóng (x) để đóng Modal
    if (qrModalClose) {
        qrModalClose.addEventListener('click', closeQRModal);
    }

    // Đóng Modal khi người dùng nhấp ra ngoài vùng Modal Content (nhấp vào nền mờ)
    if (qrModal) {
        qrModal.addEventListener('click', (e) => {
            if (e.target === qrModal) {
                closeQRModal();
            }
        });
    }

    // Nút copy số tài khoản ngay bên trong Popup Modal
    if (qrModalCopyBtn) {
        qrModalCopyBtn.addEventListener('click', () => {
            const rawAccountNumber = bankNumberText.innerText.replace(/\s+/g, '');
            navigator.clipboard.writeText(rawAccountNumber).then(() => {
                // Đổi chữ trên nút modal để phản hồi cho người dùng
                qrModalCopyBtn.innerText = 'Đã sao chép! 💕';
                qrModalCopyBtn.style.background = 'var(--text-primary)';
                if(document.documentElement.getAttribute('data-theme') === 'dark') {
                    qrModalCopyBtn.style.color = '#1a0f12';
                } else {
                    qrModalCopyBtn.style.color = '#ffffff';
                }

                // Hiển thị Toast thông báo xịn sò
                toast.classList.add('show');

                // Reset lại nút sau 2 giây
                setTimeout(() => {
                    qrModalCopyBtn.innerText = 'Sao chép số tài khoản';
                    qrModalCopyBtn.style.background = '';
                    qrModalCopyBtn.style.color = '';
                }, 2000);

                // Ẩn Toast sau 3 giây
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }).catch(err => {
                console.error('Lỗi sao chép: ', err);
            });
        });
    }

    // === 3.5. CHỨC NĂNG POPUP HIỂN THỊ EMAIL ===
    const emailTrigger = document.getElementById('email-trigger');
    const emailModal = document.getElementById('email-modal');
    const emailModalClose = document.getElementById('email-modal-close');
    const emailModalCopyBtn = document.getElementById('email-modal-copy-btn');
    
    if (emailTrigger && emailModal) {
        // Mở popup email khi click
        emailTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            emailModal.classList.add('show');
            emailModal.setAttribute('aria-hidden', 'false');
        });
    }
    
    if (emailModalClose && emailModal) {
        // Đóng popup email khi click nút x
        emailModalClose.addEventListener('click', () => {
            emailModal.classList.remove('show');
            emailModal.setAttribute('aria-hidden', 'true');
        });
    }
    
    if (emailModal) {
        // Đóng popup email khi click ra ngoài vùng nội dung
        emailModal.addEventListener('click', (e) => {
            if (e.target === emailModal) {
                emailModal.classList.remove('show');
                emailModal.setAttribute('aria-hidden', 'true');
            }
        });
    }
    
    if (emailModalCopyBtn) {
        // Copy email và hiển thị Toast thông báo thành công
        emailModalCopyBtn.addEventListener('click', () => {
            const emailAddress = "trhnngoc@gmail.com";
            navigator.clipboard.writeText(emailAddress).then(() => {
                // Đổi chữ trên nút modal để phản hồi trực quan
                emailModalCopyBtn.innerText = 'Đã sao chép! 💕';
                emailModalCopyBtn.style.background = 'var(--text-primary)';
                if(document.documentElement.getAttribute('data-theme') === 'dark') {
                    emailModalCopyBtn.style.color = '#1a0f12';
                } else {
                    emailModalCopyBtn.style.color = '#ffffff';
                }

                // Hiển thị Toast thông báo xịn sò
                toast.classList.add('show');

                // Reset lại nút sau 2 giây
                setTimeout(() => {
                    emailModalCopyBtn.innerText = 'Sao chép Email';
                    emailModalCopyBtn.style.background = '';
                    emailModalCopyBtn.style.color = '';
                }, 2000);

                // Ẩn Toast sau 3 giây
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }).catch(err => {
                console.error('Lỗi sao chép: ', err);
            });
        });
    }

    // === 4. TÍCH HỢP CHATBOT TRỢ LÝ ẢO (HANIE AI) ===
    const chatToggleBtn = document.getElementById('h-assist-btn');
    const chatWindow = document.getElementById('h-assist-win');
    const chatCloseBtn = document.getElementById('h-assist-cls');
    const chatForm = document.getElementById('h-assist-frm');
    const chatInput = document.getElementById('h-assist-in');
    const chatMessages = document.getElementById('h-assist-msgs');

    const API_KEY = "sk-d95071086c592c7ec791c2f9d515ca8d19255b083db7a896eb6dad3d141d2e3f";
    const API_URL = "https://api.orimise.com/v1/chat/completions";
    const MODEL = "gpt-5.5";

    // System Prompt cấu hình tính cách siêu dễ thương cho Hanie AI trợ lý ảo
    const SYSTEM_PROMPT = {
        role: "system",
        content: "Bạn là Hanie AI - trợ lý ảo siêu đáng yêu, thân thiện của HANIETAYBE, một Content Creator tài năng tại TP. Hồ Chí Minh. Hãy nói chuyện bằng giọng điệu cực kỳ dễ thương, sử dụng nhiều ký tự biểu cảm (emoji) như 🌸, 💕, 🥺, ✨, 🌸. Hãy hướng dẫn người dùng cách tham gia Discord Team Hanie (https://discord.gg/hanieteam) hoặc cách quyên góp ủng hộ cô ấy qua tài khoản Techcombank TRAN HONG NGOC số 1903 7152 7390 11. Trả lời ngắn gọn, tự nhiên, luôn xưng hô thân mật là 'mình' và gọi người dùng là 'bạn' hoặc 'cậu'. Trả lời bằng Tiếng Việt."
    };

    // Lịch sử hội thoại để gửi lên API (context-aware chat)
    let conversationHistory = [ SYSTEM_PROMPT ];

    // Hàm chuyển đổi ẩn/hiển thị cửa sổ Chat
    function toggleChatWindow() {
        if (chatWindow) {
            const isOpen = chatWindow.classList.contains('show');
            if (isOpen) {
                chatWindow.classList.remove('show');
                chatWindow.setAttribute('aria-hidden', 'true');
                if (chatToggleBtn) {
                    const iconOpen = chatToggleBtn.querySelector('.h-icon-op');
                    const iconClose = chatToggleBtn.querySelector('.h-icon-cl');
                    if (iconOpen) iconOpen.style.display = 'block';
                    if (iconClose) iconClose.style.display = 'none';
                }
            } else {
                chatWindow.classList.add('show');
                chatWindow.setAttribute('aria-hidden', 'false');
                if (chatToggleBtn) {
                    const iconOpen = chatToggleBtn.querySelector('.h-icon-op');
                    const iconClose = chatToggleBtn.querySelector('.h-icon-cl');
                    if (iconOpen) iconOpen.style.display = 'none';
                    if (iconClose) iconClose.style.display = 'block';
                    
                    // Ẩn badge thông báo đỏ khi người dùng mở hộp chat lần đầu
                    const badge = chatToggleBtn.querySelector('.h-assist-bdg');
                    if (badge) badge.style.display = 'none';
                }
                // Cuộn xuống tin nhắn mới nhất
                if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
                // Focus vào input
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

    // Hàm an toàn để chuyển đổi tin nhắn AI dạng text (hỗ trợ **bold** và xuống dòng \n) thành HTML
    function formatMessageText(inputText) {
        // Thoát HTML thô sơ để bảo vệ bảo mật
        let escaped = inputText
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        
        // Chuyển đổi **bold** sang thẻ <strong>
        escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Chuyển đổi ký tự xuống dòng \n sang thẻ <br>
        escaped = escaped.replace(/\n/g, '<br>');
        
        return escaped;
    }

    // Hàm chèn một bong bóng tin nhắn mới vào giao diện
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
        
        // Tự động cuộn xuống cuối
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Hàm xử lý khi gửi form chat
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const userText = chatInput.value.trim();
            if (!userText) return;

            // 1. Hiển thị tin nhắn người dùng lên UI
            appendMessage('user', userText);
            chatInput.value = '';

            // 2. Thêm vào lịch sử hội thoại
            conversationHistory.push({ role: 'user', content: userText });

            // 3. Hiển thị hiệu ứng AI đang gõ chữ (typing indicator)
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

            // 4. Gửi yêu cầu lên API của Orimise
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
                // Xóa hiệu ứng đang gõ
                typingIndicator.remove();

                // Lấy kết quả phản hồi từ AI
                const aiResponseText = data.choices[0].message.content;

                // Thêm phản hồi vào lịch sử hội thoại
                conversationHistory.push({ role: 'assistant', content: aiResponseText });

                // Hiển thị tin nhắn phản hồi của AI lên UI
                appendMessage('ai', aiResponseText);
            })
            .catch(error => {
                console.error('Lỗi khi gọi API: ', error);
                typingIndicator.remove();
                appendMessage('ai', 'Hệ thống AI đang bận hoặc khóa API của bạn chưa được cấu hình chính xác. Vui lòng kiểm tra lại nha! 🥺');
            });
        });
    }

    // === 5. HIỆU ỨNG ĐÁNH CHỮ TIÊU ĐỀ TRÌNH DUYỆT (TYPING TAB TITLE) ===
    const tabTitle = "HANIETAYBE | Bio Link & Donate 🌸";
    let titleIndex = 0;
    let isReversing = false;
    let typingSpeed = 200; // Tốc độ đánh chữ ban đầu
    
    function animateTabTitle() {
        if (!isReversing) {
            // Đang đánh chữ
            document.title = tabTitle.substring(0, titleIndex + 1);
            titleIndex++;
            
            if (titleIndex === tabTitle.length) {
                isReversing = true;
                typingSpeed = 2500; // Giữ nguyên tiêu đề đầy đủ trong 2.5 giây
            } else {
                typingSpeed = 100 + Math.random() * 80; // Tốc độ gõ chữ ngẫu nhiên tự nhiên
            }
        } else {
            // Đang xóa ngược chữ
            document.title = tabTitle.substring(0, titleIndex - 1);
            titleIndex--;
            
            if (titleIndex === 0) {
                isReversing = false;
                typingSpeed = 500; // Nghỉ nửa giây trước khi bắt đầu gõ lại
            } else {
                typingSpeed = 50; // Xóa chữ nhanh hơn gõ
            }
        }
        
        setTimeout(animateTabTitle, typingSpeed);
    }
    
    // Bắt đầu chạy hiệu ứng gõ tiêu đề trình duyệt
    animateTabTitle();
});
