/**
 * College Scheduling System - Main JavaScript
 */

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('College Scheduling System initialized');
    initializeEventListeners();
});

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
    // Add event listeners for buttons, forms, etc.
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });
}

/**
 * Show confirmation dialog
 */
function showConfirmation(title, message, onConfirm) {
    Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0d6efd',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Yes, proceed',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
        }
    });
}

/**
 * Delete subject
 */
function deleteSubject(id) {
    showConfirmation('Delete Subject', 'Are you sure?', function() {
        fetch(`/subjects/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showToast(data.message, 'success');
                setTimeout(() => location.reload(), 500);
            } else {
                showToast(data.message, 'error');
            }
        });
    });
}

/**
 * Delete instructor
 */
function deleteInstructor(id) {
    showConfirmation('Delete Instructor', 'Are you sure?', function() {
        fetch(`/instructors/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showToast(data.message, 'success');
                setTimeout(() => location.reload(), 500);
            } else {
                showToast(data.message, 'error');
            }
        });
    });
}

/**
 * Delete room
 */
function deleteRoom(id) {
    showConfirmation('Delete Room', 'Are you sure?', function() {
        fetch(`/rooms/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showToast(data.message, 'success');
                setTimeout(() => location.reload(), 500);
            } else {
                showToast(data.message, 'error');
            }
        });
    });
}

/**
 * Export schedule to PDF
 */
function exportSchedulePdf(id) {
    fetch(`/schedules/${id}/export/pdf`)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `schedule_${id}.pdf`;
            a.click();
        })
        .catch(error => showToast('Error exporting PDF', 'error'));
}

/**
 * Export schedule to PNG
 */
function exportSchedulePng(id) {
    fetch(`/schedules/${id}/export/png`)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `schedule_${id}.png`;
            a.click();
        })
        .catch(error => showToast('Error exporting PNG', 'error'));
}
