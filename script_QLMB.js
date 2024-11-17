document.addEventListener('DOMContentLoaded', function() {
    const openModalButton = document.getElementById('openModalButton');
    const modalOverlay = document.getElementById('modalOverlay');
    const addPlaneButton = document.getElementById('addPlaneButton');

    // Thiết lập sự kiện nhấn nút mở modal
    openModalButton.addEventListener('click', function() {
        if (modalOverlay.style.display === 'block') {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = 'auto'; // Bật lại cuộn trang
        } else {
            modalOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Ngăn cuộn trang
        }
    });

    // Thiết lập sự kiện nhấn nút thêm máy bay
    addPlaneButton.addEventListener('click', function() {   
        modalOverlay.style.display = 'none'; // Đóng modal
        document.body.style.overflow = 'auto'; // Bật lại cuộn trang
    });
});
