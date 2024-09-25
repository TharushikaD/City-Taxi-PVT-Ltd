import Swal from 'sweetalert2';

export function Alert(title, text, icon) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon
    });
}
