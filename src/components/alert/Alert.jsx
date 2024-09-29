import Swal from 'sweetalert2';

export function Alert(title, text, icon) {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        // confirmButtonText: 'Yes',
        // cancelButtonText: 'No',
    });
}